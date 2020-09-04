import React from "react";
import { useSelector } from "react-redux";

function ShoppingCart() {
  const shoppingCart = useSelector((state) => state.shoppingCart);

  // Ik heb onderstaande functies flink korter geschrevne. De bewerking die je in de .map method deed kun je ook gewoon binnen de reduce functie doen. Je hoeft niet eerste alle prices in een array te mappen, omdat je binnen de reduce method ook toegang hebt tot de amount en price properties van die objecten.

  const totalAmount = shoppingCart.products
    .reduce((sum, cur) => sum + cur.amount, 0)

  const totalPrice = shoppingCart.products
    .reduce((sum, cur) => sum + (cur.price * cur.amount), 0)

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>total amount: {totalAmount}</p>
      <p>total price: {totalPrice} </p>
    </div>
  );
}

export default ShoppingCart;
