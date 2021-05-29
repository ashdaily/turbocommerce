import React, {useState} from 'react';
import csx from "classnames";
import styles from "./Styles.module.scss";
import {Link} from "react-router-dom";

const CategoryListItem = ({category,}) => {
    const [show, setShow] = useState(false);
    const mouseEnter = () => {
        setShow(true);
        document.body.classList.add("navExpanded");
    };

    const mouseLeave = () => {
        setShow(false);
        document.body.classList.remove("navExpanded");
    }

    return (
        <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={csx((show ? styles.outsideExpanded : ''))}>
            <Link
                className={styles.tier1title}
                to={`/${category.slug}`}>
                {category.category_name}
            </Link>
            <div className={styles.tier2}>
                <ul className={'m-0 p-0'}>
                    {category.product_parent_categories.map((parentCategory, i) => (
                        <>
                            <li className={csx(styles.active, styles.tier2Link)}>
                                <Link
                                    to={`/${category.slug}/${parentCategory.slug}`}
                                    className={styles.tierTitle}
                                    >
                                    {parentCategory.category_name}
                                </Link>
                            </li>
                            {parentCategory.product_child_categories.map(
                                (childCategory, index) => (
                                    <li className={styles.categoryNameLi}>
                                        <Link to={`/${category.slug}/${parentCategory.slug}/${childCategory.slug}`}
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
