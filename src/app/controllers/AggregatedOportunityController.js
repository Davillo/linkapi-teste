import abstractMongo from '../../database/AbstractMongo.js';

class AggregatedOportunityController{

  async index(req, res){
    try {
      const aggregatedOportunities = await abstractMongo.findAll('aggregatedOportunities');
      return res.status(200).json(aggregatedOportunities);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Ocorreu um erro ao consultar as oportunidades'});
    }
  }

}


export default new AggregatedOportunityController();
