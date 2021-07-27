import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SelectField from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { Chip, FormHelperText, MenuItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    error={!!(touched && error)}
    {...input}
    {...custom}
    label={label}
    helperText={touched && error}
  />
);

export const renderOutlinedTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error ? (custom.errorText ? custom.errorText : error) : ''}
    {...input}
    {...custom}
    label={label}
    // helperText={touched && error}
    variant="outlined"
  />
);

export const renderOutlinedTextFieldWithLimit = ({
  input,
  label,
  maxLimit,
  meta: { touched, error },
  ...custom
}) => {
  const valueLen = input.value.length;
  const tempLabel = valueLen
    ? `${label} (${valueLen}/${maxLimit})`
    : `${label} (Max ${maxLimit} Characters)`;
  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error ? custom.errorText : ''}
      {...input}
      {...custom}
      label={tempLabel}
      // helperText={touched && error}
      variant="outlined"
    />
  );
};



export const renderCheckbox = ({ input, label, ...rest }) => (
  <FormControlLabel
    control={<Checkbox {...input} {...rest} checked={!!input.value} onChange={input.onChange} />}
    label={label}
  />
);


export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

export const renderNewSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl fullWidth error={touched && error}>
    <InputLabel htmlFor={custom.inputId}>{label}</InputLabel>
    <SelectField
      {...input}
      {...custom}
      inputProps={{
        id: custom.inputId
      }}
    >
      {children}
    </SelectField>
  </FormControl>
);


export class renderOutlinedSelectField extends React.Component {
  state = {
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  render() {
    const {
      input,
      label,
      margin,
      meta: { touched, error },
      children,
      ...custom
    } = this.props;
    return (
      <FormControl fullWidth variant="outlined" margin={margin} error={touched && error}>
        <InputLabel
          ref={(ref) => {
            this.InputLabelRef = ref;
          }}
          htmlFor={custom.inputId}
        >
          {label}
        </InputLabel>
        <SelectField {...input} {...custom}>
          {children}
        </SelectField>
        <FormHelperText>
          {touched && error ? (custom.errorText ? custom.errorText : error) : ''}
        </FormHelperText>
      </FormControl>
    );
  }
}

const useStyles = {
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '0px 2px',
    height: 20
  }
};

function getStyles(id, selectedValues) {
  return {
    fontWeight: selectedValues.indexOf(id) === -1 ? 400 : 600
  };
}

export class renderAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this._extractData = this._extractData.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event, value) {
    const { input, multiple } = this.props;
    if (multiple) {
      value ? input.onChange(value.map((val) => val.id)) : input.onChange([]);
    } else {
      value ? input.onChange(value.id) : input.onChange(null);
    }
  }

  _extractData(options) {
    const { data, extract, multiple } = this.props;
    return options[extract.title];

    return data.map((val) => {
      const value = val[extract.value];
      const title = val[extract.title];
      return title;
    });
  }

  render() {
    const {
      input,
      multiple,
      label,
      limitTags,
      margin,
      meta: { touched, error },
      dataObj,
      data,
      children,
      ...custom
    } = this.props;
    const values = input.value != '' ? input.value : [];
    let componentValues = multiple ? [] : values;
    if (multiple) {
      values.forEach((val) => {
        this.props.data.some((dT) => {
          if (dT.id == val) {
            componentValues.push(dT);
            return true;
          }
        });
      });
    } else {
      this.props.data.some((dT) => {
        if (dT.id == values) {
          componentValues = dT;
          return true;
        }
      });
    }

    return (
      <div style={{ marginTop: '8px', marginBottom: '4px' }}>
        <Autocomplete
          size="small"
          multiple={multiple}
          options={this.props.data}
          getOptionLabel={this._extractData}
          // defaultValue={input.value  != '' ? input.value : []}
          limitTags={limitTags}
          onChange={this._onChange}
          value={componentValues}
          // defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!(touched && error)}
              helperText={touched && error ? (custom.errorText ? custom.errorText : error) : ''}
              variant="outlined"
              label={label}
              placeholder={label}
            />
          )}
        />
      </div>
    );
  }
}

class renderOutlinedMultipleSelectFieldClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      selectedData: []
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  _renderTourTypes() {
    const { data, extract, input } = this.props;
    return data.map((val) => {
      const value = val[extract.value];
      const title = val[extract.title];
      return (
        <MenuItem style={getStyles(value, input.value)} value={value}>
          {title}
        </MenuItem>
      );
    });
  }

  render() {
    const {
      input,
      label,
      margin,
      meta: { touched, error },
      dataObj,
      data,
      children,
      ...custom
    } = this.props;
    const { classes } = this.props;
    return (
      <FormControl fullWidth variant="outlined" margin={margin} error={touched && error}>
        <InputLabel
          ref={(ref) => {
            this.InputLabelRef = ref;
          }}
          htmlFor={custom.inputId}
        >
          {label}
        </InputLabel>
        <SelectField
          {...input}
          value={input.value != '' ? input.value : []}
          {...custom}
          multiple
          // input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => {
                if (dataObj) {
                  const temp = dataObj[value];
                  return <Chip key={value} label={temp} className={classes.chip} />;
                }
                return <Chip key={value} label={value} className={classes.chip} />;
              })}
            </div>
          )}
          // MenuProps={MenuProps}
        >
          {this._renderTourTypes()}
        </SelectField>
        <FormHelperText>
          {touched && error ? (custom.errorText ? custom.errorText : error) : ''}
        </FormHelperText>
      </FormControl>
    );
  }
}
