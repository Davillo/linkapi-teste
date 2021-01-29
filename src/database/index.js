import { MongoClient } from "mongodb";

let connect = null

/**
 * @function
 * @param uri - uri de banco de dados.
 * @returns {Promise} Connect - Retornando conexão de banco de dados.
 */
exports.clientConnect = (uri) => {
    if (connect === null) connect = MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    return connect
}
