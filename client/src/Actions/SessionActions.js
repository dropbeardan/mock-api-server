import axios from 'axios';

const displayError = (error) => {
    return {
        type: 'SESSION_SET',
        payload: {
            error: error
        }
    };
};

const login = (instance, password) => {
    return async (dispatch) => {
        dispatch({
            type: 'SESSION_SET',
            payload: {
                isLoading: true,
                error: ''
            }
        });

        try {
            let response = await axios({
                method: 'POST',
                url: `${build.env.BASE_URL}/sessions`,
                data: {
                    instance: instance,
                    password: password
                }
            });

            dispatch({
                type: 'INSTANCE_SET',
                payload: {
                    url: `${build.env.BASE_URL}/${instance}`
                }
            });

            dispatch({
                type: 'SESSION_SET',
                payload: {
                    token: response.data.token,
                    isLoading: false
                }
            });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                dispatch({
                    type: 'SESSION_SET',
                    payload: {
                        error: err.response.data.message,
                        isLoading: false
                    }
                });
            } else {
                dispatch({
                    type: 'SESSION_SET',
                    payload: {
                        error: 'Unexpected Error Encountered. Please Try Again.',
                        isLoading: false
                    }
                });
            }
        }
    }
};

const logout = () => {
    return { type: 'SESSION_RESET' };
};

const register = (instance, password) => {
    return async (dispatch) => {
        dispatch({
            type: 'SESSION_SET',
            payload: {
                isLoading: true,
                error: ''
            }
        });

        try {
            let response = await axios({
                method: 'POST',
                url: `${build.env.BASE_URL}/instances`,
                data: {
                    instance: instance,
                    password: password
                }
            });

            dispatch({
                type: 'INSTANCE_SET',
                payload: {
                    url: `${build.env.BASE_URL}/${instance}`
                }
            });

            dispatch({
                type: 'SESSION_SET',
                payload: {
                    token: response.data.token,
                    isLoading: false
                }
            });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                dispatch({
                    type: 'SESSION_SET',
                    payload: {
                        error: err.response.data.message,
                        isLoading: false
                    }
                });
            } else {
                dispatch({
                    type: 'SESSION_SET',
                    payload: {
                        error: 'Unexpected Error Encountered. Please Try Again.',
                        isLoading: false
                    }
                });
            }
        }
    }
};

export default {
    displayError,
    login,
    logout,
    register
};