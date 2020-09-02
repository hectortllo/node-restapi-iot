import MongoClient from 'mongodb';

export async function connect() {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27018', {
      useUnifiedTopology: true
    })
    const db = client.db('restapi-iot');
    console.log('DB is connected');
    return db;
  } catch(err) {
    console.log(err);
  }
}
