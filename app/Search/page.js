'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StocksPage = () => {
  const [stockData, setStockData] = useState([]); // 주식 데이터 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태 변수
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 변수
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 변수
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 상태 변수

  // 선택된 날짜가 변경될 때마다 주식 데이터를 가져오는 함수 호출
  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [selectedDate]);

  // 선택된 날짜로 주식 데이터를 가져오는 비동기 함수
  const fetchData = async (targetDate) => {
    try {
      const response = await axios.get(`/api/stock/isu?date=${targetDate}`);
      // 서버에서 받아온 데이터 중 필요한 부분만 추출하여 저장
      const extractedData = response.data.OutBlock_1;
      setStockData(extractedData);
      setLoading(false); // 로딩 상태 변경
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // 로딩 상태 변경
    }
  };

  // 검색어가 변경될 때마다 필터링된 데이터 업데이트
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(stockData);
    } else {
      const filtered = stockData.filter(item =>
        item.ISU_NM.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, stockData]);

  // 검색어 입력 핸들러
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  // 날짜 선택 핸들러
  const handleDateChange = event => {
    setSelectedDate(event.target.value);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>코스피 주식 거래 정보</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />
      <input
        type="text"
        placeholder="검색..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />
      {loading ? (
        <p>로딩 중...</p> 
      ) : (
        <div>
          {filteredData && filteredData.length > 0 ? (
            <div>
              {filteredData.map(stock => (
                <div
                  key={stock.ISU_CD}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <p className="data-value" style={{ color: 'red' }} ><strong>{stock.ISU_NM}</strong></p>
                  <p className="data-value" >거래 기준일: {stock.BAS_DD}</p>
                  <p className="data-value" >종목 코드: {stock.ISU_CD}</p>
                  <p className="data-value" >시장 구분: {stock.MKT_NM}</p>
                  <p className="data-value" >섹션 구분: {stock.SECT_TP_NM}</p>
                  <p className="data-value" >거래 종가: {stock.TDD_CLSPRC}</p>
                  <p className="data-value" >전일 대비 가격 변동: {stock.CMPPREVDD_PRC}</p>
                  <p className="data-value" >등락률: {stock.FLUC_RT}</p>
                  <p className="data-value" >거래 시가: {stock.TDD_OPNPRC}</p>
                  <p className="data-value" >거래 고가: {stock.TDD_HGPRC}</p>
                  <p className="data-value" >거래 저가: {stock.TDD_LWPRC}</p>
                  <p className="data-value" >누적 거래량: {stock.ACC_TRDVOL}</p>
                  <p className="data-value" >누적 거래대금: {stock.ACC_TRDVAL}</p>
                  <p className="data-value" >시가총액: {stock.MKTCAP}</p>
                  <p className="data-value" >상장주식수: {stock.LIST_SHRS}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StocksPage;
