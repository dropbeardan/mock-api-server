import React from 'react';
import { connect } from 'react-redux';

import history from '../../../history';

import './Home.less';

import { SessionActions } from '../../../Actions';

import { Auth } from './index';

@connect((store) => {
    return {
        session: store.session
    };
})
export default class Home extends React.Component {

    constructor(props) {
        super(props);

        if (props.session.token) {
            history.replace('/instance');
        }

        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    };

    componentWillReceiveProps(props) {
        if (props.session.token) {
            history.replace('/instance');
        }
    }

    loginHandler(instance, password) {
        if (this.props.session.isLoading) {
            return;
        }

        if (!instance) {
            return this.props.dispatch(SessionActions.displayError('Instance Name is required.'));
        }

        if (!password) {
            return this.props.dispatch(SessionActions.displayError('Password is required.'));
        }

        return this.props.dispatch(SessionActions.login(instance, password));
    };

    registerHandler(instance, password) {
        if (this.props.session.isLoading) {
            return;
        }

        if (!instance) {
            return this.props.dispatch(SessionActions.displayError('Instance Name is required.'));
        }

        if (!password) {
            return this.props.dispatch(SessionActions.displayError('Password is required.'));
        }

        return this.props.dispatch(SessionActions.register(instance, password));
    };

    render() {
        return (
            <div className='Home'>
                <div>
                    <section className='description'>
                        <header>Mock API Server</header>
                        <main>
                            <p>The Mock API Server is a lightweight server that simulates a RESTful API endpoint through a real-time network.</p>
                            <h1>Getting Started</h1>
                            <ol>
                                <li><div>Login to an existing instance or create a new instance.</div></li>
                                <li><div>Create RESTful API endpoints for the instance.</div></li>
                                <li><div>Make HTTP calls to your API enpoint to fetch the programmed response.</div></li>
                            </ol>
                        </main>
                    </section>
                </div>

                <section className='auth'>
                    <Auth
                        error={this.props.session.error}
                        isLoading={this.props.session.isLoading}
                        onLogin={this.loginHandler}
                        onRegister={this.registerHandler}
                    />
                </section>
            </div>
        );
    };
}