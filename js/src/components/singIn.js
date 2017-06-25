import React, { Component } from 'react';
import {signIn} from '../firebase'


export default class SignIn extends Component {
   
    render() {
        const {index} = this.props;
        return (<div>
           <button> Sign In </button>
        </div>);
    }
}
