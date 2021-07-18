import React, {useCallback, useState} from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';
import FormText from "../../components/FormText/FormText";
import ToastUtils from "../../util/ToastUtils";
import {serviceChangePassword} from "../../services/AppSettings.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import {logout} from "../../util/Auth";

const requiredFields = ['password'];

const initialData = {
    password: ''
};

const ChangePassword = () => {
    const [formData, setFormData] = useState(initialData);
    const [errorData, setErrors] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);

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

    const handleDone = useCallback(() => {
        serviceChangePassword({ new_password: formData.password }).then((res) => {
            if(!res.error) {
                ToastUtils.showInfo('Password Changed Successfully');
                setFormData({password: ''});
            } else {
                ToastUtils.showErrors('Enter a strong password');
            }
            setShowConfirm(false);
            logout();
            window.location.reload();
        });
    }, [setShowConfirm, checkFormValidation, setFormData, formData]);

    const handleClose = useCallback(() => {
        setShowConfirm(false);
    }, [setShowConfirm]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const errors = checkFormValidation();
        if (Object.keys(errors).length === 0) {
            setShowConfirm(true);
        } else {
            setErrors(errors);
        }
    }, [setErrors, checkFormValidation, handleDone, setShowConfirm]);

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
                                type={'password'}
                                placeholder="Enter New Password"
                            />
                        </div>

                        <div className={csx(styles.formCont)}>
                            <label className="col-xs-5 d-none d-sm-block form-lbl"></label>
                            <button className={csx(styles.saveBtn, styles.rippleWhite, 'btn')}
                                    type="submit">
                                <span>Change Password</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ConfirmModal
                title={'Are You Sure?'}
                content={'Your password will change and you will be logged out.'}
                handleDone={handleDone}
                handleClose={handleClose}
                visible={showConfirm}
            />
        </div>
    )
};

export default ChangePassword;
