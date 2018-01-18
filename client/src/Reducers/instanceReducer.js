const defaultState = {
    isLoading: false,
    url: null,
    endpoints: [],
    activeEndpointId: null,
    isViewingDetails: false,
    detailError: ''
};

const instanceReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'INSTANCE_RESET': {
            return {
                ...defaultState
            };
        };

        case 'INSTANCE_SET': {
            return {
                ...state,
                ...action.payload
            };
        };

        default: {
            return state;
        }
    }
};

export default instanceReducer;