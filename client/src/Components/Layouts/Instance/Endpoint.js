import React from 'react';

import './Endpoint.less';

import { sanitise } from '../../../Helpers';

import { AddButton, InfoButton, RemoveButton } from '../../Buttons';
import { TextArea, TextInput } from '../../Forms';
import { Loading } from '../../Overlays';

export default class Endpoint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            route: props.route ? props.route : '/',
            method: props.method ? props.method : 'GET',
            status: props.status ? props.status : 200,
            headers: props.headers ? props.headers.map((header, index) => {
                return {
                    ...header,
                    id: index
                };
            }) : [
                    { id: 1, key: '', value: '' },
                    { id: 2, key: '', value: '' },
                    { id: 3, key: '', value: '' }
                ],
            response: props.response ? props.response : '',
            delay: props.delay ? props.delay : 0
        };

        this.methodOptions = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];

        this.addHeader = this.addHeader.bind(this);
        this.bindHeader = this.bindHeader.bind(this);
        this.bindValue = this.bindValue.bind(this);
        this.formSilencer = this.formSilencer.bind(this);
        this.listHeader = this.listHeaders.bind(this);
        this.listMethodOptions = this.listMethodOptions.bind(this);
        this.removeHeader = this.removeHeader.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    };

    componentWillReceiveProps(props) {
        this.setState({
            id: props.id,
            route: props.route ? props.route : '/',
            method: props.method ? props.method : 'GET',
            status: props.status ? props.status : 200,
            headers: props.headers ?
                props.headers.map((header, index) => {
                    return {
                        ...header,
                        id: index
                    };
                }) : [
                    { id: 1, key: '', value: '' },
                    { id: 2, key: '', value: '' },
                    { id: 3, key: '', value: '' }
                ],
            response: props.response ? props.response : '',
            delay: props.delay ? props.delay : 0
        });
    };

    addHeader() {
        this.setState({
            ...this.state,
            headers: [
                ...this.state.headers,
                {
                    id: this.state.headers.length == 0 ? 1 : this.state.headers[this.state.headers.length - 1].id + 1,
                    key: '',
                    value: ''
                }
            ]
        });
    };

    bindHeader(index, key) {
        return (value) => {
            return this.setState({
                ...this.state,
                headers: [
                    ...this.state.headers.slice(0, index),
                    { ...this.state.headers[index], [key]: value },
                    ...this.state.headers.slice(index + 1)
                ]
            });
        };
    };

    bindValue(key) {
        return (value) => {
            return this.setState({
                ...this.state,
                [key]: value
            });
        };
    };

    formSilencer(event) {
        event.preventDefault();
    };

    listHeaders(headers) {
        return headers.map((header, index) => {
            return (
                <tr key={header.id}>
                    <td>
                        <TextInput
                            id={`headerKey${index}`}
                            type='text'
                            onBlur={this.bindHeader(index, 'key')}
                            prevElem={index == 0 ? 'status' : `headerKey${index - 1}`}
                            nextElem={`headerValue${index}`}
                            sanitise={sanitise.alphaNumeric}
                            value={header.key ? header.key : ''}
                        />
                    </td>
                    <td>
                        <TextInput
                            id={`headerValue${index}`}
                            type='text'
                            onBlur={this.bindHeader(index, 'value')}
                            prevElem={`headerKey${index}`}
                            nextElem={index == (headers.length - 1) ? 'response' : `headerKey${index + 1}`}
                            sanitise={sanitise.alphaNumeric}
                            value={header.value ? header.value : ''}
                        />
                    </td>
                    <td>
                        <RemoveButton onClick={this.removeHeader(index)} />
                    </td>
                </tr>
            );
        });
    };

    listMethodOptions(methods) {
        return methods.map((method) => {
            return (
                <option key={method} value={method}> {method}</option >
            );
        });
    };

    removeHeader(index) {
        return () => {
            return this.setState({
                ...this.state,
                headers: [
                    ...this.state.headers.slice(0, index),
                    ...this.state.headers.slice(index + 1)
                ]
            });
        };
    };

    submitHandler(fn) {
        return () => {
            return fn(
                this.state.id,
                this.state.route,
                this.state.method,
                this.state.status,
                this.state.headers,
                this.state.response,
                this.state.delay
            );
        };
    };

    render() {
        return (
            <form
                className={this.props.active ? 'Endpoint' : 'Endpoint hidden'}
                onSubmit={this.formSilencer}
            >
                <div>
                    <label htmlFor='route'>Route</label>
                    <TextInput
                        id='route'
                        type='text'
                        disabled={this.state.id}
                        onBlur={this.bindValue('route')}
                        nextElem='method'
                        sanitise={sanitise.route}
                        value={this.state.route}
                    />
                </div>

                <div>
                    <label htmlFor='method'>Method</label>
                    <select
                        id='method'
                        disabled={this.state.id}
                        onChange={(e) => { return this.bindValue('method')(e.target.value); }}
                    >
                        {this.listMethodOptions(this.methodOptions)}
                    </select>
                </div>

                <div>
                    <label htmlFor='status'>Status Code (100 - 599)</label>
                    <TextInput
                        id='status'
                        type='number'
                        onBlur={(value) => { return this.bindValue('status')(sanitise.numericRange(100, 599)(value)); }}
                        prevElem='method'
                        nextElem={this.state.headers.length == 0 ? 'response' : `headerKey0`}
                        sanitise={sanitise.numeric}
                        value={this.state.status}
                    />
                </div>

                <div className='headers'>
                    <div>
                        <div className='title'>Headers</div>
                        <InfoButton
                            alignment='right'
                            hint='Headers with an empty Key will be ignored.'
                        />
                        <div>
                            <AddButton onClick={this.addHeader} />
                        </div>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <th>Key</th>
                                <th>Value (string)</th>
                            </tr>

                            {this.listHeaders(this.state.headers)}
                        </tbody>
                    </table>
                </div>

                <div>
                    <label htmlFor='response'>Response (string)</label>
                    <TextArea
                        id='response'
                        rows={10}
                        type='text'
                        onBlur={this.bindValue('response')}
                        prevElem={this.state.headers.length == 0 ? 'status' : `headerKey${this.state.headers.length - 1}`}
                        nextElem='delay'
                        value={this.state.response}
                    />
                </div>

                <div>
                    <label htmlFor='delay'>Delay (ms)</label>
                    <TextInput
                        id='delay'
                        type='number'
                        onBlur={this.bindValue('delay')}
                        prevElem='response'
                        nextElem='save'
                        sanitise={sanitise.numeric}
                        value={this.state.delay}
                    />
                </div>

                <div className='formActions'>
                    <input
                        id='cancel'
                        type='submit'
                        value='Cancel'
                        onClick={this.submitHandler(this.props.onCancel)}
                    />

                    <input
                        id='save'
                        type='submit'
                        value='Save'
                        onClick={this.submitHandler(this.props.onSave)}
                    />
                </div>

                <div className='error'>
                    {this.props.error}
                </div>
            </form>
        );
    };
}