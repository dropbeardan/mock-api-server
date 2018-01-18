import React from 'react';

import './Auth.less';

import { sanitise } from '../../../Helpers';

import { TextInput } from '../../Forms';
import { Loading } from '../../Overlays';

export default class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            instance: '',
            password: '',
            event: null
        };

        this.bindValue = this.bindValue.bind(this);
        this.formSilencer = this.formSilencer.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    };

    bindValue(key) {
        return (value) => {
            this.setState({
                ...this.state,
                [key]: value
            });
        };
    };

    formSilencer(event) {
        event.preventDefault();
    };

    submitHandler(fn) {
        return () => {
            return fn(this.state.instance, this.state.password);
        }
    };

    render() {
        return (
            <section className='Auth'>
                <form onSubmit={this.formSilencer}>
                    <header>
                        Instance Management
                    </header>

                    <main>
                        Login or create a new instance to manage your API endpoints.
                    </main>

                    <div>
                        <label htmlFor='instance'>Instance Name</label>
                        <TextInput
                            id='instance'
                            type='text'
                            onBlur={this.bindValue('instance')}
                            nextElem='password'
                            sanitise={sanitise.alphaNumeric}
                            value={this.state.instance}
                        />
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <TextInput
                            id='password'
                            type='password'
                            onBlur={this.bindValue('password')}
                            prevElem='instance'
                            nextElem='login'
                            value={this.state.password}
                        />
                    </div>

                    <div>
                        <input
                            id='login'
                            className='button'
                            type='submit'
                            value='Login'
                            onClick={this.submitHandler(this.props.onLogin)}
                        />

                        <input
                            id='register'
                            className='button'
                            type='submit'
                            value='Register'
                            onClick={this.submitHandler(this.props.onRegister)}
                        />
                    </div>

                    <div className={this.props.error ? 'error' : 'error hidden'}>
                        {this.props.error}
                    </div>
                </form>

                <Loading visible={this.props.isLoading} />
            </section>
        );
    };
}