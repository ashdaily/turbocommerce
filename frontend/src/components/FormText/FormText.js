import React from 'react';
import csx from "classnames";
import styles from "./Style.module.scss";

const FormText = ({value, isError, onChange, name, label, placeholder, type, multiline, rows}) => {
    let tempComponent = null;
    if (multiline) {
        tempComponent = (<textarea
            rows={rows}
            value={value}
            onChange={onChange}
            className={csx(styles.inputbox2, (isError ? styles.error : ''))}
            name={name}
            placeholder={placeholder}
        />)
    } else {
        tempComponent = (<input
            type={type}
            value={value}
            onChange={onChange}
            className={csx(styles.inputbox2, (isError ? styles.error : ''))}
            name={name}
            placeholder={placeholder}
        />)
    }
    return (
        <>
            {label && (<label>{label}</label>)}
            {tempComponent}
        </>
    )
};

FormText.defaultProps = {
    type: 'text',
    multiline: false,
    rows: 1,
};

export default FormText;
