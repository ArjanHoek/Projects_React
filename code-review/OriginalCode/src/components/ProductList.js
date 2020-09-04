import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../redux";
// Je had product eerst binnen {} staan en het ProductComponent in het bestand 'verkeerd' geëxporteerd. In plaats van export default deed je direct export const, wat wel werkte maar niet gebruikelijk is.
import ProductComponent from "./ProductComponent";

// Ik heb onderstaande component zoveel mogelijk DRY herschreven. Er zat overigens een kleine bug in de action bij het starten van het laden van de data (zie productsActions.js voor commentaar). 

function ProductList(props) {
  // Vanwege onderstaand gebruik van useEffect komt er een warning in de console. Ik begrijp niet precies wat die warning betekent en wat de bedoeling is om het probleem te fixen. Misschien kun je hier zelf even naar kijken?
  useEffect(() => {
    props.fetchProducts()
  }, []);

  let output = <p>Loading...</p>

  !props.loading && (output = (
    props.products.map(product =>
      <ProductComponent key={product.id} product={product} />)
  ))

  props.error && (output = <h2>{props.error}</h2>)

  return (
    // Ik heb de <div> vervangen door fragment. Tenzij je de div wil stylen is het niet nodig om ze in een div te wrappen. <Fragment> is een higher order component (geloof dat dat zo genoemd wordt) die alleen de h2 en alle losse productComponents in de html parsed, zonder een wrapping div. Dan is je html code uiteindelijk wat 'schoner'. Maar nogmaals, als je je div wil stylen heb je natuurlijk alsnog een div nodig.
    <Fragment>
      <h2>product list</h2>
      {output}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    // Hier stuur je de hele state mee van productsData. Je kunt ook al in deze return de verschillende properties onderscheiden, dat is een stuk overzichtelijker. In de component hierboven verwijs je dan simpelweg naar de props met het juiste object. Zelfde geldt voor de dispatch, die haal je ook via props in het component. Heb het hierboven aangepast. Vind het zelf veel overzichterlijk, maar dat moet je natuurlijk zelf weten. Ik houd de code binnen het component graag zo simpel mogelijk, als er dingen kunnen worden onderscheiden van elkaar, zoals de properties hieronder, staat het netter om dat hier alvast te doen.
    error: state.products.error,
    loading: state.products.loading,
    products: state.products.products
    // Originele code:
    // productsData: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
