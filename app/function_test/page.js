'use client'

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, BarElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import exampleStockData from './exampleStockData'; // 예시 데이터 가져오기
// import styles from './StockChart.module.css'; // global.css 대신 StockChart.module.css를 import

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, BarElement);

const StockChart = () => {
  const [chartData, setChartData] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);
  const [lowestPrice, setLowestPrice] = useState(null);

  useEffect(() => {
    if (exampleStockData) {
      const labels = [];
      const prices = [];
      
      // 데이터 5일 간격으로 필터링
      for (let i = 0; i < exampleStockData.length; i += 5) {
        labels.push(exampleStockData[i].date);
        prices.push(exampleStockData[i].closePrice);
      }
      
      // 고점과 저점 찾기
      const highest = Math.max(...prices);
      const lowest = Math.min(...prices);

      setHighestPrice(highest);
      setLowestPrice(lowest);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Stock Prices (Line)',
            data: prices,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointBackgroundColor: prices.map(price => {
              if (price === highest) return 'red'; // 고점일 때 빨간색
              if (price === lowest) return 'blue'; // 저점일 때 파란색
              return 'rgba(0, 0, 0, 0)'; // 그 외에는 투명색
            })
          },
          {
            label: 'Stock Prices (Bar)',
            data: prices,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ],
      });
    }
  }, []);

 

  return (
    <div className='chart-container'> {/* global.css 대신 StockChart.module.css를 사용 */}
      {chartData && (
        <div>
          <div>
            <h3>고점: {highestPrice}</h3>
          </div>
          <div>
            <h3>저점: {lowestPrice}</h3>
          </div>
          <Line
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: chartData.datasets[0].label,
                  data: chartData.datasets[0].data,
                  fill: chartData.datasets[0].fill,
                  borderColor: chartData.datasets[0].borderColor,
                  tension: chartData.datasets[0].tension,
                  pointBackgroundColor: chartData.datasets[0].pointBackgroundColor
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: 'time', // 시간 축으로 설정
                  time: {
                    unit: 'day'
                  }
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: chartData.datasets[1].label,
                  data: chartData.datasets[1].data,
                  backgroundColor: chartData.datasets[1].backgroundColor,
                  borderColor: chartData.datasets[1].borderColor,
                  borderWidth: chartData.datasets[1].borderWidth
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: 'time', // 시간 축으로 설정
                  time: {
                    unit: 'day'
                  }
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StockChart;
