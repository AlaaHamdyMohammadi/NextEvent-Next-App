import {
  connectWithDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectWithDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting with database faild!" });
  }

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
    client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Data Successfully Added.", data: newComment });
    } catch (err) {
      res.status(500).json({ message: "Inserting data faild!" });
      return;
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res
        .status(200)
        .json({ message: "Data Successfully Added.", data: documents });
    } catch (err) {
      res.status(500).json({ message: "Get all data is faild!" });
    }
  }

  client.close();
}
export default handler;
