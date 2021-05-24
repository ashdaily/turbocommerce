import React, {useState} from 'react';
import csx from "classnames";
import styles from "./Styles.module.scss";
import {Link} from "react-router-dom";

const CategoryListItem = ({ category, }) => {
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
        <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={csx( (show ? styles.outsideExpanded : ''))}>
            <a className={styles.tier1title}
               aria-haspopup="true"
               aria-expanded="false">{category.category_name}</a>
            <div className={styles.tier2}>
                <ul className={'m-0 p-0'}>
                    {category.product_parent_categories.map((parentCategory, i) => (
                        <>
                            <li className={styles.active}>
                                <div className={styles.tierTitle} >{parentCategory.category_name}</div>
                            </li>
                            {parentCategory.product_child_categories.map(
                                (childCategory, index) => (
                                    <li className={styles.categoryNameLi}>
                                        <Link to={`/${category.slug}/${parentCategory.slug}/${childCategory.slug}`}  key={index}>
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
