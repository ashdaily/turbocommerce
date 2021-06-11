import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import styles from './Style.module.scss';
import QtyItem from "./QtyItem";
import csx from 'classnames';

const QuantityModal = ({visible, handleQtyChange, selectedQty}) => {
    const [qty, setQty] = useState(0);

    useEffect(() => {
        setQty(selectedQty);
    }, [visible, selectedQty]);

    const handleChange = (qty) => {
        setQty(qty);
    };

    const handleDone = () => {
        handleQtyChange(qty);
    };
    return (
        <Modal
            show={visible}
            onHide={() => { handleQtyChange(null) }}
            size="sm"
            aria-labelledby="quantityModal"
            centered
        >
            <div className={styles.modalCont}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleText}>
                        Select Quantity
                    </div>
                    <div>
                        <button onClick={() => {handleQtyChange(null)}} className={styles.closeBtn} type={'button'}>
                            <span className={'fa fa-times'}></span>
                        </button>
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.qtyCont}>
                        {[...Array(10).keys()].map((val) => {
                            return (
                                <QtyItem key={'QUANTITY_KEY_' + val}
                                         isSelected={qty === val + 1}
                                         handleChange={handleChange}
                                         title={val + 1}
                                />
                            );
                        })}
                    </div>
                    <Button onClick={handleDone} variant="outline-secondary" className={csx(styles.doneBtn ,'mt-4')}>Done</Button>
                </div>
            </div>
        </Modal>
    );
};

export default QuantityModal;
