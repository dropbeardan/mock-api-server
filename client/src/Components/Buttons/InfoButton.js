import React from 'react';

import './InfoButton.less';

export default class InfoButton extends React.Component {
    render() {
        return (
            <div className='InfoButton'>
                <div
                    className={this.props.disabled ? 'material-icons button disabled' : 'material-icons button'}
                >
                    info_outline
                </div>

                <div className={this.props.hint ? `hint ${this.props.alignment}` : `hint hidden ${this.props.alignment}`}>
                    {this.props.hint}
                </div>
            </div>
        );
    };
}