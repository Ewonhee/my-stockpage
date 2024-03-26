import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://ii3952:test@stock-next.betuwnc.mongodb.net/?retryWrites=true&w=majority&appName=stock-next';
const options = { useNewUrlParser: true }; // 옵션 추가

let client;

async function connectDB() {
  if (!client) {
    client = await MongoClient.connect(url, options); // MongoClient 인스턴스 생성 및 연결
  }
  return client;
}

export { connectDB };