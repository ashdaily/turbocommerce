import React from 'react';
import styles from '../Style.module.scss';
import csx from 'classnames';

const AddressTile = ({data, handleDelete, onClick, handleEditClick, isEdit, isSelected}) => {
    return (
        <div
            onClick={(e) => { e.preventDefault(); onClick && onClick() }}
            className={csx(styles.addressTile, (isSelected ? styles.addressTileSelected : {}))}>
            <div className={csx(styles.location, (data.default_address ? styles.default : ''))}>
                <span>{data.address_type}</span>
                {data.default_address && (<><span className={styles.defaultMention}>- Default</span>
                        <span className={styles.defaultAddArrow}></span>
                    </>
                )}
            </div>
            <div className={styles.addressCont}>
                <span>{data.address}</span>
                <br/>
                <span>{data.city}</span> - <span>{data.postal_code}</span>
                <br/>
                <span>{data.province}</span>
                <br/>
                <span className={styles.countrySpan}>{data.country}</span>

            </div>
            <div className={styles.contactCont}>
                Phone: <span data-name="mobile">{data.primary_phone_number}</span>
            </div>
            {data.alternate_phone_number && (<div className={styles.contactCont}>
                Alternative: <span data-name="mobile">{data.alternate_phone_number}</span>
            </div>)}
            {isEdit && (<div className={styles.controls}>
                <ul>
                    <li>
                        <button onClick={() => {handleDelete(data.id)}} className={styles.deleteAddress}>
                            <span className="fa fa-trash"></span> Delete
                        </button>
                    </li>
                    <li>
                        <button onClick={() => {handleEditClick(data)}}>
                            <span className="fa fa-edit"></span> Edit
                        </button>
                    </li>
                </ul>
            </div>)}
        </div>
    );
};

AddressTile.defaultProps = {
    isEdit: true,
    isSelected: false
};

export default AddressTile;
