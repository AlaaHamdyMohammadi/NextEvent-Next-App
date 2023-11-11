import { MongoClient } from "mongodb";

async function handler(req, res) {
    const eventId = req.body;
    const client = await MongoClient.connect(
      `mongodb+srv://alaahamdy2197:knltmhsjumbIIe3r@cluster0.27emoal.mongodb.net/NextJSEvents?retryWrites=true&w=majority`
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
      email,
      name,
      text,
      eventId,
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
    // const {eventId} = req.query;
    const dummyList = [
      { id: "c1", name: "Alaa", text: "Comment1" },
      { id: "c2", name: "Arwa", text: "Comment2" },
    ];
    res
      .status(200)
      .json({ message: "Data Successfully Added.", data: dummyList });
  }

  client.close();
}
export default handler;
