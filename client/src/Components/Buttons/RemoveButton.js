import React from 'react';

import './RemoveButton.less';

export default class RemoveButton extends React.Component {
    render() {
        return (
            <div className='RemoveButton'>
                <div
                    className={this.props.disabled ? 'material-icons button disabled' : 'material-icons button'}
                    onClick={!this.props.disabled && this.props.onClick ? this.props.onClick : null}
                >
                    clear
                </div>

                <div className={this.props.hint ? `hint ${this.props.alignment}` : `hint hidden ${this.props.alignment}`}>
                    {this.props.hint}
                </div>
            </div >
        );
    };
}