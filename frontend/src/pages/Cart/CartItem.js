import React, {useContext} from 'react';
import styles from './Style.module.scss';
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import csx from 'classnames';
import {ShopContext} from "../../context/ShopContext";

const CartItem = ({product, handleQtyBtn}) => {
    const {removeProduct, increase, decrease} = useContext(ShopContext);

    const handleRemove = (id, variant_id) => {
        removeProduct(id, variant_id);
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.upperTile}>
                <div className={styles.productImg}>
                    <ImageLoader src={product.image} alt={product.name}/>
                </div>
                <div className={styles.flex}>
                    <div className={styles.detailCont}>
                        <div className={styles.nameCont}>
                            <div className={styles.brandText}>
                                {product.brand}
                            </div>
                            <div className={styles.nameText}>
                                {product.name}
                            </div>
                        </div>
                        <div className={styles.priceCont}>
                            <div className={styles.priceText}>
                                ₹ {product.price}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { handleQtyBtn(product) }} className={styles.qtyBtn}>
                            Qty. {product.quantity} <span className={'fa fa-sort-down'}></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.lowerTile}>
                <button
                    className={csx('btn', styles.removeBtn)}
                    type={'button'}
                    onClick={() => handleRemove(product.id, product.variant_id)}
                >
                    REMOVE
                </button>
            </div>
        </div>
    );
}

export default CartItem;
