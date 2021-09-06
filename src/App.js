//rafce cria o código abaixo através deste atalho.

import React, {useState, useEffect} from 'react'

import {commerce} from './lib/commerce';
// import Products from './components/Products/Products'
//Maneira de  importar vários componentes de de forma simplificada.

import {Products, Navbar, Cart, Checkout} from './components';
// import {Checkout} from './components/CheckoutForm/Checkout/Checkout'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([]);
    const[cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }
    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId,quantity);
        setCart(response.cart);
    }

    const handleUpdateToCart = async (productId, quantity) => {
        const response = await commerce.cart.update(productId,{quantity});
        setCart(response.cart);
    }

    const handleRemoveToCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

   

    return (
        <Router>
        <div>
           <Navbar totalItems={cart.total_items}/>
           <Switch>
               <Route exact path="/">
           <Products products={products} onAddToCart={handleAddToCart}/>

               </Route>

               <Route exact path="/cart"> 
           <Cart cart = {cart} 
           handleUpdateToCart={handleUpdateToCart}
           handleRemoveToCart={handleRemoveToCart}
           handleEmptyCart={handleEmptyCart}/>         
               </Route>
               <Route exact path="/checkout">
                    <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                    />
               </Route>
           </Switch>
        </div>
        </Router>
    )
}
export default App