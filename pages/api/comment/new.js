import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"


export default async function handler(req, res){

    if(req.method == 'POST'){
        
        req.body = JSON.parse(req.body)

        let dataset = {
            content : req.body.comment,
            parent : new ObjectId(req.body._id)
        }

        const client = await connectDB();
        const db = client.db('forum')
        let result = await db.collection('comment').insertOne(dataset)
        res.status(200).json()


    }

}