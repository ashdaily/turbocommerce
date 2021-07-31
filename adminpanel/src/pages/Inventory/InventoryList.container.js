import React, {Component} from 'react';
import {Button, Paper,Checkbox, Select, MenuItem, FormControl, InputLabel, ButtonBase} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
// import CreateProvider from './Create.container';
import styles from './Style.module.css';
import {BookmarkBorder, Bookmark, Check, Close,} from '@material-ui/icons';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {
    actionFetchInventory,
    actionChangePageInventoryRequests,
    actionChangeStatusInventoryRequests,
    actionFilterInventoryRequests,
    actionResetFilterInventoryRequests,
    actionSetPageInventoryRequests,
    actionCreateInventory,
    actionUpdateInventory,
    actionDeleteInventory, actionChangeStoreInventory
} from '../../actions/Inventory.action';
import {serviceGetListData} from "../../services/index.services";
import {serviceGetCustomList} from "../../services/Common.service";
import BottomPanel from '../../components/BottomPanel/BottomPanel.component';
import BottomAction from './BottomActions/BottomAction.component';

let CreateProvider = null;

class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            point_selected: null,
            data: [],
            page: 1,
            total: Constants.DEFAULT_PAGE_VALUE + 1,
            side_panel: false,
            edit_data: null,
            categories: [],
            units: [],
            is_calling: true,
            selected: [],
            allSelected: false,
            stores: [],
            storeId: null,
        };
        this.configFilter = [
            {label: 'Category', name: 'category', type: 'text'},
            {label: 'Created On', name: 'createdAt', type: 'date'},
            {label: 'Status', name: 'status', type: 'select', fields: ['PENDING', 'ACTIVE']},
            {label: 'Brand', name: 'productObj.brand_id', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
            {label: 'Category', name: 'productObj.category_ids', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
            {label: 'Unit', name: 'productObj.unit_id', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleCheckbox = this._handleCheckbox.bind(this);
        this._handleSelectAll = this._handleSelectAll.bind(this);
        this._handleBatchSelection = this._handleBatchSelection.bind(this);
        this._handleStoreChange = this._handleStoreChange.bind(this);
    }

    componentDidMount() {
        const request = serviceGetCustomList(['CATEGORY', 'UNIT', 'BRANDS', 'STORES']);

        request.then((data) => {
            if (!data.error) {
                this.setState({
                    is_calling: false,
                    units: data.data.units,
                    categories: data.data.categories,
                    stores: data.data.stores,
                });
                this.configFilter[3].fields = data.data.brands;
                this.configFilter[4].fields = data.data.categories;
                this.configFilter[5].fields = data.data.units;
            } else {
                this.setState({
                    is_calling: false,
                })
            }
        })
        // if (this.props.total_count <= 0) {

        // }
    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            this.props.actionCreateInventory(data)
        } else {
            this.props.actionUpdateInventory(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleStoreChange(e) {
        const storeId = e.target.value;
        this.setState({
            storeId: storeId
        });
        this.props.actionChangeStoreInventory(storeId);
        this.props.actionFetchData();

    }

    _queryFilter(key, value) {
        console.log('_queryFilter', key, value);
        this.props.actionSetPage(1);
        this.props.actionFetchData(1, this.props.sorting_data, {
            query: key == 'SEARCH_TEXT' ? value : this.props.query,
            query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
        });
    }

    _handleFilterDataChange(value) {
        console.log('_handleFilterDataChange', value);
        this._queryFilter('FILTER_DATA', value);
    }

    _handleSearchValueChange(value) {
        console.log('_handleSearchValueChange', value);
        this._queryFilter('SEARCH_TEXT', value);
    }

    handlePreviousPageClick() {
        console.log('handlePreviousPageClick', 'PREV');
    }

    handleNextPageClick() {
        console.log('handleNextPageClick', 'NEXT');
    }

    _handleSortOrderChange(row, order) {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
        this.props.actionSetPage(1);
        this.props.actionFetchData(1,
            {row, order}, {
                query: this.props.query,
                query_data: this.props.query_data,
            });
        // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
    }

    _handleRowSize(page) {
        console.log(page);
    }



    renderFirstCell(user) {
        return (
            <div className={styles.firstCellFlex}>

                <div className={styles.driverImgCont} style={{ borderColor: (user.is_featured ? '#16b716': 'white') }}>
                    <img src={user.product_image} alt=""/>
                </div>
                <div className={classNames(styles.firstCellInfo, 'openSans')}>
                    <span className={styles.productName}><strong>{`${user.product_name}`}</strong></span> <br/>
                    <span className={styles.productCat}><strong>{user.unit_name}</strong></span>
                </div>
            </div>
        );
    }

    _handleCheckbox(id) {
        const tempSelected = this.state.selected;
        const tempIndex = tempSelected.indexOf(id);
        if (tempIndex >= 0) {
            tempSelected.splice(tempIndex, 1);
        } else {
            tempSelected.push(id);
        }
        this.setState({
            selected: tempSelected,
            allSelected: false,
        });
    }

    _handleSelectAll() {
        const {data} = this.props;
        const {allSelected} = this.state;
        if (allSelected) {
            this.setState({
                selected: [],
                allSelected: false
            });
        } else {
            const temp = [];
            data.forEach((val) => {
                    temp.push(val.id);
            });
            this.setState({
                selected: temp,
                allSelected: true
            });
        }
    }


    _handleDelete(id) {
        this.props.actionDeleteInventory(id);
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleEdit(data) {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: data,
        })
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _renderCreateForm() {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./Inventory.view').default;
        }
        if (this.state.side_panel) {
            return (<CreateProvider
                handleDataSave={this._handleDataSave}
                categories={this.state.categories}
                units={this.state.units}
                data={this.state.edit_data}
                handleDelete={this._handleDelete}></CreateProvider>);
        }
        return null;
    }

    renderPrice(all){
        return(
            <div>
                <strong>MRP</strong> -{Constants.CURRENCY} {all.mrp}
                <br/>
                <strong>Offer Price</strong> -{Constants.CURRENCY} {all.price}
            </div>
        )
    }

    _handleBatchSelection(fData) {
        const { selected } = this.state;
        const { data } = this.props;
        const selectedData = [];
        data.forEach((val) => {
            if (selected.indexOf(val.id) >= 0) {
                selectedData.push({
                    variant_id: val.id,
                    unit_id: val.unit_id,
                    product_id: val.product_id,
                    stock: fData.quantity,
                });
            }
        });
        const formData = { ...fData, selection: selectedData, store_id: this.state.storeId };
        console.log(formData);
        this.props.actionUpdateInventory(formData);
        this.setState({
            selected: [],
            allSelected: false,
        });
    }

    _renderMenu() {
        const {stores} = this.state;
        return stores.map((val) => {
            return (<MenuItem value={val.id}>{val.name}</MenuItem>);
        })
    }


    _renderOrderId(data) {
        return (
            <div className={styles.flex}>
                <Checkbox
                    onChange={this._handleCheckbox.bind(this, data.id)}
                    checked={this.state.selected.indexOf(data.id) >= 0}
                    value="secondary"
                    color="primary"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                {this.renderFirstCell(data)}
            </div>
        )
    }

    render() {
        const tableStructure = [
            {
                key: 'name',
                label: 'Info',
                sortable: true,
                style: { width: '20%'},
                render: (temp, all) => <div>{this._renderOrderId(all)}</div>,
            },
            {
                key: 'categories',
                label: 'Categories',
                sortable: true,
                render: (value, all) => <div style={{ textTransform: 'capitalize' }}><strong>{all.brand_name}</strong> <br/>{ all.categories.join(', ')}</div>,
            },
            {
                key: 'price',
                label: 'Price',
                sortable: true,
                render: (temp, all) => <div>{this.renderPrice(all)}</div>,
            },
            // {
            //     key: 'list_price',
            //     label: 'List Price',
            //     sortable: true,
            //     render: (temp, all) => <div></div>,
            // },
            {
                key: 'quantity',
                label: 'Quantity',
                sortable: true,
                render: (temp, all) => <div>{all.stock}</div>,
            },
            // {
            //     key: 'createdAt',
            //     label: 'Date',
            //     sortable: true,
            //     render: (temp, all) => <div>{all.createdAt}</div>,
            // },
            // {
            //     key: 'user_id',
            //     label: 'Action',
            //     render: (temp, all) => (<div><Button onClick={this._handleEdit.bind(this, all)}>Info</Button></div>),
            // },


        ];
        const datatableFunctions = {
            onCellClick: this.handleCellClick,
            // onCellDoubleClick: this.handleCellDoubleClick,
            // onFilterValueChange: this._handleSearchValueChange.bind(this),
            onSortOrderChange: this._handleSortOrderChange,
            onPageChange: this._handlePageChange,
            onRowSelection: this.handleRowSelection,
            onRowSizeChange: this._handleRowSize,
            handleSelectAllClick: this._handleSelectAll

        };
        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: this.props.data,
            count: this.props.total_count,
            page: this.props.currentPage,
            showSelection: true,
            allRowSelected: this.state.allSelected
        };
        return (
            <div>
                <PageBox>
                    <div className={styles.headerContainer}>
                        <span className={styles.title}>Inventory List</span>
                        {/*<Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'}>*/}
                            {/*<Add></Add> Create*/}
                        {/*</Button>*/}
                        <div style={{width: '300px'}}>
                            <FormControl fullWidth variant="outlined" margin={'dense'}>
                                <InputLabel
                                    htmlFor={'selectSelectLabel'}
                                >
                                    Select Store
                                </InputLabel>
                                <Select
                                    label={'Select Store'}
                                    fullWidth={true}
                                    labelId="selectSelectLabel"
                                    id="selectBatch"
                                    value={this.state.storeId}
                                    onChange={this._handleStoreChange}
                                >
                                    {this._renderMenu()}
                                </Select>
                            </FormControl>
                            {this.state.batch_id && (<div style={{ textAlign: 'right' }}>
                                <ButtonBase onClick={this._handleDownload}>Export Data</ButtonBase>
                            </div>)}
                        </div>

                    </div>

                    <div>
                        <FilterComponent
                            is_progress={this.props.is_fetching}
                            filters={this.configFilter}
                            handleSearchValueChange={this._handleSearchValueChange.bind(this)}
                            handleFilterDataChange={this._handleFilterDataChange}
                        />
                        <div>
                            <br/>
                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...datatable}
                                    {...datatableFunctions}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'New Inventory'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>

                <BottomPanel open={this.state.selected.length > 0}>
                    <BottomAction
                        selected={this.state.selected.length}
                        handleAssign={this._handleBatchSelection} />
                </BottomPanel>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.inventory.present,
        total_count: state.inventory.all.length,
        currentPage: state.inventory.currentPage,
        serverPage: state.inventory.serverPage,
        sorting_data: state.inventory.sorting_data,
        is_fetching: state.inventory.is_fetching,
        query: state.inventory.query,
        query_data: state.inventory.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchInventory,
        actionSetPage: actionSetPageInventoryRequests,
        actionResetFilter: actionResetFilterInventoryRequests,
        actionSetFilter: actionFilterInventoryRequests,
        actionChangeStatus: actionChangeStatusInventoryRequests,
        actionCreateInventory: actionCreateInventory,
        actionUpdateInventory: actionUpdateInventory,
        actionDeleteInventory: actionDeleteInventory,
        actionChangeStoreInventory: actionChangeStoreInventory,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
