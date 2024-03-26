import { connectDB } from "/util/database.js";

export default async function Home() {
  const client = await connectDB();
  const db = client.db('forum');
  const result = await db.collection('post').find().toArray();

  console.log(result)

  return (
    <main>
      {result[0].content}
    </main>
  )
}