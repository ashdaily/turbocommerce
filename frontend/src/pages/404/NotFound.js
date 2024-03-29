import React from 'react';
import styles from './Style.module.scss';

const NotFound = () => {
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

export default NotFound;
