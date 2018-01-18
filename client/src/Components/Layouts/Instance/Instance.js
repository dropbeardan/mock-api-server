import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import history from '../../../history';

import './Instance.less';

import { SessionActions, InstanceActions } from '../../../Actions';

import { AddButton, RemoveButton } from '../../Buttons';
import { Loading } from '../../Overlays';

import { Endpoint, EndpointPanel } from './index';

@connect((store) => {
    return {
        instance: store.instance,
        session: store.session
    };
})
export default class Instance extends React.Component {

    constructor(props) {
        super(props);

        if (!props.session.token) {
            history.push('/');
        }

        this.cancelDetailHandler = this.cancelDetailHandler.bind(this);
        this.createEndpoint = this.createEndpoint.bind(this);
        this.listEndpoints = this.listEndpoints.bind(this);
        this.loadEndpoint = this.loadEndpoint.bind(this);
        this.logout = this.logout.bind(this);
        this.removeEndpoint = this.removeEndpoint.bind(this);
        this.saveDetailHandler = this.saveDetailHandler.bind(this);
    };

    componentWillReceiveProps(props) {
        if (!props.session.token) {
            history.replace('/');
        }
    }

    componentWillMount() {
        return this.props.dispatch(InstanceActions.getEndpoints(this.props.session.token));
    };

    cancelDetailHandler() {
        return this.props.dispatch(InstanceActions.unloadEndpoint());
    };

    createEndpoint() {
        return this.props.dispatch(InstanceActions.loadEndpoint(null));
    };

    listEndpoints(endpoints) {
        return endpoints.map((endpoint, index) => {
            return <EndpointPanel
                key={index}
                {...endpoint}
                active={this.props.instance.activeEndpointId == endpoint.id}
                url={this.props.instance.url}
                onClick={this.loadEndpoint(endpoint.id)}
            />;
        });
    };

    loadEndpoint(endpointId) {
        return () => {
            return this.props.dispatch(InstanceActions.loadEndpoint(endpointId));
        };
    }

    logout() {
        return this.props.dispatch(SessionActions.logout());
    };

    removeEndpoint() {
        if (this.props.instance.isLoading) {
            return;
        }

        return this.props.dispatch(InstanceActions.removeEndpoint(this.props.session.token, this.props.instance.activeEndpointId));
    };

    saveDetailHandler(id, route, method, status, headers, response, delay) {
        if (this.props.instance.isLoading) {
            return;
        }

        let filteredHeaders = headers.filter((header) => {
            return header.key;
        });

        if (!this.props.instance.activeEndpointId) {
            return this.props.dispatch(InstanceActions.createEndpoint(
                this.props.session.token,
                route,
                method,
                status,
                filteredHeaders,
                response,
                delay
            ));
        }

        return this.props.dispatch(InstanceActions.updateEndpoint(
            this.props.session.token,
            id,
            route,
            method,
            status,
            filteredHeaders,
            response,
            delay
        ));
    };

    render() {
        let activeEndpoint = this.props.instance.activeEndpointId ?
            this.props.instance.endpoints.find((endpoint) => {
                return endpoint.id == this.props.instance.activeEndpointId;
            }) : {};

        return (
            <section className='Instance'>
                <div className='content'>
                    <section className='banner'>
                        <section className='menu'>
                            <div className='wrapper'>
                                <input id='logoutButton' type='button' value='Logout' onClick={this.logout} />
                            </div>
                        </section>

                        <header>Instance Management Console</header>
                    </section>

                    <section className='activeEndpoints'>
                        <section className={this.props.instance.isViewingDetails ? 'panels' : 'panels active'} >
                            <div>
                                <header>Active Endpoints</header>
                                <div className='wrapper'>
                                    <AddButton
                                        hint='Create a new API endpoint for this instance.'
                                        onClick={this.createEndpoint}
                                    />
                                    <RemoveButton
                                        hint='Delete the selected API endpoint.'
                                        disabled={!this.props.instance.activeEndpointId}
                                        onClick={this.removeEndpoint}
                                    />
                                </div>
                            </div>

                            <main>
                                {this.listEndpoints(this.props.instance.endpoints)}
                            </main>
                        </section>

                        <section className={this.props.instance.isViewingDetails ? 'details active' : 'details'}>
                            <header>Endpoint Details</header>
                            <main>
                                <Endpoint
                                    {...activeEndpoint}
                                    active={this.props.instance.isViewingDetails}
                                    error={this.props.instance.detailError}
                                    isLoading={this.props.instance.isSavingDetails}
                                    onCancel={this.cancelDetailHandler}
                                    onSave={this.saveDetailHandler}
                                />
                            </main>
                        </section>
                    </section>
                </div>

                <Loading visible={this.props.instance.isLoading} />
            </section >
        );
    };
}