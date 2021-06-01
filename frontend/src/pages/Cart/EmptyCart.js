import React from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';
import {Link} from "react-router-dom";


const EmptyCart = () => {
    return (
        <div className={styles.noDataCont}>
            <div className={styles.wishlistLoginIcon}>
                <img src={require('../../assets/images/no-results.svg')} alt="Empty Cart Icon"/>
            </div>
            <div className={styles.noDataText}>
                Hey, No Product In Cart!
            </div>
            <div className={styles.subText}>
                There is nothing in your bag. Let's add some items.
            </div>
            <Link to={'wishlist'}>
                <div className={styles.wishListBtn}>GO TO WISHLIST</div>
            </Link>
        </div>
    )
};

export default EmptyCart;
