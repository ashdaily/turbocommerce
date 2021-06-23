import React from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';

const Address = () => {
    return (
        <div className={styles.checkoutShipping}>
            <h2 className={styles.heading}>Enter Your Address</h2>
            <div className={styles.addressForm}>
                <form id="shipping-address-form">
                    <div className={styles.customerInfo}>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Pincode</label>
                            <input id="zip" data-address-field="pincode" type="text" value="" maxLength="6"
                                   className={csx('col-xs-5', styles.valid, styles.area)} name="postalCode" placeholder="Enter 6 digit pincode"
                                   data-required="true" data-invalid="false"
                                   data-required-msg="Please enter your pincode" data-validation="num size-6"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Name</label>
                            <input type="text" maxLength="128" data-address-field="recipientName" value=""
                                   className={csx(styles.inputbox2, 'col-xs-7')} name="name" id="fullName" placeholder="Full Name"
                                   data-required="true" data-required-msg="Please enter your name"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Address</label>
                            <textarea name="address1" data-address-field="addressLine1"
                                      className={csx(styles.inputbox2, 'col-xs-7', 'text-area')} id="address"
                                      placeholder="Flat/House No.          Colony/Street No." data-required="true"
                                      data-required-msg="Please enter your address"
                                      data-validation="address"></textarea>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Locality/Landmark</label>
                            <input maxLength="400" type="text" data-address-field="landmark" value=""
                                   className={csx(styles.inputbox2, 'col-xs-7')} name="address2" id="nearestLandmark"
                                   placeholder="Eg Near Fortis Hospital" data-validation="landmark"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">City</label>
                            <input maxLength="48" type="text" data-address-field="city" value=""
                                   className={csx(styles.inputbox2, 'col-xs-7')} name="city" id="city" placeholder="City"
                                   data-required="true" data-required-msg="Please enter the city name"
                                   data-validation="city"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">State</label>
                            <input maxLength="48" type="text" data-address-field="state" value=""
                                   className={csx(styles.inputbox2, 'col-xs-7')} name="state" id="state" placeholder="State"
                                   data-required="true" data-required-msg="Please enter the state name"
                                   data-validation="state"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Mobile Number</label>
                            <div className={styles.checkboxFlex}>
                                <input type="checkbox" id="walletMobile"/>
                                    <label >Same as registered
                                        mobile</label>
                            </div>
                            <span className={styles.mobilePrepend}>+91</span>
                            <input type="text" data-address-field="recipientMobile" value=""
                                   className="inputbox2 col-xs-6" maxLength="10" name="mobile" id="mobile"
                                   placeholder="10 digit mobile number" data-required="true"
                                   data-required-msg="Please enter your mobile number" data-validation="mob"/>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl">Alternate Mobile Number</label>
                            <span className={styles.mobilePrepend}>+91</span>
                            <input type="text" data-address-field="landLine" value="" className="inputbox2 col-xs-6"
                                   maxLength="10" name="landLine" id="landLine" placeholder="10 digit mobile number"
                                   data-required-msg="Please enter your mobile number" data-validation="altMob"/>
                        </div>

                        <div className="row address-type-checkbox">
                            <label className="col-xs-5 form-lbl">Address Type</label>
                            <div className={csx('col-xs-12', styles.padLt0)}>
                                <div className={csx(styles.sdRadio, 'col-xs-4', styles.padLt0)}>
                                    <input data-required="true" type="radio" id="home-mobile" name="addressTag"
                                           value="Home"/>
                                        <label className="checkbox">
                                            Home
                                        </label>
                                </div>
                                <div className={csx(styles.sdRadio, 'col-xs-4', styles.padLt0)}>
                                    <input data-required="true" type="radio" id="office-mobile" name="addressTag"
                                           value="Office" className="checkbox" />
                                        <label className="checkbox">
                                            Office/Commercial
                                        </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl"></label>
                            <div className={csx(styles.sdCheckbox, 'col-xs-7', styles.padLt0)}>
                                <input type="checkbox" data-address-field="defaultAddress" name="defaultAddress"
                                       value="true" id="location" />
                                    <label className={styles.label200Wide}>
                                        Make this my default address
                                    </label>
                            </div>
                        </div>

                        <div className="row">
                            <label className="col-xs-5 form-lbl"></label>
                            <button className={csx(styles.saveBtn, styles.rippleWhite, 'btn', 'col-xs-7')} type="button">
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
