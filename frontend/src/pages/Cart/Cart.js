import React, {useCallback, useContext, useState} from "react";
import { Button } from 'react-bootstrap';
import {ShopContext} from "../../context/ShopContext";
import styles from './Style.module.scss';
import csx from 'classnames';
import CartItem from "./CartItem";
import QuantityModal from "../../components/QuantityModal/QuantityModal";

const Cart = () => {
    const [showQtyModal, setQtyModal] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const {cartItems, total} = useContext(ShopContext);

    const renderTotalItems = () => {
        return (<>{cartItems.length} {cartItems.length > 1 ? 'Items' : 'Item'}</>);
    };

    const handleQtyChange = (qty) => {
        if (qty) {

        }
        setQtyModal(false);
    };

    const handleQtyBtn = useCallback((cartItem) => {
        setCartItem(cartItem);
        setQtyModal(true);
    }, [setQtyModal, setCartItem]);

    return (
        <div className={csx('container')}>
            <div className={styles.cartCont}>
                <div className={styles.leftCont}>
                    <div className={styles.cartHeader}>
                        <div className={styles.bagTitle}>My Shopping Bag ({renderTotalItems()})</div>
                        <div className={styles.bagTotal}>Total: ₹ {total}</div>
                    </div>
                    {cartItems.map((product, index) => (
                        <CartItem
                            key={index}
                            product={product}
                            handleQtyBtn={handleQtyBtn}
                            outOfStock={product.out_of_stock}
                        />
                    ))}
                </div>
                <div className={styles.rightCont}>
                    <div className={styles.priceHeader}>
                        PRICE DETAILS ({renderTotalItems()})
                    </div>
                    <div className={styles.priceInfo}>
                        <div>Total MRP</div>
                        <div> ₹ {total}</div>
                    </div>
                    <div className={styles.totalPriceInfo}>
                        <div>Total Amount</div>
                        <div> ₹ {total}</div>
                    </div>
                    <div>
                        <Button variant="outline-secondary" className={csx(styles.orderBtn, 'mt-4')}>Place Order</Button>
                    </div>
                </div>
            </div>
            <QuantityModal
                visible={showQtyModal}
                handleQtyChange={handleQtyChange} />
        </div>
    )
};

export default Cart;
