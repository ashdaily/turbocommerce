import React, {useCallback, useContext} from 'react';
import { Modal } from 'react-bootstrap';
import AddressForm from "../../pages/Address/AddressForm";
import {ShopContext} from "../../context/ShopContext";

const AddressModal = ({handleClose, show}) => {
    const { actionCreateAddress } = useContext(ShopContext);

    const handleFormSubmit = useCallback((data) => {
        actionCreateAddress(data);
        handleClose();
    }, [handleClose, actionCreateAddress]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Address
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddressForm
                    handleToggle={handleFormSubmit}
                />
            </Modal.Body>
        </Modal>
    )
};

export default AddressModal;
