import pkg from 'mongodb';
const { MongoClient } = pkg;
import 'dotenv/config.js';

class AbstractMongo {

  #connection;


  constructor(){
    this.#connection = MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  /**
   * @function
   * @param  {number} skip
   * @return {number}
  */
  skipsValidate = (skip) => (skip !== 0 && skip > 0) ? skip - 1 : 0;

  /**
   * @function
   * @param limit
   * @returns {number|number}
  */
  limitValidate = (limit) => parseInt(limit) > 0 ? parseInt(limit) : 10;

  /**
   * @function
   * @param  {String} collection - O nome da colection que irá buscar no banco de dados
   * @param  {Object} query - Query inserida na pesquisa do banco de dados.
   * @param  {Object} options - Options mensagem filtrada para objeto de retorno.
   * @returns {Promise} Result - resultado da query ou stack de new Error()
   */
  findAll = async (collection, query, options = {}) => {
      try {
          const conn = await this.#connection;
          const result = await conn.db().collection(collection).find(query, options).toArray()
          return result
      } catch (err) {
          throw new Error(`Error in search db: ${err}`)
      }
  }

  /**
   * @function
   * @param  {String} collection - O nome da colection que irá buscar no banco de dados
   * @param  {Object} query - Query inserida na pesquisa do banco de dados.
   * @param  {Object} options - Opção de retorno de objeto
   * @returns {Promise} Result - resultado da query ou stack de new Error()
   */
  findOne = async (collection, query, options = {}) => {
      try {
          const conn = await this.#connection;
          const result = await conn.db().collection(collection).findOne(query, options);
          return result
      } catch (err) {
          throw new Error(`Error in search db: ${err}`)
      }
  }

  /**
   * @function
   * @param collection
   * @param query
   * @param skip
   * @param limit
   * @param sort
   * @returns {Promise<*>}
   */
  findAllPaginateAggregateNotQuery = async (collection, skip = 0, limit = 10, sort = { _id: -1 }) => {
      try {
          const conn = await this.#connection;
          const result = await conn.db().collection(collection).aggregate([
              {
                  $facet: {
                      data: [
                          { $sort: sort },
                          { $skip: skipsValidate(skip) },
                          { $limit: limitValidate(limit) }
                      ],
                      page: [
                          { $group: { _id: null, totalPage: { $sum: 1 } } }
                      ]
                  }
              },
              { $unwind: '$page' },
              {
                  $project: {
                      data: 1,
                      'page.totalPage': 1,
                      'page.count': { $size: '$data' }
                  }
              }
          ]).toArray();
          return result[0] || []
      } catch (err) {
          console.log(err)
          throw new Error(`Error in search db: ${err}`)
      }
  }


  /**
   * @function
   * @param  {String} collection - O nome da colection que irá buscar no banco de dados
   * @param  {Object} query - Query inserida na pesquisa do banco de dados.
   * @param  {Object} data - Dados que será inserido no banco de dados.
   * @param  {Object} options - Opção de retorno de objeto
   * @returns {Promise} Result - resultado da query ou stack de new Error()
   */
  findOneAndUpdate = async (collection, query, data, options = {}) => {
      try {
          const conn = await this.#connection;
          const result = await conn.db().collection(collection).findOneAndUpdate(query, data, options);
          return result;
      } catch (err) {
          throw new Error(`Error in search db: ${err}`);
      }
  }

  /**
   * @function
   * @param  {String} collection - O nome da colection que irá buscar no banco de dados
   * @param  {Object} data - Dados que será inserido no banco de dados.
   * @returns {Promise} Result - resultado da inserção ou stack de new Error()
   */
  create = async (collection, data) => {
      try {
          const conn = await this.#connection;
          const result = await conn.db().collection(collection).insertOne(data);
          return result.ops[0];
      } catch (err) {
          throw new Error(`Error in search db: ${err}`);
      }
  }

  /**
   * @function
   * @param  {String} collection - O nome da colection que irá buscar no banco de dados
   * @param  {Object} query - Query inserida na pesquisa do banco de dados.
   * @param  {Object} data - Dados que será alterado
   * @returns {Promise} Result - resultado do update ou stack de new Error()
   */
   update = async (collection, query, data) => {
      try {
          const conn = await this.#connection;
          const { result } = await conn.db().collection(collection).updateOne(query, data)

          return { result }
      } catch (err) {
          throw new Error(`Error in search db: ${err}`)
      }
  }

}

export default new AbstractMongo();
