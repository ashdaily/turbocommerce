import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import styles from './Style.module.scss';
import csx from 'classnames';

const ConfirmModal = ({visible, title, content, handleClose, handleDone}) => {

    return (
        <Modal
            show={visible}
            onHide={handleClose}
            size="sm"
            aria-labelledby="quantityModal"
            centered
        >
            <div className={styles.modalCont}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleText}>
                        {title}
                    </div>
                    <div>
                        <button onClick={handleClose} className={styles.closeBtn} type={'button'}>
                            <span className={'fa fa-times'}></span>
                        </button>
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <p>{content}</p>
                    <Button onClick={handleDone} variant="outline-secondary" className={csx(styles.doneBtn ,'mt-4')}>Confirm</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
