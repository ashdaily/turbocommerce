import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './Style.module.scss';
import {ShopContext} from "../../context/ShopContext";
import AddressTile from "./component/AddressTile";
import AddressForm from "./AddressForm";
import WaitingComponent from "../../components/WaitingComponent/WaitingComponent";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const Address = (props) => {
    const { actionGetAddresses, addresses, actionDeleteAddress, actionCreateAddress, is_address_fetching, actionUpdateAddress } = useContext(ShopContext);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedAddId, setSelectedAddId] = useState(null);
    const mountRef = useRef(false);

    useEffect(() => {
        if (!mountRef.current) {
            actionGetAddresses();
            mountRef.current = true;
        }
    }, [actionGetAddresses]);

    const handleNewAddress = useCallback(() => {
        setShowForm((e) => !e);
    }, [setShowForm]);

    const handleFormSubmit = useCallback((data, type) => {
        setShowForm(false);
        if (type === 'UPDATE') {
            actionUpdateAddress(data);
        } else {
            actionCreateAddress(data);
        }
        setEditData(null);
    }, [setShowForm, setEditData, actionUpdateAddress, actionCreateAddress]);


    const handleEditClick = (data) => {
        // setEditData(data);
        // setShowForm(true);
        props.history.push(`/addresses/${data.id}`)
    };

    const handleDone = useCallback(() => {
        if (selectedAddId) {
            actionDeleteAddress(selectedAddId);
        }
        setConfirmVisible(false);
        setSelectedAddId(null);
    }, [setConfirmVisible, setSelectedAddId, selectedAddId, actionDeleteAddress]);

    const handleClose = useCallback(() => {
       setConfirmVisible(false);
       setSelectedAddId(null);
    }, [setConfirmVisible,setSelectedAddId]);

    const handleDelete = useCallback((id) => {
        setConfirmVisible(true);
        setSelectedAddId(id);
    }, [setConfirmVisible, setSelectedAddId]);

    if (showForm) {
        return (
            <AddressForm
                data={editData}
                handleToggle={handleFormSubmit}
            />
        )
    }

    const renderAddressTiles = () => {
        if (is_address_fetching) {
            return (
                <WaitingComponent/>
            )
        } return ( <div className={styles.addressTileCont}>
            {addresses.map((address) => <AddressTile
                key={'ADDREES_TILE_'+address.id}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
                data={address}/>
            )}
        </div>);
    };

    return (
        <div>
            <h1 className={styles.accountOrder}>Saved Addresses</h1>
            {renderAddressTiles()}
            <div className={styles.newAddressCont}>
                <button onClick={handleNewAddress} className={styles.newAddressBtn}>Add New Address</button>
            </div>
            <ConfirmModal
                title={'Are You Sure?'}
                content={'Do you really want to delete the address.'}
                handleDone={handleDone}
                handleClose={handleClose}
                visible={confirmVisible}
                />
        </div>
    );
};

export default Address;
