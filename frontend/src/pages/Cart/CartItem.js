import React, {useContext} from 'react';
import styles from './Style.module.scss';
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import csx from 'classnames';
import {ShopContext} from "../../context/ShopContext";
import {Link} from "react-router-dom";

const CartItem = ({product, handleQtyBtn}) => {
    const {removeProduct, storeInfo} = useContext(ShopContext);

    const handleRemove = (id, variant_id) => {
        removeProduct(id, variant_id);
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.upperTile}>
                <div className={styles.productImg}>
                    <Link to={product.product_url}>
                    <ImageLoader src={product.image} alt={product.name}/>
                    </Link>
                </div>
                <div className={styles.flex}>
                    <div className={styles.detailCont}>
                        <div className={styles.nameCont}>
                            <div className={styles.brandText}>
                                {product.brand}
                            </div>
                            <div className={styles.nameText}>
                                <Link to={product.product_url}>
                                {product.name}
                                </Link>
                            </div>
                        </div>
                        <div className={styles.priceCont}>
                            <div className={styles.priceText}>
                                {storeInfo.default_currency} {product.price}
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
