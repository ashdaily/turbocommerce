import { updatePageTitle } from '../util/Helpers';

export const AppSettingsReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_STORE_INFO":
            const data = action.payload;
            localStorage.setItem('storeInfo', JSON.stringify(data));
            updatePageTitle(data.title_tag, data.logo);
            return {
                ...state,
                storeInfo: data
            };
        default:
            return state;
    }
};
