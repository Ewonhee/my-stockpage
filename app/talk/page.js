// pages/posts.js

import { connectDB } from '@/util/database';
import Listltem from './Listltem';




export default async function Posts() {

  const client = await connectDB();
  const db = client.db('forum');
  const result = await db.collection('post').find().toArray();
  // console.log(result)

  return (
    <div>
      <Listltem result={result}/>
    </div>
  );
}
