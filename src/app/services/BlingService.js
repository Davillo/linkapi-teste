import axios from 'axios';

class BlingService{

  async sendOrder(xml){
    await axios.post(`${process.env.INTEGRATION_BLING_BASE_URL}/pedido/json` , {}, {
      params: { apikey: process.env.BLING_API_KEY, xml}
    });
  }

}

export default new BlingService();

