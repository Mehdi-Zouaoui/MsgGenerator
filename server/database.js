const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/messageGenerator';


class Connection {
     static  connect(){
         return mongo.connect(url).then((client) => {
             console.log('Connecté à la base de données' );
             return {
                 db: client.db('messageGenerator'),
                 collection :  client.db('messageGenerator').collection('generators')
             }
         })
     }
}

module.exports = {
    Connection
};
