import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

// const secret = process.env.NEXTAUTH_SECRET || '기본-비밀-값';

export const authOptions = {

  

  providers: [
    GithubProvider({
      clientId: '1b1746e9a6bf10ae14c2',
      clientSecret: '3b61f2285960a7bbd47a4741f1d749e15b64beeb',
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {

        const client = await connectDB();
        const db = client.db('forum')
        let user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },


  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: '123'
};
export default NextAuth(authOptions); 


// Q1. 회원가입 시켜주기 전에 이름, 이메일, 비번란에 빈칸을 보내는 경우 가입을 거절해봅시다.

// Q2. 회원가입 시켜주기 전에 같은 이메일이 이미 DB에 있는지 조회부터 해보고 

// 같은 이메일이 이미 DB에 있으면 가입을 거절해봅시다.


// Q3. /write 페이지는 로그인한 사람만 보여주려면? 

//------------------------------

// Q4. 관리자 권한을 가진 유저는 모든 글을 삭제가능하게 서버기능을 업그레이드해봅시다. 