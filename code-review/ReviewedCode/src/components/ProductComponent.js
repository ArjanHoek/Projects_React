import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, incrementAmount, decrementAmount } from "../redux";

const ProductComponent = (props) => {
  // setItem wordt nooit gebruikt. Wat was hier precies de bedoeling mee? Misschien om de amount aan te passen? Maar dat wordt al door je redux gedaan. Volgens mij kun je, als je toch al redux gebruikt, useState helemaal achterwege laten, tenzij je ergens een local UI state wil gebruiken, bijvoorbeeld bij een formulier dat moet worden ingevuld voordat het gesubmit wordt. Ik heb 'm er even uitgecomment, alles werkt nog zoals het deed.
  const [item, /*setItem*/] = useState({ ...props.product, amount: 1 });

  // Als je in verschillende componenten met Redux werkt zou ik wel overal dezelfde manier van schrijven hanteren. In andere componenent gebruik je de mapDispatchToProps, waarom gebruik je de dispatch hier in het component zelf in plaats van via props?
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);

  // Onderstaande functie heb ik een heel stuk korter geschreven door ternary operator te gebruiken, scheelt een hoop regels tov if/else statements.
  const updateShoppingCart = item => shoppingCart.products
    .some(itemInCart => itemInCart.id === item.id)
    ? dispatch(incrementAmount(item))
    : dispatch(addItem(item))

  const amountPerItem = shoppingCart.products.map(productInCart =>
    productInCart.title === item.title && productInCart.amount)

  return (
    <div>
      <h1>{props.product.title}</h1>
      <button onClick={() => updateShoppingCart(item)}>add to Cart</button>
      <button onClick={() => dispatch(decrementAmount(item))}>
        remove from Cart
      </button>

      <p>amount in shoppingcart: {amountPerItem}</p>
    </div>
  );
};

export default ProductComponent;
