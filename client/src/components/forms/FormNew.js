// When user click on the Create New then this page will display

import React,{Component} from 'react';
import Financials from './Financials';
import Ratios from './Ratios';
import {reduxForm} from 'redux-form';
import axios from 'axios';

class FormNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // financials: false,
            ratios: false,
            summary: false
        };
    }

    // Call API and Create New Financial entry When user click on the next button
    submitFormData=(data, other)=>{
        let newdata = Object.assign(data, 
            {
                TotalCurrentAssets: other.TotalCurrentAssets[0],
                TotalCurrentLiabilities: other.TotalCurrentLiabilities[0]
            })
        axios.post('/api/financials', newdata)
        this.setState({ratios:true})
        console.log("valuesss", newdata)

    }
    renderContent(){
        if(this.state.ratios === true){
            return <Ratios onBack={()=>this.setState({ratios:false})}/>;
        }
        return <Financials onFinancialsSubmit={(data, other)=>this.submitFormData(data, other)}/>;
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'financialsForm'
})(FormNew);
