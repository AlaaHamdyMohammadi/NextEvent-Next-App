import {MongoClient} from 'mongodb';

// import fs from 'fs';
// import path from 'path';

async function handler(req, res){
    if(req.method === 'POST'){
        const {email} = req.body;

        if(!email || !email.includes('@')){
            res.status(422).json({message: 'Invalid email address!'});
            return;
        }

        const client = await MongoClient.connect(`mongodb+srv://alaahamdy2197:knltmhsjumbIIe3r@cluster0.27emoal.mongodb.net/NextJSEvents?retryWrites=true&w=majority`);
        const db = client.db();
        await db.collection('emails').insertOne({email})
        client.close();

        // const newRegister = {
        //     id: new Date().toISOString(),
        //     email,
        // }

        // const filePath = path.join(process.cwd(), 'data', 'data.json');
        // const fileData = fs.readFileSync(filePath);
        // const data = JSON.parse(fileData);
        // data.push(newRegister);
        // fs.writeFileSync(filePath, JSON.stringify(data));
        // res.status(201).json({message: "Data Successfully Added.", data: newRegister})
        res.status(201).json({message: "Data Successfully Added."})
    }else{
        res.status(200).json({message: 'Successfully Work!'})
    }
}

export default handler;