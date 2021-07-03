import React, {useCallback, useState} from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';
import FormText from "../../components/FormText/FormText";
import ToastUtils from "../../util/ToastUtils";
import {serviceChangePassword} from "../../services/AppSettings.service";

const requiredFields = ['password'];

const initialData = {
    password: ''
};

const ChangePassword = () => {
    const [formData, setFormData] = useState(initialData);
    const [errorData, setErrors] = useState({});


    const handleChange = useCallback((e) => {
        const data = JSON.parse(JSON.stringify(formData));
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        data[fieldName] = fieldValue;
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
        if (Object.keys(errors).length === 0) {
            serviceChangePassword({ new_password: formData.password }).then((res) => {
                if(!res.error) {
                    ToastUtils.showInfo('Password Changed Successfully');
                    setFormData({password: ''})
                } else {
                    ToastUtils.showInfo('Enter a strong password');
                }
            })

        } else {
            setErrors(errors);
        }
    }, [setErrors, checkFormValidation, setFormData, formData]);

    return (
        <div className={csx(styles.checkoutShipping, 'container')}>
            <h1 className={styles.heading}>Change Password</h1>
            <div className={styles.addressForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.customerInfo}>
                        <div className={csx(styles.formCont)}>
                            <FormText
                                value={formData.password}
                                onChange={handleChange}
                                isError={errorData.password}
                                name={'password'}
                                label={'New Password'}
                                placeholder="Enter New Password"
                            />
                        </div>

                        <div className={csx(styles.formCont)}>
                            <label className="col-xs-5 form-lbl"></label>
                            <button className={csx(styles.saveBtn, styles.rippleWhite, 'btn', 'col-xs-7')}
                                    type="submit">
                                <span>Change Password</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ChangePassword;
