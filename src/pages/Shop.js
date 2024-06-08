import React, { useState, useEffect } from 'react';

function Shop({ setMode }) {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/authcheck')
      .then((res) => res.json())
      .then((json) => {
        setIsLoggedIn(json.isLogin === 'True');
      });

    fetch('http://localhost:3001/shop')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handlePurchase = (productId) => {
    fetch('http://localhost:3001/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('성공적으로 구매가 되었습니다!');
          // Optionally, update the product list or user's coins here
        } else {
          alert('구매 실패 : ' + data.message);
        }
      });
  };

  return (
    <div className="shop">
      <h2>Shop</h2>
      
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.productimg} alt={product.productname} /></td>
              <td>{product.productname}</td>
              <td>{product.productprice}</td>
              <td>{product.productamount}</td>
              <td>
                {isLoggedIn && (
                  <button onClick={() => handlePurchase(product.id)}>Buy</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setMode('WELCOME')}>돌아가기</button>
    </div>
  );
}

export default Shop;
