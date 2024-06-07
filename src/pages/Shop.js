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
      
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.productimg} alt={product.productname} />
            <h3>{product.productname}</h3>
            <p>Price: {product.productprice}</p>
            <p>Available: {product.productamount}</p>
            {isLoggedIn && (
              <button onClick={() => handlePurchase(product.id)}>Buy</button>
            )}
          </div>
        ))}
        <button onClick={() => setMode('WELCOME')}>돌아가기</button>
      </div>
    </div>
  );
}

export default Shop;
