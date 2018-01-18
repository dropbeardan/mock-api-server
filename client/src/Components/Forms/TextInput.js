import React from 'react';

export default class TextInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.blurHandler = this.blurHandler.bind(this);
        this.changeFocus = this.changeFocus.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.resetValue = this.resetValue.bind(this);
        this.selectContent = this.selectContent.bind(this);
    };

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value
        });
    };

    blurHandler(blurFn) {
        return () => {
            return blurFn(this.state.value);
        };
    };

    changeFocus(targetId) {
        return () => {
            if (targetId && document.getElementById(targetId)) {
                document.getElementById(targetId).focus();
            }
        };
    };

    changeHandler(changeFn, sanitiseFn) {
        return (event) => {
            let value = sanitiseFn ? sanitiseFn(event.target.value) : event.target.value;

            if (changeFn) {
                changeFn(value);
            }

            this.setState({
                ...this.state,
                value: value
            });
        };
    };

    inputHandler(eventKeys) {
        return (event) => {
            let eventKey = eventKeys.find((eventKey) => {
                if (
                    (eventKey.shift && !event.shiftKey) ||
                    (eventKey.ctrl && !event.ctrlKey) ||
                    (eventKey.alt && !event.altKey)
                ) {
                    return false;
                }

                if (eventKey.key == event.key) {
                    return true;
                }

                return false;
            });

            if (eventKey) {
                event.preventDefault();
                return eventKey.event();
            }
        };
    };

    resetValue() {
        this.setState({
            ...this.state,
            value: this.props.value
        });
    };

    selectContent(event) {
        event.target.select();
    };

    render() {
        const eventKeys = [
            { shift: true, ctrl: false, alt: false, key: 'Tab', event: this.changeFocus(this.props.prevElem) },
            { shift: false, ctrl: false, alt: false, key: 'ArrowUp', event: this.changeFocus(this.props.prevElem) },
            { shift: false, ctrl: false, alt: false, key: 'Tab', event: this.changeFocus(this.props.nextElem) },
            { shift: false, ctrl: false, alt: false, key: 'Enter', event: this.changeFocus(this.props.nextElem) },
            { shift: false, ctrl: false, alt: false, key: 'ArrowDown', event: this.changeFocus(this.props.nextElem) },
            { shift: false, ctrl: false, alt: false, key: 'Escape', event: this.resetValue }
        ];

        return (
            <input
                id={this.props.id}
                type={this.props.type}
                className={this.props.className}
                disabled={this.props.disabled}
                onBlur={this.blurHandler(this.props.onBlur)}
                onChange={this.changeHandler(this.props.onChange, this.props.sanitise)}
                onFocus={this.selectContent}
                onKeyDown={this.inputHandler(eventKeys)}
                value={this.state.value}
            />
        );
    };
}