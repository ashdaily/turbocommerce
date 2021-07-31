import React, { Component } from 'react';
import { Button, IconButton, Paper } from '@material-ui/core';
import { Add, InputRounded as EditIcon } from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import styles from './style.module.css';
import Constants from '../../config/constants';
import DataTables from '../../components/Datatable.table';
import FilterInput from '../../components/Filter/FilterInput';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
];

const ProductList = () => {
  const tableStructure = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, all) => <div>{all.name}</div>
    },
    {
      key: 'calories',
      label: 'calories',
      sortable: true,
      render: (temp, all) => <div>{all.calories}</div>
    },
    {
      key: 'user_id',
      label: 'Action',
      render: (temp, all) => (
        <div>
          <IconButton className="tableActionBtn" onClick={() => {}}>
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
      )
    }
  ];
  const datatableFunctions = {
    onCellClick: () => {},
    // onCellDoubleClick: this.handleCellDoubleClick,
    // onFilterValueChange: this._handleSearchValueChange.bind(this),
    onSortOrderChange: () => {},
    onPageChange: () => {},
    onRowSelection: () => {},
    onRowSizeChange: () => {}
  };
  const datatable = {
    ...Constants.DATATABLE_PROPERTIES,
    columns: tableStructure,
    data: rows,
    count: rows.length,
    page: 0
  };
  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <span className={styles.title}>Products List</span>
          <Button onClick={() => {}} variant="contained" color="primary">
            <Add /> Create
          </Button>
        </div>
        <div>
          <br />
          <FilterInput />
          <DataTables {...datatable} {...datatableFunctions} />
        </div>
      </PageBox>
    </div>
  );
};

export default ProductList;
