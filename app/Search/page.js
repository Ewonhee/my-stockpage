'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StocksPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/stock/isu');
        setStockData(response.data.OutBlock_1);
        setLoading(false);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error); // 데이터를 불러오는 중 오류가 발생했습니다
      }
    };

    fetchData();
  }, []);

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

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>코스피 주식 거래 정보</h1> {/* KOSPI Day Trade Information -> 코스피 주식 거래 정보 */}
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
          {filteredData.length === 0 ? (
            <p>데이터가 없습니다.</p> 
          ) : (
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
                  <p className="data-value" >거래 기준일: {stock.BAS_DD}</p> {/* BAS_DD: -> 거래 기준일: */}
                  <p className="data-value" >종목 코드: {stock.ISU_CD}</p> {/* ISU_CD: -> 종목 코드: */}
                  <p className="data-value" >시장 구분: {stock.MKT_NM}</p> {/* MKT_NM: -> 시장 구분: */}
                  <p className="data-value" >섹션 구분: {stock.SECT_TP_NM}</p> {/* SECT_TP_NM: -> 섹션 구분: */}
                  <p className="data-value" >거래 종가: {stock.TDD_CLSPRC}</p> {/* TDD_CLSPRC: -> 거래 종가: */}
                  <p className="data-value" >전일 대비 가격 변동: {stock.CMPPREVDD_PRC}</p> {/* CMPPREVDD_PRC: -> 전일 대비 가격 변동: */}
                  <p className="data-value" >등락률: {stock.FLUC_RT}</p> {/* FLUC_RT: -> 등락률: */}
                  <p className="data-value" >거래 시가: {stock.TDD_OPNPRC}</p> {/* TDD_OPNPRC: -> 거래 시가: */}
                  <p className="data-value" >거래 고가: {stock.TDD_HGPRC}</p> {/* TDD_HGPRC: -> 거래 고가: */}
                  <p className="data-value" >거래 저가: {stock.TDD_LWPRC}</p> {/* TDD_LWPRC: -> 거래 저가: */}
                  <p className="data-value" >누적 거래량: {stock.ACC_TRDVOL}</p> {/* ACC_TRDVOL: -> 누적 거래량: */}
                  <p className="data-value" >누적 거래대금: {stock.ACC_TRDVAL}</p> {/* ACC_TRDVAL: -> 누적 거래대금: */}
                  <p className="data-value" >시가총액: {stock.MKTCAP}</p> {/* MKTCAP: -> 시가총액: */}
                  <p className="data-value" >상장주식수: {stock.LIST_SHRS}</p> {/* LIST_SHRS: -> 상장주식수: */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StocksPage;
