import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(요청, 응답){
    if(요청.method == 'POST'){

        // 빈칸체크
        if(!요청.body.name || !요청.body.email || !요청.body.password){
            응답.status(400).json({message:'모든 필수 항목을 입력해주세요'});
            return;
        }

        //중복확인

        const client = await connectDB();
        const db = client.db('forum')
        const existingUser = await db.collection('user_cred').findOne({name: 요청.body.name});
        
        if(existingUser){
            응답.status(400).json('이미 존재하는 사용자명입니다.');
            return;
        }

        //비밀번호 해싱
        let hash = await bcrypt.hash(요청.body.password, 10)
       요청.body.password = hash
        
        //사용자추가
        await db.collection('user_cred').insertOne(요청.body);

        //가입 성공
        응답.status(200).redirect('/talk')

    } else{
        응답.status(405).json({message:'허용되지 않는 메소드'});
    }
   
}

// 빈칸 체크
// 중복된 이메일 체크
