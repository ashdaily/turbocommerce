export const AddressReducer = (state, action) => {
    switch (action.type) {
        case "ADDRESS_INIT":
            return {
                ...state,
                addresses: [],
                is_fetching: false,
            };
        case "ADDRESS_DONE": {
            return {
                ...state,
                addresses: action.payload,
                is_fetching: false,
            }
        }
        case "CREATE_ADDRESS": {
            const addresses = JSON.parse(JSON.stringify(state.addresses));
            addresses.unshift(action.payload);
            return {
                ...state,
                addresses: addresses
            };
        }
        case "UPDATE_ADDRESS": {
            const { id } = action.payload;
            const addresses = JSON.parse(JSON.stringify(state.addresses));
            const index = addresses.findIndex((val) => val.id === id);
            if (index >= 0) {
              addresses[index] = action.payload;
              return {
                  ...state,
                  addresses: addresses,
              };
            }
            return {
                ...state,
            };
        }
        case "DELETE_ADDRESS": {
            const id = action.payload;
            let addresses = JSON.parse(JSON.stringify(state.addresses));
            addresses = addresses.filter((val) => val.id !== id);
            return {
                ...state,
                addresses: addresses,
            };
        }
        default:
            return state;
    }
};
