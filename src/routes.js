import pkg from 'express';
const {Router} = pkg;
import AggregatedOportunityController from './app/controllers/AggregatedOportunityController.js';

const routes = new Router();

routes.get('/opportunities', AggregatedOportunityController.index);


export default routes;
