import axios from 'axios';

export default async function handler(req, res) {
  console.log(req.query.date);
  const URL_STOCK_KOSPI_DAY_TRADE = 'http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd';
  const urlInput = '?basDd=';
  const dateParts = req.query.date.split('-'); // 날짜를 년, 월, 일로 분리
  const targetDate = dateParts.join(''); // 날짜를 다시 합쳐서 YYYYMMDD 형식으로 변환
  const url = URL_STOCK_KOSPI_DAY_TRADE + urlInput + targetDate;
  const headers = {
    'AUTH_KEY': '179EFED4186342CC979B9F82064283D3DA46740A' // 샘플 인증 키
  };  

  console.log(targetDate)

  try {
    const response = await axios.get(url, { headers });
    console.log('data ok')
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
