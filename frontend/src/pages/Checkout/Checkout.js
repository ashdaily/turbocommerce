import React, {useCallback, useContext, useEffect, useState} from 'react';
import Stepper from "../../components/Stepper/Stepper";
import styles from "./Style.module.scss";
import AddressTile from "../Address/component/AddressTile";
import {ShopContext} from "../../context/ShopContext";
import AddressModal from "../../components/AddressModal/AddressModal";

const stepper = [
    {title: 'Addresses'},
    {title: 'Pay'},
];

const Checkout = () => {
    const { actionGetAddresses, addresses  } = useContext(ShopContext);
    const [selectedStep, setSelectedStep] = useState(0);
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        actionGetAddresses();
    }, []);

    const handleAddModalClose = useCallback(() => {
        setShowAddressModal(false);
    }, [setShowAddressModal]);


  return (
    <div className={styles.mainCont}>
        <Stepper selected={selectedStep} steps={stepper}/>
        <div className={styles.addressTileCont}>
            {addresses.map((address) => <AddressTile
                isEdit={false}
                key={'ADDREES_TILE_'+address.id}
                data={address}/>
            )}
        </div>
        {(addresses.length == 0 || true) && (<div className={styles.newAddressCont}>
            <button onClick={() => {setShowAddressModal(true)}} className={styles.newAddressBtn}>Add New Address</button>
        </div>)}
        {addresses.length > 0 && (<div className={styles.newAddressCont}>
            <button onClick={() => {}} className={styles.newAddressBtn}>Proceed To Pay</button>
        </div>)}
        <AddressModal show={showAddressModal} handleClose={handleAddModalClose} />
    </div>
  );
};

export default Checkout;
