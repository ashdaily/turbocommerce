import React from 'react';
import styles from './Style.module.scss';

const NoProduct = () => {
    return (
        <div className={styles.noDataCont}>
            <div className={styles.wishlistLoginIcon}>
                <img src={require('../../assets/images/no-results.svg')} alt="No Product Found Icon"/>
            </div>
            <div className={styles.noDataText}>
                We couldn't find any matches!
            </div>
            <div className={styles.subText}>
                Please check the spelling or try searching something else
            </div>

        </div>
    )
};

export default NoProduct;
