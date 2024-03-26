import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        

        // 제목이 존재하고 빈 문자열이 아닌지 확인
        if (req.body.title == ' ') {
            return res.status(400).json({ error: '제목을 입력하세요.' });
        }

        try {
            // 데이터베이스에 연결
            const client = await connectDB();
            const db = client.db('forum');

            // 포스트 콜렉션에 새로운 문서 삽입
            await db.collection('post').insertOne(req.body);

            // 성공 응답 반환
            return res.status(200).redirect('/talk')
        } catch (error) {
            // 에러 응답 반환
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }
    } else {
        // POST 요청이 아닌 경우
        return res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
    }
}
