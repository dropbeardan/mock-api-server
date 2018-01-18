const defaultState = {
    token: '',
    isLoading: false,
    error: ''
};

const sessionReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'SESSION_RESET': {
            return {
                ...defaultState
            };
        }

        case 'SESSION_SET': {
            return {
                ...state,
                ...action.payload
            }
        }

        default: {
            return state;
        }
    }
};

export default sessionReducer;