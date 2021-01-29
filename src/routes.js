import {Router} from 'express';
import AggregatedDealsController from './app/controllers/AggregatedDealsController';

const routes = new Router();

routes.get('/opportunities', AggregatedDealsController.index);


export default routes;
