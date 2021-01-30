import axios from 'axios';
import 'dotenv/config.js';

class PipedriveService{

  async fetchDeals () {
    try {
      const result = await axios.get(
        `${process.env.INTEGRATION_PIPEDRIVE_BASE_URL}/deals`,
        {
          params: {
            api_token: process.env.INTEGRATION_PIPEDRIVE_TOKEN, status: 'won'
          }
        }
      );

      return result.data.data;
    } catch (error) {
      console.log(error);
    }

  }

  async fetchDealWithProducts (id) {
    const result = await axios.get(
      `${process.env.INTEGRATION_PIPEDRIVE_BASE_URL}/deals/${id}/products`,
      {
        params: {
          api_token: process.env.INTEGRATION_PIPEDRIVE_TOKEN
        }
      }
    );

    return result.data.data;
  }

}

export default new PipedriveService();

