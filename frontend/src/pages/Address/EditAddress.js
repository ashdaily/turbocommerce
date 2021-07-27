import React, {useContext, useEffect, useState} from 'react';
import styles from './Style.module.scss';
import {serviceGetAddressDetail} from "../../services/Address.service";
import AddressForm from "./AddressForm";
import {useParams} from "react-router-dom";
import WaitingComponent from "../../components/WaitingComponent/WaitingComponent";
import {ShopContext} from "../../context/ShopContext";

const EditAddress = (props) => {
    const { actionUpdateAddress } = useContext(ShopContext);
    const [data, setEditData] = useState(null);
    const [isFetching, setFetching] = useState(true);
    const { id } = useParams();

    useEffect(() => {
       serviceGetAddressDetail(id).then((res) => {
           if (!res.error) {
               setEditData(res.data);
               setFetching(false);
           } else {
               props.history.push('/addresses');
           }
       })
    },[id, props.history]);

    const handleFormSubmit = (data) => {
        actionUpdateAddress(data);
        props.history.push('/addresses');
    };

    const renderForm = () => {
        if (isFetching) {
            return ( <WaitingComponent/>);
        }
        return (
            <AddressForm
                data={data}
                handleToggle={handleFormSubmit}
            />
        );
    };

    return (
        <div>
            <h1 className={styles.accountOrder}>Edit Address</h1>
            {renderForm()}
        </div>
    )
};

export default EditAddress;
