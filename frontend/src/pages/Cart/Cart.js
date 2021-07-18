import React, {useCallback, useContext, useState} from "react";
import {Button} from 'react-bootstrap';
import {ShopContext} from "../../context/ShopContext";
import styles from './Style.module.scss';
import csx from 'classnames';
import CartItem from "./CartItem";
import QuantityModal from "../../components/QuantityModal/QuantityModal";
import EmptyCart from "./EmptyCart";
import ProductCarousel from "../../components/ProductCarousel";
import {isLoggedIn} from "../../util/Auth";

const Cart = ({history}) => {
    const {changeCartQty, storeInfo, cartItems, total} = useContext(ShopContext);
    const [showQtyModal, setQtyModal] = useState(false);
    const [cartItem, setCartItem] = useState(null);

    const renderTotalItems = () => {
        return (<>{cartItems.length} {cartItems.length > 1 ? 'Items' : 'Item'}</>);
    };

    const handleQtyChange = (qty) => {
        if (qty) {
            changeCartQty(cartItem.id, cartItem.variant_id, qty);
        }
        setQtyModal(false);
        setCartItem(null);
    };

    const handleQtyBtn = useCallback((cartItem) => {
        setCartItem(cartItem);
        setQtyModal(true);
    }, [setQtyModal, setCartItem]);

    if (cartItems.length === 0) {
        return (<EmptyCart/>);
    }

    const handleCheckoutClick = () => {
        if (isLoggedIn) {
            history.push(`/checkout/`);
        } else {
            history.push('/login');
        }
    };

    return (
        <div className={csx('container')}>
            <div className={styles.cartCont}>
                <div className={styles.leftCont}>
                    <div className={styles.cartHeader}>
                        <div className={styles.bagTitle}>My Shopping Bag ({renderTotalItems()})</div>
                        <div className={styles.bagTotal}>Total: {storeInfo.default_currency} {total}</div>
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
                        <div> {storeInfo.default_currency} {total}</div>
                    </div>
                    <div className={styles.totalPriceInfo}>
                        <div>Total Amount</div>
                        <div> {storeInfo.default_currency} {total}</div>
                    </div>
                    <div>
                        <Button onClick={handleCheckoutClick} variant="outline-secondary" className={csx(styles.orderBtn, 'mt-4')}>Place
                            Order</Button>
                    </div>
                </div>
            </div>
            <ProductCarousel
                startContent={(<div className={styles.suggestedCont}></div>)}
                productId={cartItems[0].id}
            />
            <QuantityModal
                selectedQty={cartItem ? cartItem.quantity : 0}
                visible={showQtyModal}
                handleQtyChange={handleQtyChange}/>
        </div>
    )
};

export default Cart;
