import React, {useContext} from "react";
import {ShopContext} from "../../context/ShopContext";
import styles from './Style.module.scss';
import csx from 'classnames';
import CartItem from "./CartItem";

const Cart = () => {
    const {cartItems, total} = useContext(ShopContext);

    return (
        <div className={csx('container')}>
            <div className={styles.cartCont}>
                <div className={styles.leftCont}>
                    <div className={styles.cartHeader}>
                        <div className={styles.bagTitle}>My Shopping Bag ({cartItems.length} {cartItems.length > 1 ? 'Items' : 'Item'})</div>
                        <div className={styles.bagTotal}>Total: ₹ {total}</div>
                    </div>
                    {cartItems.map((product, index) => (
                        <CartItem
                            key={index}
                            product={product}
                            outOfStock={product.out_of_stock}
                        />
                    ))}
                </div>
                <div className={styles.rightCont}>

                </div>
            </div>
        </div>
    )
};

export default Cart;
