// pages/api/post/delete/[id].js

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const postId = req.query.id;

    try {
      // 데이터베이스에 연결
      const client = await connectDB();
      const db = client.db('forum');

      // 삭제할 문서를 식별하기 위해 ObjectId로 변환
      const objectId = new ObjectId(postId);

      // 해당 ID를 가진 문서를 삭제합니다.
      const result = await db.collection('post').deleteOne({ _id: objectId });

      if (result.deletedCount === 1) {
        // 삭제가 성공적으로 이루어진 경우
        return res.status(200).json({ message: '삭제 성공' });
      } else {
        // 해당 ID를 가진 문서가 존재하지 않는 경우
        return res.status(404).json({ error: '해당 ID를 가진 문서가 존재하지 않습니다.' });
      }
    } catch (error) {
      // 에러가 발생한 경우
      console.error('삭제 요청 오류:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
  } else {
    // DELETE 요청이 아닌 경우
    return res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
  }
}
