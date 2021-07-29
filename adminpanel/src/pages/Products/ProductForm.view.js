import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import PageBox from '../../components/PageBox/PageBox.component';
import styles from './style.module.css';
import { CustomSelectField, CustomTextField } from '../../components/FormComponents';

const ProductForm = () => (
  <PageBox>
    <div className={styles.headerContainer}>
      <span className={styles.title}>New Product</span>
    </div>
    <div className="formControl">
      <div className="formGroup">
        <CustomSelectField label="Category">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </CustomSelectField>
      </div>
      <div className="formGroup">
        <CustomSelectField label="SubCateogry">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </CustomSelectField>
      </div>
    </div>
    <div className="formControl">
      <div className="formGroup">
        <CustomTextField label="Name" isError={false} />
      </div>
      <div className="formGroup">
        <CustomTextField label="Slug" isError={false} />
      </div>
      <div className="formGroup">
        <CustomTextField label="Origin" isError={false} />
      </div>
    </div>
    <div className="formControl">
      <div className="formGroup">
        <CustomTextField label="Description" multiline rows={5} isError={false} />
      </div>
    </div>
  </PageBox>
);

export default ProductForm;
