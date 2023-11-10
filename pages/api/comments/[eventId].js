function handler(req, res) {
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
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
}
export default handler;
