import React from 'react';

import './AddButton.less';

export default class AddButton extends React.Component {
    render() {
        return (
            <div className='AddButton'>
                <div
                    className={this.props.disabled ? 'material-icons button disabled' : 'material-icons button'}
                    onClick={!this.props.disabled && this.props.onClick ? this.props.onClick : null}
                >
                    add
                </div>

                <div className={this.props.hint ? `hint ${this.props.alignment}` : `hint hidden ${this.props.alignment}`}>
                    {this.props.hint}
                </div>
            </div>
        );
    };
}