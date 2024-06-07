import React, { useState, useEffect } from 'react';

function Manager({ setMode }) {
  const [purchaseLogs, setPurchaseLogs] = useState([]);

  useEffect(() => {
    fetch('/purchase-log')
      .then((res) => res.json())
      .then((data) => setPurchaseLogs(data));
  }, []);

  return (
    <div>
      <h2>Manager Page</h2>
      <h3>Purchase Logs</h3>
      <ul>
        {purchaseLogs.map((log, index) => (
          <li key={index}>
            아이디 : {log.username} 
            구매 품목 : {log.productname} 
            가격 : {log.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Manager;
