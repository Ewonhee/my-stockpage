// pages/StocksPage.js
'use client'

import React, { useState } from 'react';
import axios from 'axios';

const StocksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?isu_nm=${searchTerm}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>KOSPI Day Trade Information</h1>
      <input
        type="text"
        placeholder="Enter ISU_NM..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResult.map((stock, index) => (
          <div key={index}>
            <p>BAS_DD: {stock.BAS_DD}</p>
            <p>ISU_CD: {stock.ISU_CD}</p>
            <p>ISU_NM: {stock.ISU_NM}</p>
            <p>MKT_NM: {stock.MKT_NM}</p>
            <p>SECT_TP_NM: {stock.SECT_TP_NM}</p>
            <p>TDD_CLSPRC: {stock.TDD_CLSPRC}</p>
            {/* 필요한 다른 데이터들도 위와 같은 방식으로 표시할 수 있음 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StocksPage;
