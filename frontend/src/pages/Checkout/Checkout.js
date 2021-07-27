import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
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
    const [selectedStep] = useState(0);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const mountRef = useRef(false);

    useEffect(() => {
        if (!mountRef.current) {
            actionGetAddresses();
            mountRef.current = true;
        }
    }, [actionGetAddresses]);

    useEffect(() => {
        if (selectedAddress === null) {
            const defaultAddressIndex = addresses.findIndex(e => e.default_address);
            if (defaultAddressIndex >= 0) {
                setSelectedAddress(addresses[defaultAddressIndex]);
            }
        }
    }, [addresses, selectedAddress]);

    const handleAddModalClose = useCallback(() => {
        setShowAddressModal(false);
    }, [setShowAddressModal]);

    const handleAddressClick = useCallback((address) => {
        setSelectedAddress(address);
    }, [setSelectedAddress]);

    // const handleStepChange = useCallback((step) => {
    //     setSelectedStep(step);
    // }, [setSelectedAddress]);

  return (
    <div className={styles.mainCont}>
        <Stepper selected={selectedStep} steps={stepper}/>
        <div className={styles.addressTileCont}>
            {addresses.map((address) => <AddressTile
                isSelected={selectedAddress ? selectedAddress.id === address.id : false}
                onClick={() => { handleAddressClick(address) }}
                isEdit={false}
                key={'ADDREES_TILE_'+address.id}
                data={address}/>
            )}
        </div>
        {(addresses.length === 0) && (<div className={styles.newAddressCont}>
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
