import pipedriveService from '../services/PipedriveService.js';
import blingService from '../services/BlingService.js';
import AbstractMongo from '../../database/AbstractMongo.js';
import moment from 'moment';
import pkg from 'js2xmlparser';
const {toXml} = pkg;

class PipedriveBlingIntegration {

  async integrate () {
    const deals = await pipedriveService.fetchDeals();

    if(!deals){
      return ;
    }

    const dealsWithProducts = deals.filter(deal => deal.products_count);

    let aggregatedDealsByDateAndValue = {};

    for (const deal of dealsWithProducts) {
      const products = await pipedriveService.fetchDealWithProducts(deal.id);

      const xml = normalizeDataToBling(deal, products);

      await blingService.sendOrder(xml);

      aggregatedDealsByDateAndValue = aggregateDeal(aggregatedDealsByDateAndValue, deal);
    }

    await AbstractMongo.saveAggregatedDeals(aggregatedDealsByDateAndValue);
  }

  normalizeDataToBling (deal, products) {
    const order = {
      numero: deal.id,
      data: moment(deal.add_time).format('DD/MM/YYYY'),
      cliente: fillClientInformation(deal),
      itens: { item: fillItemsInformation(products) }
    };

    return toXml('pedido', order);
  }

  fillClientInformation (deal) {
    const client = deal.person_id || deal.org_id;

    const clientInfo = {
      nome: client.name,
      endereco: client.address || ''
    };

    if (deal.person_id) {
      clientInfo.id = client.value;
      clientInfo.email = client.email.length ? client.email[0].value : '';
      clientInfo.fone = client.phone.length ? client.phone[0].value : '';
    }

    return clientInfo;
  }

  fillItemsInformation (products) {
    return products.map(product => {
      return {
        codigo: product.product_id,
        vlr_unit: product.item_price,
        qtde: product.quantity
      };
    })
  }

  aggregateDeal (aggregatedDeals, deal) {
    const dealDate = moment(deal.add_time).format('YYYY-MM-DD');
    if (!aggregatedDeals[dealDate]) {
      aggregatedDeals[dealDate] = { productsValuesSum: 0 };
    }
    aggregatedDeals[dealDate].productsValuesSum += deal.value;
    return aggregatedDeals;
  }

}


export default new PipedriveBlingIntegration();
