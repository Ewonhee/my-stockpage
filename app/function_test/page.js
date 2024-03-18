'use client'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, BarElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import exampleStockData from './exampleStockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, BarElement);

const StockChart = () => {
  const [chartData, setChartData] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [selectedTab, setSelectedTab] = useState('3M'); // Default: 3개월 선택

  useEffect(() => {
    if (exampleStockData) {
      const currentDate = new Date();
      const filteredData = filterDataByMonths(exampleStockData, currentDate, selectedTab);
      const labels = filteredData.map(data => data.date);
      const prices = filteredData.map(data => data.closePrice);
      
      // 고점과 저점 찾기
      const highest = Math.max(...prices);
      const lowest = Math.min(...prices);

      setHighestPrice(highest);
      setLowestPrice(lowest);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Stock Prices',
            data: prices,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointBackgroundColor: prices.map(price => {
              if (price === highest) return 'red'; // 고점일 때 빨간색
              if (price === lowest) return 'blue'; // 저점일 때 파란색
              return 'rgba(0, 0, 0, 0)'; // 그 외에는 투명색
            })
          }
        ],
      });
    }
  }, [selectedTab]); // selectedTab이 변경될 때마다 useEffect 재실행

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const filterDataByMonths = (data, currentDate, selectedTab) => {
    const monthsMap = {
      '3M': 3,
      '6M': 6,
      '12M': 12
    };
    const monthsDiff = monthsMap[selectedTab];
    return data.filter(data => {
      const dataDate = new Date(data.date);
      const monthsDiffCurrent = (currentDate.getFullYear() - dataDate.getFullYear()) * 12 + (currentDate.getMonth() - dataDate.getMonth());
      return monthsDiffCurrent <= monthsDiff;
    });
  };

  return (
    <div className='chart-container'>
      <div className='tabs'>
        <button className={selectedTab === '3M' ? 'active' : ''} onClick={() => handleTabChange('3M')}>최근 3개월</button>
        <button className={selectedTab === '6M' ? 'active' : ''} onClick={() => handleTabChange('6M')}>최근 6개월</button>
        <button className={selectedTab === '12M' ? 'active' : ''} onClick={() => handleTabChange('12M')}>최근 12개월</button>
      </div>
      {chartData && (
        <div> 
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
              plugins: {
                title: {
                  display: true,
                  text: `⬆️고점: ${highestPrice} / ⬇️저점: ${lowestPrice}`,
                  position: 'bottom'
                }
              },
              scales: {
                x: {
                  type: 'time',
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
