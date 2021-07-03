import React, {useContext} from 'react';
import {ShopContext} from "../../context/ShopContext";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from './Style.module.scss';
import csx from 'classnames';
import EventEmitter from "../../util/EventsUtils";

const Topbar = () => {
    const { storeInfo, totalCartItems } = useContext(ShopContext);

    const handleBarClick = () => {
        EventEmitter.dispatch(EventEmitter.TOGGLE_SIDEBAR, {});
    };

    return (
        <div className={styles.topbarCont}>
            <div className={styles.sidebarBtn}>
                <button className={styles.hamBtn} onClick={handleBarClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <Link to="/" className={csx('anchor-silent', styles.logoCont)}>
                <Image
                    src={storeInfo.logo}
                    roundedCircle
                    alt={storeInfo.title_tag}
                    className="mx-auto d-block"
                />
            </Link>
            <div className={styles.cartCont}>
                <Link id={'cartLink'} to="/cart" className={'anchor-silent'}>
                    <i className="fas fa-cart-arrow-down"></i> Cart ({totalCartItems})
                </Link>
            </div>
        </div>
    )
};

export default Topbar;
