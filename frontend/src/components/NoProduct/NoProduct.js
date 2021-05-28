import React from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';


const NoProduct = () => {
    return (
        <div className={styles.noDataCont}>
            <div className={styles.noDataText}>
                The page you are looking for can't be found.
            </div>
            <div className={styles.codeText}>
                404
            </div>
        </div>
    )
};

export default NoProduct;
