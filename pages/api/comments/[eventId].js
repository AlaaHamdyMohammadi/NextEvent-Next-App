import { MongoClient } from "mongodb";

async function handler(req, res) {
    const eventId = req.query.eventId;
    const client = await MongoClient.connect(
      `mongodb+srv://alaahamdy2197:41V4yYHS5vKVWmiR@cluster0.mbaesyp.mongodb.net/events?retryWrites=true&w=majority`
    );

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid data!" });
      return;
    }
    const newComment = {
    //   id: new Date().toISOString(),
      email,
      name,
      text,
      eventId
    };
    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);

    newComment.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Data Successfully Added.", data: newComment });
  }
  if (req.method === "GET") {
    // const dummyList = [
    //   { id: "c1", name: "Alaa", text: "Comment1" },
    //   { id: "c2", name: "Arwa", text: "Comment2" },
    // ];
    const db = client.db();
    const documents = await db.collection('comments').find().sort({_id: -1}).toArray();
    res
      .status(200)
      .json({ message: "Data Successfully Added.", data: documents });
  }

  client.close();
}
export default handler;
