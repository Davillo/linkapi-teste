import abstractMongo from '../../database/AbstractMongo';

class AggregatedDealsController{


  async index(req, res){
    try {
      const aggregatedDeals = await abstractMongo.findAll('aggregatedDeals');
      return res.status(200).json(aggregatedDeals);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Ocorreu um erro ao consultar as oportunidades'});
    }
  }

}


export default new AggregatedDealsController();
