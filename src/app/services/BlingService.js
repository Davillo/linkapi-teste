import axios from 'axios';
import 'dotenv/config.js';


class BlingService{

  async sendOrder(xml){
    await axios.post(`${process.env.INTEGRATION_BLING_BASE_URL}/pedido/json` , {}, {
      params: { apikey: process.env.INTEGRATION_BLING_TOKEN, xml}
    });
  }

}

export default new BlingService();

