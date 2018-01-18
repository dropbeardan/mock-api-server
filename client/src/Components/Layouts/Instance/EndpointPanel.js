import React from 'react';

import './EndpointPanel.less';

import { InfoButton } from '../../Buttons';

export default class EndpointPanel extends React.Component {

    constructor(props) {
        super(props);

        this.methodColors = {
            GET: 'green',
            POST: 'blue',
            PUT: 'purple',
            PATCH: 'yellow',
            DELETE: 'red'
        };
    };

    render() {
        let endpointURL = `${this.props.url}${this.props.route}`;

        return (
            <div
                className={this.props.active ? 'EndpointPanel active' : 'EndpointPanel'}
                onClick={this.props.onClick}
            >
                <div>
                    <div className={`method ${this.methodColors[this.props.method]}`}>{this.props.method}</div>
                    <div className='invocation'>
                        <div>{endpointURL}</div>
                        <InfoButton
                            alignment='left'
                            hint={`To invoke this endpoint, send a HTTP ${this.props.method} request to ${endpointURL}.`}
                        />
                    </div>
                </div>

                <div>
                    <div className='field'>Route</div>
                    <div className='value'>{this.props.route}</div>
                </div>

                <div>
                    <div className='field'>Status</div>
                    <div className='value'>{this.props.status}</div>
                </div>

                <div>
                    <div className='field'>Headers</div>
                    <div className='value'>
                        {
                            this.props.headers.length == 1 ?
                                `${this.props.headers.length} header` :
                                `${this.props.headers.length} headers`
                        }
                    </div>
                </div>

                <div>
                    <div className='field'>Response</div>
                    <div className='value'>{this.props.response ? this.props.response.substring(0, 100) : ''}</div>
                </div>

                <div>
                    <div className='field'>Delay</div>
                    <div className='value'>{this.props.delay ? this.props.delay : 0} ms</div>
                </div>
            </div>
        );
    };
}