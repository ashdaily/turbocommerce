import React, {useCallback, useContext, useEffect, useState} from 'react';
import styles from './Style.module.scss';
import {ShopContext} from "../../context/ShopContext";
import AddressTile from "./component/AddressTile";
import AddressForm from "./AddressForm";

const Address = () => {
    const { actionGetAddresses, addresses, actionDeleteAddress, actionCreateAddress } = useContext(ShopContext);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        actionGetAddresses();
    }, []);

    const handleNewAddress = useCallback(() => {
        setShowForm((e) => !e);
    }, [setShowForm]);

    const handleFormSubmit = useCallback((data) => {
        setShowForm(false);
        actionCreateAddress(data);
    }, [setShowForm]);

    const handleEditClick = useCallback(() => {
        setEditData(null);
    }, [setEditData]);


    if (showForm) {
        return (
            <AddressForm
                data={editData}
                handleToggle={handleFormSubmit}
            />
        )
    }

    return (
        <div>
            <h1 className={styles.accountOrder}>Saved Addresses</h1>
            <div className={styles.addressTileCont}>
                {addresses.map((address) => <AddressTile
                    key={'ADDREES_TILE_'+address.id}
                    handleClick={handleEditClick}
                    handleDelete={actionDeleteAddress}
                    data={address}/>
                    )}
            </div>
            <div className={styles.newAddressCont}>
                <button onClick={handleNewAddress} className={styles.newAddressBtn}>Add New Address</button>
            </div>
        </div>
    );
};

export default Address;
