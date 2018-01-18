import axios from 'axios';
import moment from 'moment';

const createEndpoint = (sessionToken, route, method, status, headers, responseData, delay) => {
    return async (dispatch) => {
        dispatch({
            type: 'INSTANCE_SET',
            payload: {
                isLoading: true,
                detailError: ''
            }
        });

        try {
            await axios({
                method: 'POST',
                url: `${build.env.BASE_URL}/endpoints`,
                headers: {
                    authorization: sessionToken
                },
                data: {
                    route: route,
                    method: method,
                    status: status,
                    headers: headers,
                    response: responseData,
                    delay: delay
                }
            });

            let response = await axios({
                method: 'GET',
                url: `${build.env.BASE_URL}/endpoints`,
                headers: {
                    authorization: sessionToken
                }
            });

            dispatch({
                type: 'INSTANCE_SET',
                payload: {
                    endpoints: response.data.sort((a, b) => {
                        return moment(b.created).valueOf() - moment(a.created).valueOf();
                    }),
                    isLoading: false
                }
            });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                dispatch({
                    type: 'INSTANCE_SET',
                    payload: {
                        detailError: err.response.data.message,
                        isLoading: false
                    }
                });
            } else {
                dispatch({
                    type: 'INSTANCE_SET',
                    payload: {
                        detailError: 'Unexpected Error Encountered. Please Try Again.',
                        isLoading: false
                    }
                });
            }
        }
    };
};

const getEndpoints = (sessionToken) => {
    return async (dispatch) => {
        dispatch({
            type: 'INSTANCE_SET',
            payload: {
                isLoading: true,
                detailError: ''
            }
        });

        try {
            let response = await axios({
                method: 'GET',
                url: `${build.env.BASE_URL}/endpoints`,
                headers: {
                    authorization: sessionToken
                }
            });

            dispatch({
                type: 'INSTANCE_SET',
                payload: {
                    endpoints: response.data.sort((a, b) => {
                        return moment(b.created).valueOf() - moment(a.created).valueOf();
                    }),
                    isLoading: false
                }
            });
        } catch (err) {
            dispatch({ type: 'SESSION_RESET' });
            dispatch({ type: 'INSTANCE_RESET' });
        }
    };
};

const loadEndpoint = (endpointId) => {
    return {
        type: 'INSTANCE_SET',
        payload: {
            activeEndpointId: endpointId,
            isViewingDetails: true,
            detailError: ''
        }
    };
};

const removeEndpoint = (sessionToken, endpointId) => {
    return async (dispatch) => {
        dispatch({
            type: 'INSTANCE_SET',
            payload: {
                isLoading: true,
                activeEndpointId: null,
                isViewingDetails: false,
                detailError: ''
            }
        });

        try {
            await axios({
                method: 'DELETE',
                url: `${build.env.BASE_URL}/endpoints/${endpointId}`,
                headers: {
                    authorization: sessionToken
                }
            });

            let response = await axios({
                method: 'GET',
                url: `${build.env.BASE_URL}/endpoints`,
                headers: {
                    authorization: sessionToken
                }
            });

            dispatch({
                type: 'INSTANCE_SET',
                payload: {
                    endpoints: response.data.sort((a, b) => {
                        return moment(b.created).valueOf() - moment(a.created).valueOf();
                    }),
                    isLoading: false
                }
            });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                dispatch({
                    type: 'INSTANCE_SET',
                    payload: {
                        detailError: err.response.data.message,
                        isLoading: false
                    }
                });
            } else {
                dispatch({
                    type: 'INSTANCE_SET',
                    payload: {
                        detailError: 'Unexpected Error Encountered. Please Try Again.',
                        isLoading: false
                    }
                });
            }
        }
    };
};

const unloadEndpoint = () => {
    return {
        type: 'INSTANCE_SET',
        payload: {
            isViewingDetails: false,
            activeEndpointId: null,
            detailError: ''
        }
    };
};

const updateEndpoint = (sessionToken, endpointId, route, method, status, headers, responseData, delay) => {
    return async (dispatch) => {
        dispatch({
            type: 'INSTANCE_SET',
            payload: {
                isLoading: true,
                detailError: ''
            }
        });

        try {
            await axios({
                method: 'PATCH',
                url: `${build.env.BASE_URL}/endpoints/${endpointId}`,
                headers: {
                    authorization: sessionToken
                },
                data: {
                    route: route,
                    method: method,
                    status: status,
                    headers: headers,
                    response: responseData,
                    delay: delay
                }
            });

            let response = await axios({
                method: 'GET',
                url: `${build.env.BASE_URL}/endpoints`,
                headers: {
                    authorization: sessionToken
                }
            });

            dispatch({
                type: 'INSTANCE_SET',
                payload: {
                    endpoints: response.data.sort((a, b) => {
                        return moment(b.created).valueOf() - moment(a.created).valueOf();
                    }),
                    isLoading: false
                }
            });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                dispatch({
                    type: 'INSTANCE_SET',
                    payload: {
                        detailError: err.response.data.message,
                        isLoading: false
                    }
                });
            } else {
                dispatch({
                    type: 'INSTANCE_SET',
                    payload: {
                        detailError: 'Unexpected Error Encountered. Please Try Again.',
                        isLoading: false
                    }
                });
            }
        }
    };
};

export default {
    createEndpoint,
    getEndpoints,
    loadEndpoint,
    removeEndpoint,
    unloadEndpoint,
    updateEndpoint
};