const generateExampleStockData = (startDate, endDate) => {
  const exampleStockData = [];
  const currentDate = new Date(startDate);

  // 시작일부터 종료일까지의 데이터 생성
  while (currentDate <= endDate) {
    const date = currentDate.toISOString().split('T')[0];
    const closePrice = Math.floor(Math.random() * 200) + 100; // 100부터 300 사이의 랜덤 가격 생성
    exampleStockData.push({ date, closePrice });

    // 다음 날로 이동
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return exampleStockData;
};

const startDate = new Date('2023-03-14');
const endDate = new Date('2024-03-15');
const exampleStockData = generateExampleStockData(startDate, endDate);

export default exampleStockData;
