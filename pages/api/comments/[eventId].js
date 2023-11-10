function handler(req, res){
    if(req.method === 'POST'){
        const {email, name, comment} = req.body;
        if(!email.includes('@') || !name || name.trim() === '' || !comment || comment.trim() === ''){
            res.status(422).json({message: 'Invalid data!'});
            return;
        }
        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            comment
        };
        console.log(newComment);
        res.status(201).json({ message: "Data Successfully Added.", data: newComment });
    }
    if(req.method === 'GET'){
        const {eventId} = req.query;
        
    }

    
    
}
export default handler;
