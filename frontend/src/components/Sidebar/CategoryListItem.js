import React, {useState} from 'react';
import csx from "classnames";
import styles from "./Styles.module.scss";
import {Link} from "react-router-dom";
import useWindowDimensions from "../../util/WindowDimensions";
import {checkIfMobile} from '../../util/Helpers';
import EventEmitter from "../../util/EventsUtils";

const CategoryListItem = ({category,}) => {
    const [show, setShow] = useState(false);
    const {width} = useWindowDimensions();

    const mouseEnter = () => {
        setShow(true);
        !checkIfMobile(width) && document.body.classList.add("navExpanded");
    };

    const mouseLeave = () => {
        setShow(false);
        !checkIfMobile(width) && document.body.classList.remove("navExpanded");
    };

    const handleLinkClick = () => {
        EventEmitter.dispatch(EventEmitter.TOGGLE_SIDEBAR, { close: true });
    };

    const renderParentLink = () => {
        if (checkIfMobile(width)) {
            return (
                <a className={styles.tier1title}>
                    {category.category_name}
                </a>
            )
        } else {
            return (
                <Link
                    className={styles.tier1title}
                    to={`/${category.slug}`}>
                    {category.category_name}
                </Link>
            );
        }
    }

    return (
        <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={csx((show ? styles.outsideExpanded : ''))}>
            {renderParentLink()}
            <div className={styles.tier2}>
                <ul className={'m-0 p-0'}>
                    {category.product_parent_categories.map((parentCategory, i) => (
                        <>
                            <li className={csx(styles.active, styles.tier2Link)}>
                                <Link
                                    to={`/${category.slug}/${parentCategory.slug}`}
                                    onClick={handleLinkClick}
                                    className={styles.tierTitle}
                                >
                                    {parentCategory.category_name}
                                </Link>
                            </li>
                            {parentCategory.product_child_categories.map(
                                (childCategory, index) => (
                                    <li className={styles.categoryNameLi}>
                                        <Link to={`/${category.slug}/${parentCategory.slug}/${childCategory.slug}`}
                                              onClick={handleLinkClick}
                                              key={index}>
                                            {childCategory.category_name}
                                        </Link>
                                    </li>
                                )
                            )}
                        </>
                    ))}
                </ul>
            </div>
        </li>
    )
};

export default CategoryListItem;
