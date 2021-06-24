import React, {useCallback, useState} from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';

const initialData = {
    postal_code: '',
    country: '',
    address: '',
    landmark: '',
    city: '',
    province: '',
    primary_phone_number: '',
    alternate_phone_number: '',
};

const Address = () => {

    const [formData, setFormData] = useState(initialData);

    const handleChange = useCallback((e) => {
        const data = JSON.parse(JSON.stringify(formData));
        data[e.target.name] = e.target.value;
        setFormData(data);
    }, [formData]);

    return (
        <div className={styles.checkoutShipping}>
            <h2 className={styles.heading}>Enter Your Address</h2>
            <div className={styles.addressForm}>
                <form id="shipping-address-form">
                    <div className={styles.customerInfo}>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Pincode</label>
                            <input type="text"
                                   value={formData.postal_code}
                                   maxLength="6"
                                   onChange={handleChange}
                                   className={csx('col-xs-5', styles.valid, styles.area)} name="postal_code"
                                   placeholder="Enter 6 digit pincode"
                                   data-required="true" data-invalid="false"
                                   data-required-msg="Please enter your pincode"
                                   data-validation="num size-6"
                            />
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Name</label>
                            <input type="text"
                                   maxLength="128"
                                   data-address-field="country"
                                   value={formData.country}
                                   onChange={handleChange}
                                   className={csx(styles.inputbox2, 'col-xs-7')}
                                   name="country"
                                   placeholder="Country"
                                   data-required="true"
                                   data-required-msg="Please enter country name"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Address</label>
                            <textarea
                                name="address"
                                data-address-field="address"
                                onChange={handleChange}
                                value={formData.address}
                                className={csx(styles.inputbox2, 'col-xs-7', 'text-area')}
                                placeholder="Flat/House No. Colony/Street No."
                                data-required="true"
                                data-required-msg="Please enter your address"
                                data-validation="address"></textarea>
                        </div>


                        <div className="row">
                            <label className="col-xs-5 form-lbl">City</label>
                            <input
                                maxLength="48"
                                type="text"
                                data-address-field="city"
                                value={formData.city}
                                className={csx(styles.inputbox2, 'col-xs-7')}
                                name="city"
                                onChange={handleChange}
                                placeholder="City"
                                data-required="true"
                                data-required-msg="Please enter the city name"
                                data-validation="city"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Province</label>
                            <input
                                maxLength="48"
                                type="text"
                                data-address-field="province"
                                value={formData.province}
                                onChange={handleChange}
                                className={csx(styles.inputbox2, 'col-xs-7')}
                                name="province"
                                placeholder="Province"
                                data-required="true"
                                data-required-msg="Please enter the state name"
                                data-validation="state"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Mobile Number</label>
                            <div className={styles.checkboxFlex}>
                                <input type="checkbox" id="walletMobile"/>
                                <label>Same as registered mobile</label>
                            </div>
                            <span className={styles.mobilePrepend}>+91</span>
                            <input
                                type="text"
                                data-address-field="recipientMobile"
                                value={formData.primary_phone_number}
                                onChange={handleChange}
                                className={csx(styles.inputbox2, 'col-xs-6')}
                                maxLength="10"
                                name="primary_phone_number"
                                placeholder="10 digit mobile number"
                                data-required="true"
                                data-required-msg="Please enter your mobile number"
                                data-validation="mob"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Alternate Mobile Number</label>
                            <span className={styles.mobilePrepend}>+91</span>
                            <input
                                type="text"
                                data-address-field="landLine"
                                value={formData.alternate_phone_number}
                                onChange={handleChange}
                                className={csx(styles.inputbox2, 'col-xs-6')}
                                maxLength="10"
                                name="alternate_phone_number"
                                placeholder="10 digit mobile number"
                                data-required-msg="Please enter your mobile number"
                                data-validation="altMob"/>
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

                        <div className="row">
                            <label className="col-xs-5 form-lbl"></label>
                            <div className={csx(styles.sdCheckbox, 'col-xs-7', styles.padLt0)}>
                                <input type="checkbox" name="defaultAddress"
                                       value="true"/>
                                <label className={styles.label200Wide}>
                                    Make this my default address
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl"></label>
                            <button className={csx(styles.saveBtn, styles.rippleWhite, 'btn', 'col-xs-7')}
                                    type="button">
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
