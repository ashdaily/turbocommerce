import React from 'react';
import styles from './Style.module.scss';
import {Spinner} from "react-bootstrap";

const WaitingComponent = () => {
    return (
        <div className={styles.waitingCont}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
}

export default WaitingComponent;
