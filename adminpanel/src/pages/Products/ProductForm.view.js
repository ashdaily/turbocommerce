import React from 'react';
import { TextField } from '@material-ui/core';
import PageBox from '../../components/PageBox/PageBox.component';
import styles from './style.module.css';

const ProductForm = () => (
  <PageBox>
    <div className={styles.headerContainer}>
      <span className={styles.title}>New Product</span>
    </div>
    <div>
      <TextField size="small" error={false} helperText="Enter" label="Name" variant="outlined" />
    </div>
  </PageBox>
);

export default ProductForm;
