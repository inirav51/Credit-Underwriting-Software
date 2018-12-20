// Table List For all the Financial List with Edit Action

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchFinalcialsList} from '../../actions/index';
import {Link} from 'react-router-dom';

const FinancialsList = (props)=> (
    <table>
        <thead>
            <th>Buyer Name</th>
            <th>Statement Quality</th>
            <th>Actions</th>
        </thead>
        {props.data.map(item=>
            <tr>
                <th>{item.buyerName}</th>
                <th>{item.statementQuality}</th>
                <th>                        
                    <Link 
                        to={{
                            pathname: "/update/financial",
                            params: item
                          }}
                        className="home-btn"
                        query={{ testvalue: "hello" }}

                    >   
                        Edit
                    </Link>
                </th>
            </tr>
        )}
    </table>
)

class UpdateForm extends Component{
    componentWillMount(){
        this.props.fetchFinalcialsList();
    }
    render(){
        return(
            <FinancialsList data={this.props.financial || []}/>
        )
    }
}
function mapStatetoProps(state){
    return {
        financial: state.auth && state.auth.financials
    }
}

const mapDispatchToProps = {
    fetchFinalcialsList
}

export default connect(mapStatetoProps, mapDispatchToProps)(UpdateForm);
