import React from 'react';
import PageBox from '../../components/PageBox/PageBox.component';
import { CustomTextField } from '../../components/FormComponents';
import styles from './style.module.css'
const ProductForm = () => (
  <PageBox>
    <div className={styles.headerContainer}>
      <span className={styles.title}>Store Information</span>
    </div>
    <div className="formControl">
      <div className="formGroup">
        <CustomTextField label="Name" isError={false} />
      </div>
      <div className="formGroup">
        <CustomTextField label="description" isError={false} />
      </div>
      <div className="formGroup">
        <CustomTextField type={'file'} label="image" isError={false} />
      </div>
    </div>
  </PageBox>
);

export default ProductForm;
