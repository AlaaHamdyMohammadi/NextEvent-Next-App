import {connectWithDatabase, insertDocument} from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }
    let client;
    try {
      client = await connectWithDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting with database faild!" });
      return; // to not complete the below code
    }
    try {
      await insertDocument(client, 'emails', { email });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data faild!" });
      return;
    }

    res.status(201).json({ message: "Data Successfully Added." });
  } else {
    res.status(200).json({ message: "Successfully Work!" });
  }
}

export default handler;
