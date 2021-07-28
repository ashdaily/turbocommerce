import React, { useCallback, useMemo, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Style.module.css';

const useStyles = {
  formControl: {
    minWidth: 120
  }
};

const FilterInput = ({ isProgress, handleSearchChange }) => {
  const [query, setQuery] = useState('');

  const changedSearch = _.debounce((value) => {
    // eslint-disable-next-line no-unused-expressions
    handleSearchChange && handleSearchChange(value);
    console.log(value);
  }, 500);

  const _inputChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      changedSearch(e.target.value);
    },
    [setQuery]
  );

  const _renderProgress = useMemo(() => {
    if (isProgress) {
      return <LinearProgress color="primary" />;
    }
    return null;
  }, [isProgress]);

  return (
    <div style={{}}>
      <div className={styles.cont}>
        <div className={styles.inputContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            value={query}
            onChange={_inputChange}
            className={styles.searchInput}
            placeholder="Search"
          />
        </div>
        {_renderProgress}
      </div>
    </div>
  );
};

FilterInput.defaultTypes = {
  isProgress: false
};
FilterInput.propTypes = {
  isProgress: PropTypes.bool
};

export default withStyles(useStyles, { withTheme: true })(FilterInput);
