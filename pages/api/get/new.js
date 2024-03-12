export default function handler(요청, 응답) {
    // 외부 API에서 데이터를 가져와서 처리하는 코드
    const data = { /* 데이터 */ };
  
    요청.status(200).json(data);
  }