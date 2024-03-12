import axios from 'axios';

export default async function handler(req, res) {
  const URL_STOCK_KOSPI_DAY_TRADE = 'http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd';
  const urlInput = '?basDd=';
  const targetDate = '20240305';

  const url = URL_STOCK_KOSPI_DAY_TRADE + urlInput + targetDate;
  const headers = {
    'AUTH_KEY': '179EFED4186342CC979B9F82064283D3DA46740A' // 샘플 인증 키
  };

  try {
    const response = await axios.get(url, { headers });
    
    console.log('200 is ok:', response.status);
    // console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
