// This page is displayed at the root route("/")
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class InfoPage extends Component{
    render(){
        return(
            <div className="container">
                <div className="info-page-wrap">
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card-panel teal lighten-4">
                                <span className="white-text">
                                    <li>Login with your Google account to get started. </li>
                                    <li>Create New Form: Get started with new form and fill out the Financial data get scores. </li>
                                    <li>Update Form: Enter Form Id to retrieve and upadate the existing form. </li>
                                    <li>Export as xlxs: To get get a Excel file of the existing form. </li>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStatetoProps(state){
    return {auth:state.auth}
}
export default connect(mapStatetoProps)(InfoPage);
