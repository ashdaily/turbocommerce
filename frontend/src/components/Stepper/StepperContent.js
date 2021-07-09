import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './Style.scss';
import WaitingComponent from "../WaitingComponent/WaitingComponent";
import { Modal } from 'react-bootstrap';

const StepperContent = ({handleSelect, open, handleClose}) => {
    const [isFetching, setFetching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const isMount = useRef(false);

    useEffect(() => {
        if ((open && isMount.current) || true) {
            setFetching(true);
        }
        isMount.current = true;
    }, []);

    useEffect(() => {
        const tempData = JSON.parse(JSON.stringify(allData));
        tempData.forEach(val => {
            const subCatories = val.subcategories.filter(sub => {
                if (sub.name.match(new RegExp(searchText, 'ig'))) {
                    return true;
                }
                return false;
            });
            val.subcategories = subCatories;
        });
        const filteredData = tempData.filter(val => val.subcategories.length > 0);
        setData(filteredData);
    }, [searchText]);

    const handleSearchChange = useCallback(
        text => {
            setSearchText(text);
        },
        [setSearchText],
    );

    const handlePillClick = useCallback(
        data => {

        },
        [],
    );

    const selectedIds = useMemo(() => {
        return addresses.map(val => val.id);
    }, [addresses]);

    const handleOkayBtn = useCallback((data) => {
        handleSelect(data);
    }, [handleSelect]);

    const renderData = () => {
        if (isFetching) {
            return (
                <div style={styles.activityCont}>
                    <WaitingComponent
                    />
                </div>
            );
        }
        if (data.length > 0) {
            const tempData = [];
            data.forEach(cat => {
                tempData.push(
                    <div
                        handleChange={handlePillClick}
                        selectedData={selectedIds}
                        key={cat.id}
                        data={cat}
                    />,
                );
            });
            tempData.push(
                <button
                    key={'OKAY_BUTTON_CATEGORY'}
                    onPress={handleOkayBtn}
                    style={[styles.primaryAccentBg, styles.btn]}>
                    <label
                        style={[
                            styles.headingTextBold,
                            styles.secondaryTextColor,
                            styles.btnText,
                        ]}>
                        {t('okayUp')}
                    </label>
                </button>,
            );
            return tempData;
        }
        return (
            <div style={styles.noDataCont}>
                <label
                    style={[
                        styles.headingTextBold,
                        styles.primaryText,
                        styles.noDataText,
                    ]}>
                    {t('categoryNoData')}
                </label>
            </div>
        );
    };

    return (
        <Modal
            show={open}
            handleClose={handleClose}>
                <div style={styles.mainCont}>
                    <div style={[styles.searchCont]}>
                        <div style={[styles.roundTextField, styles.searchInputCont]}>
                            <labelInput
                                value={searchText}
                                onChangeText={text => {
                                    handleSearchChange && handleSearchChange(text);
                                }}
                                style={[
                                    styles.text,
                                    styles.primaryText,
                                    styles.textInput,
                                ]}
                                placeholder={t('searchHere')}
                            />
                            <div style={styles.iconCont}>
                                <span
                                    size={'small'}
                                    name={'search-outline'}
                                />
                            </div>
                        </div>
                        <label
                            style={[styles.text, styles.primaryText, styles.maxText]}>
                            {t('maximumFive')}
                        </label>
                    </div>
                    {renderData()}
                </div>
        </Modal>
    );
};

export default StepperContent;
