import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ShopContext} from "../../context/ShopContext";

const CheckoutHook = () => {
    const { actionGetAddresses, addresses  } = useContext(ShopContext);
    const [selectedStep, setSelectedStep] = useState(0);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        actionGetAddresses();
    }, []);

    useEffect(() => {
        if (selectedAddress === null) {
            const defaultAddressIndex = addresses.findIndex(e => e.default_address);
            if (defaultAddressIndex >= 0) {
                setSelectedAddress(addresses[defaultAddressIndex]);
            }
        }
    }, [addresses]);

    const handleAddModalClose = useCallback(() => {
        setShowAddressModal(false);
    }, [setShowAddressModal]);

    const handleAddressClick = useCallback((address) => {
        setSelectedAddress(address);
    }, [setSelectedAddress]);

    const handleStepChange = useCallback((step) => {
        setSelectedStep(step);
    }, [setSelectedAddress]);

    return {actionGetAddresses, selectedStep, showAddressModal, handleAddModalClose, handleAddressClick, handleStepChange};
};

export default CheckoutHook;
