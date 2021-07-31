import React, {Component} from 'react';
import {Button, Dialog, MenuItem, Slide, withStyles} from "@material-ui/core";
import styles from './Style.module.css';
import {Field, reduxForm} from "redux-form";
import EventEmitter from "../../../libs/Events.utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {renderOutlinedSelectField, renderOutlinedTextField} from "../../../libs/redux-material.utils";
// import {actionFetchBatch, actionCreateBatch} from "../../../../actions/Batch.action";


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const validate = (values) => {
    const requiredFields = ['name', 'slot'];
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field] && values[field] != 0) {
            errors[field] = 'Required'
        } else if (values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        } else if (values[field] && Array.isArray(values[field]) && (values[field]).length == 0) {
            errors[field] = 'Required'
        }
    });
    return errors;
};


class BatchDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(data) {
        this.props.actionCreate(data);
        this.props.handleClose();
    }

    render() {
        const {handleSubmit, classes} = this.props;
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={'md'}
            >
                <div className={styles.dialogCont}>
                    <div className={styles.mainContainer}>
                        <div className={styles.headingTuxi}>
                            <div className={styles.loginHeading}>Create Batch</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(this._handleSubmit)}>
                        <div className={'formFlex'}>
                            <div className={'formGroup'}>
                                <Field fullWidth={true}
                                       name="name"
                                       component={renderOutlinedTextField}
                                       margin={'dense'}
                                       label="Batch Name"
                                />
                            </div>
                            <div className={'formGroup'}>
                                <Field
                                    inputId={'type'}
                                    fullWidth={true}
                                    name="slot"
                                    component={renderOutlinedSelectField}
                                    margin={'dense'}
                                    label={'Slot'}
                                >
                                    <MenuItem value={0}>08:00 - 09:00</MenuItem>
                                    <MenuItem value={1}>09:00 - 10:00</MenuItem>
                                </Field>
                            </div>
                        </div>
                        <div className={styles.formAction}>
                        <Button variant={'contained'} className={classes.btnSuccess}
                                type="submit">
                            Add Batch
                        </Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        )
    }
}

const useStyle = theme => ({
    btnSuccess: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        marginRight: 5,
        marginLeft: 5,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
});

const ReduxForm = reduxForm({
    form: 'batch_create',  // a unique identifier for this form
    validate,
    enableReinitialize: true,
    onSubmitFail: errors => {
        console.log(errors);
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    }
})(BatchDialog);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // actionFetchBatch: actionFetchBatch,
        // actionCreate: actionCreateBatch
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        // batches: state.batch.present,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyle, {withTheme: true})(ReduxForm));
