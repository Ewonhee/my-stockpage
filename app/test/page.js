import { connectDB } from "/util/database.js";

export default async function Home() {
  const client = await connectDB();
  const db = client.db('forum');
  const result = await db.collection('post').find().toArray();

  console.log(result)

  return (
    <main>
      <h1>테스트 페이지 입니다</h1>
    </main>
  )
}