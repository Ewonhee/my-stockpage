import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res){
    if(req.method === 'DELETE'){
        try {

            console.log(req.body)

            // MongoDB와 연결하여 댓글을 삭제합니다.
            const client = await connectDB();
            const db = client.db('forum');
            const result = await db.collection('comment').deleteOne({ _id: new ObjectId(req.body) });

            // 삭제 결과에 따라 응답을 반환합니다.
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.' });
            } else {
                return res.status(404).json({ error: '해당 ID를 가진 댓글을 찾을 수 없습니다.' });
            }
        } catch (error) {
            console.error('삭제 요청 오류:', error);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }
    } else {
        return res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
    }
}
