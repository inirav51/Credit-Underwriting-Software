//This page is currently not used. It can be used if the client decides to use a local user registration and does not want to use google login
import React from "react";

import Transition from "react-transition-group/Transition";

export default class FadeTransition extends React.Component {

    constructor(props) {
        super(props);
        //Default Style
        this.defaultStyle = {
            transitionProperty: "opacity",
            transition: `${this.props.duration}ms ease-in-out`
        };
        this.transitionStyle = {
            entering: {
                opacity: "0"
            },
            entered: {
                opacity: "1",
                transitionDelay: "70ms"
            },
            exiting: {
                opacity: "0"
            },
            exited: {
                opacity: "0"
            }
        };
    }

    render() {

        return (
            <Transition in={this.props.isOpen} timeout={this.props.duration}>
                {(state) => {
                    if (state === "exited")
                        return null;
                    return React
                        .Children
                        .map(this.props.children, (child, idx) => {
                            return React.cloneElement(child, {
                                style: Object.assign({}, this.defaultStyle, this.transitionStyle[state])
                            });
                        });
                }}
            </Transition>
        );

    }

}
