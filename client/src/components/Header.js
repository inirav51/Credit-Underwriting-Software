import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Header extends Component {
    renderContent(){
        switch (this.props.auth) {
            case null:
                return
            case false:
                return(
                    <li><a href="/auth/google">Login with Google</a> </li>
                )
            default:
                return(
                    <li><a href="/api/logout">Logout</a></li>
                )
        }
    }
    render(){
        return(
            <nav>
               <div className="nav-wrapper">
                   <Link to={this.props.auth ? '/home' : '/'} className="left brand-logo">
                       Credit Underwriting Web Application
                   </Link>
                   <ul className="right">
                       {this.renderContent()}
                   </ul>
               </div>
            </nav>
        );
    }
}

function mapStatetoProps(state){
    return {auth:state.auth}
}
export default connect(mapStatetoProps)(Header);