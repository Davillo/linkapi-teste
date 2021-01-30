import {Router} from 'express';
import AggregatedOportunityController from './app/controllers/AggregatedOportunityController';

const routes = new Router();

routes.get('/opportunities', AggregatedOportunityController.index);


export default routes;
