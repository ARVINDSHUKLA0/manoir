import React, { useContext, useEffect } from 'react';
import '../../Css/CartSidebar.css';
import { AddtoCardWarpper } from '../../ContextApi/AddtocartCompoents'; // ✅ correct context import

const CartSidebar = () => {
  const { isCartOpen, closeCart } = useContext(AddtoCardWarpper); // ✅ correct context usage

  useEffect(() => {
    const cartComp = document.getElementById('cartComp');
    const WraperCart = document.getElementById('WraperCart');

    if (!cartComp || !WraperCart) return;

    if (isCartOpen) {
      cartComp.style.display = 'flex';
      setTimeout(() => {
        WraperCart.style.left = '0px';
      }, 10);
    } else {
      WraperCart.style.left = '400px';
      setTimeout(() => {
        cartComp.style.display = 'none';
      }, 300);
    }
  }, [isCartOpen]);

  return (
    <div>
      <div className="CartContainer" id='cartComp'>
        <div className="Wrapper-bg-Cart" onClick={closeCart}></div>
        <div className="cart-wraper d-flex flex-column" id='WraperCart'>
          <div className='d-flex justify-content-between align-items-center my-3 ms-4 me-4'>
            <h5 className='mt-1 fw-light'>Shopping cart</h5>
            <div className='cart-remove-btn' onClick={closeCart}>
              <i className="fa-solid fa-xmark text-center custom-remove-set fs-5"></i>
            </div>
          </div>
          <div className='aside-cart-height'>
            <h1>Cart content goes here...</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
