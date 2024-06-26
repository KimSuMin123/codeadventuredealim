import React, { useState, useEffect } from "react";
import {
  ShopContainer,
  ShopTitle,
  ProductTable,
  TableHeader,
  TableRow,
  BackButton,
} from "../style/ShopStyles";
import background from "../img/background.png";

function Shop({ setMode }) {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("https://www.codeadventure.shop/authcheck")
      .then((res) => res.json())
      .then((json) => {
        setIsLoggedIn(json.isLogin === "True");
      });

    fetch("https://www.codeadventure.shop/shop")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handlePurchase = (productId) => {
    fetch("https://www.codeadventure.shop/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("성공적으로 구매가 되었습니다!");
          window.location.reload();
        } else {
          alert("구매 실패 : " + data.message);
        }
      });
  };

  return (
    <ShopContainer style={{ backgroundImage: `url(${background})` }}>
      <ShopTitle>상점</ShopTitle>

      <ProductTable>
        <TableHeader>
          <tr>
            <th>이름</th>
            <th>가격</th>
            <th>물품명</th>
            <th>구매하기</th>
          </tr>
        </TableHeader>
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <td>{product.productname}</td>
              <td>{product.productprice}</td>
              <td>{product.productamount}</td>
              <td>
                {isLoggedIn && (
                  <button onClick={() => handlePurchase(product.id)}>
                    구매하기
                  </button>
                )}
              </td>
            </TableRow>
          ))}
        </tbody>
      </ProductTable>
      <BackButton onClick={() => setMode("LANGUAGE")}>돌아가기</BackButton>
    </ShopContainer>
  );
}

export default Shop;
