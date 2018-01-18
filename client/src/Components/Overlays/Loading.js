import React from 'react';

import './Loading.less';

export default class Loading extends React.Component {
    render() {
        return (
            <section className={
                this.props.visible ?
                    `Loading ${this.props.className}` :
                    `Loading hidden ${this.props.className}`
            }>
                <div className='spin-icon'>
                    <i className='material-icons'>sync</i>
                </div>

                <header>Loading</header>
            </section>
        );
    };
}