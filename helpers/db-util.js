import { MongoClient } from "mongodb";

export async function connectWithDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://alaahamdy2197:41V4yYHS5vKVWmiR@cluster0.mbaesyp.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client , collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter){
        const db = client.db();
        const documents = await db
          .collection(collection)
          .find(filter) // to get just comments of this event.
          .sort(sort)
          .toArray();
    return documents
}   
