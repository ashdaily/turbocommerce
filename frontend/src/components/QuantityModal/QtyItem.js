import React from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';

const QtyItem = ({title, isSelected, handleChange}) => {

    const handleClick = () => {
        handleChange(title);
    }

    return (
        <button onClick={handleClick} className={csx(styles.itemCont, isSelected ? styles.itemSelected : '')}>
            {title}
        </button>
    );
};

export default QtyItem;
