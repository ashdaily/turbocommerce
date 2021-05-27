import React from 'react';
import styles from './Style.module.scss';
import ImageLoader from "../../components/ImageLoader/ImageLoader";


const CartItem = ({product}) => {
    console.log('product', product);
    return (
        <div className={styles.itemContainer}>
            <div className={styles.upperTile}>
                <div className={styles.productImg}>
                    <ImageLoader src={product.image} alt={product.name}/>
                </div>
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
            </div>
            <div className={styles.lowerTile}>
                <button className={styles.removeBtn} type={'button'}>
                    REMOVE
                </button>
            </div>
        </div>
    );
}

export default CartItem;
