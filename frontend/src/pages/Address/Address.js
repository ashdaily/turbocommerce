import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';
import FormText from "./component/FormText";
import {serviceCreateAddress, serviceGetAddress} from "../../services/Address.service";

const requiredFields = ['postal_code', 'country', 'address', 'city', 'province', 'primary_phone_number'];

const initialData = {
    postal_code: '',
    country: '',
    address: '',
    city: '',
    province: '',
    primary_phone_number: '',
    alternate_phone_number: '',
    default_address: false,
    country_code_primary_phone_number: '+91',
    country_code_alternate_phone_number: '+91',
    address_type: 'HOME'
};

const Address = () => {
    const [formData, setFormData] = useState(initialData);
    const [errorData, setErrors] = useState({});

    useEffect(() => {
        serviceGetAddress();
    });

    const handleChange = useCallback((e) => {
        const data = JSON.parse(JSON.stringify(formData));
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        if (fieldName === 'default_address') {
            data[fieldName] = !data[fieldName];
        } else {
            data[fieldName] = fieldValue;
        }
        setFormData(data);

        const errors = JSON.parse(JSON.stringify(errorData));
        errors[e.target.name] = false;
        setErrors(errors);
    }, [formData, setErrors, errorData, setFormData]);

    const checkFormValidation = useCallback(() => {
        const errors = {};
        requiredFields.forEach(field => {
            if (!formData[field]) {
                errors[field] = 'Required'
            }
        });
        return errors;
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const errors = checkFormValidation();
        console.log('errors', errors);
        if (Object.keys(errors).length === 0) {
            serviceCreateAddress({
                ...formData,
            })
        } else {
            setErrors(errors);
        }
    }, [setErrors, checkFormValidation,formData]);

    return (
        <div className={styles.checkoutShipping}>
            <h2 className={styles.heading}>Enter Your Address</h2>
            <div className={styles.addressForm}>
                <form onSubmit={handleSubmit} id="shipping-address-form">
                    <div className={styles.customerInfo}>

                        <div className={csx(styles.formCont, 'row')}>
                            <FormText
                                value={formData.postal_code}
                                onChange={handleChange}
                                isError={errorData.postal_code}
                                name={'postal_code'}
                                label={'Pincode'}
                                placeholder="Enter 6 digit pincode"
                            />
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <FormText
                                value={formData.country}
                                onChange={handleChange}
                                isError={errorData.country}
                                name={'country'}
                                label={'Country'}
                                placeholder="Country"
                            />
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <FormText
                                value={formData.address}
                                onChange={handleChange}
                                isError={errorData.address}
                                name={'address'}
                                label={'Address'}
                                multiline
                                rows={3}
                                placeholder="Flat/House No. Colony/Street No."
                            />
                        </div>


                        <div className={csx(styles.formCont, 'row')}>
                            <FormText
                                value={formData.city}
                                onChange={handleChange}
                                isError={errorData.city}
                                name={'city'}
                                label={'City'}
                                placeholder="City"
                            />
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <FormText
                                value={formData.province}
                                onChange={handleChange}
                                isError={errorData.province}
                                name={'province'}
                                label={'Province'}
                                placeholder="Province"
                            />
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <label className="col-xs-5 form-lbl">Mobile Number</label>
                            <div className={styles.checkboxFlex}>
                                <input type="checkbox" id="walletMobile"/>
                                <label>Same as registered mobile</label>
                            </div>
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <label className="col-xs-5 form-lbl"></label>
                            <span className={styles.mobilePrepend}>+91</span>
                            <FormText
                                value={formData.primary_phone_number}
                                onChange={handleChange}
                                isError={errorData.primary_phone_number}
                                name={'primary_phone_number'}
                                placeholder="10 digit mobile number"
                            />
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <label className="col-xs-5 form-lbl">Alternate Mobile Number</label>
                            <span className={styles.mobilePrepend}>+91</span>
                            <FormText
                                value={formData.alternate_phone_number}
                                onChange={handleChange}
                                isError={errorData.alternate_phone_number}
                                name={'alternate_phone_number'}
                                placeholder="10 digit mobile number"
                            />
                        </div>

                        <div className="row address-type-checkbox">
                            <label className="col-xs-5 form-lbl">Address Type</label>
                            <div className={csx('col-xs-12', styles.padLt0)}>
                                <div className={csx(styles.sdRadio, 'col-xs-4', styles.padLt0)}>
                                    <input data-required="true" type="radio" id="home-mobile" name="addressTag"
                                           value="Home"/>
                                    <label className={styles.checkbox}>
                                        Home
                                    </label>
                                </div>
                                <div className={csx(styles.sdRadio, 'col-xs-4', styles.padLt0)}>
                                    <input data-required="true" type="radio" id="office-mobile" name="addressTag"
                                           value="Office" className={styles.checkbox}/>
                                    <label className={styles.checkbox}>
                                        Office/Commercial
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <label className="col-xs-5 form-lbl"></label>
                            <div className={csx(styles.sdCheckbox, 'col-xs-7', styles.padLt0)}>
                                <input type="checkbox" name="default_address" value={formData.default_address}/>
                                <label className={styles.label200Wide}>
                                    Make this my default address
                                </label>
                            </div>
                        </div>

                        <div className={csx(styles.formCont, 'row')}>
                            <label className="col-xs-5 form-lbl"></label>
                            <button className={csx(styles.saveBtn, styles.rippleWhite, 'btn', 'col-xs-7')}
                                    type="submit">
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Address;
