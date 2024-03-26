import axios from 'axios';

export default async function handler(req, res) {
  // 클라이언트로부터 받은 종목명
  const { stockName } = req.query;

  // 주식 데이터 API의 엔드포인트와 기본 URL
  const URL_STOCK_KOSPI_DAY_TRADE = 'http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd';
  const urlInput = '?basDd=';

  // 오늘 날짜를 YYYYMMDD 형식으로 변환
  const currentDate = new Date();
  const targetDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

  // 외부 API 요청을 위한 URL 및 인증 헤더
  const url = `${URL_STOCK_KOSPI_DAY_TRADE}${urlInput}${targetDate}`;
  const headers = {
    'AUTH_KEY': '179EFED4186342CC979B9F82064283D3DA46740A' // 실제 인증 키 사용
  };

  try {
    // 외부 API로부터 주식 데이터 요청
    const response = await axios.get(url, { headers });
    console.log('Data fetched successfully');

    // 클라이언트에 응답 데이터 전송
    res.status(200).json(response.data);
  } catch (error) {
    // 오류가 발생한 경우 콘솔에 오류 메시지 출력 및 클라이언트에 오류 응답 전송
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
