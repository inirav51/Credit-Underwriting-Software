// Update Form it will first call the api and then fill the form with the API response.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, formValueSelector, FieldArray} from 'redux-form';
import FinancialsField from './FinancialsFields';
import {Link} from 'react-router-dom';
import years from "./years";
import findSum from "./findSum";
import onlyAlphs from './Normalizers/onlyAlphs';
import {fetchFinalcialsDetails, updateFinalcialsDetails} from '../../actions/index'

class UpdateFinancials extends Component{
    state={
      loading: true
    }

    // Call API for the Form Data
    componentWillMount(){
      if(this.props.history.location.params === undefined){
        this.props.history.push('/form/update')
        return
      }
      let {_id}= this.props.history.location.params;

      this.props.fetchFinalcialsDetails(_id).then(res=>{
        console.log(res)
        this.setState({loading: false})
      })
    }

    // Submit the Form Data when user click on the next button
    submitFormData = (values)=>{
      let {_id}= this.props.history.location.params;
      this.props.updateFinalcialsDetails(_id, values ).then(res=>{
        console.log("hhhhhhhhhhhhhhhggggggggggggg")
        this.props.history.push('/form/update')
      })
    }

    renderFields(){
        const {array:{push}, pristine, Cash} = this.props
        if(this.state.loading === false){
        return(
            <div>
                <Field type="text" name="buyerName" label="Buyer's name" component={FinancialsField} normalize={onlyAlphs}/>
                <Field type="text" name="statementQuality" label="Statement Quality" component={FinancialsField} normalize={onlyAlphs}/>
                <FieldArray name="Cash" label="Cash" component={years} />
                <FieldArray name="AccountsReceivable" label="Accounts Receivable" component={years}/>
                <FieldArray name="Inventory" label="Inventory" component={years}/>
                <FieldArray name="OtherCurrentAssets" label="OtherCurrentAssets" component={years}/>
                <FieldArray  values={this.props.TotalCurrentAssets} name="TotalCurrentAssets" label="TotalCurrentAssets" component={findSum}/>
                <FieldArray name="FixedAssets" label="Fixed Assets" component={years}/>
                <FieldArray name="OtherNonCurrentAssets" label="OtherNonCurrentAssets" component={years}/>
                <FieldArray name="Intangibles" label="Intangibles" component={years}/>
                <FieldArray name="TotalAssets" label="TotalAssets" component={years}/>
                <FieldArray name="AccountsPayable" label="AccountsPayable" component={years}/>
                <FieldArray name="LineOfCredit" label="LineOfCredit" component={years}/>
                <FieldArray name="CurrentPeriodPrincipal" label="CurrentPeriodPrincipal" component={years}/>
                <FieldArray name="OtherCurrentLiabilities" label="OtherCurrentLiabilities" component={years}/>
                <FieldArray  values={this.props.TotalCurrentLiabilities} name="TotalCurrentLiabilities" label="TotalCurrentLiabilities" component={findSum}/>
                <FieldArray name="LongTermLiabilities" label="LongTermLiabilities" component={years}/>
                {/*<FieldArray  values={this.props.TotalCurrentLiabilities} name="TotalCurrentLiabilities" label="TotalCurrentLiabilities" component={findSum}/>*/}
            </div>
        )}
        else{
          return(<div>fetching form data</div>)
        } 
    }
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit((values)=>this.submitFormData(values))}>
                    <div className="container">
                        <div className="form-main">
                            <div className="row">
                                <div className="col s12 m12">
                                    <div className="form-wrap financial-form">
                                        <h1 className="form-header">Financial Form</h1>
                                        {this.renderFields()}
                                        <Link to="/home" className="red btn-flat white-text animate">Cancel</Link>
                                        <button type="submit" className="teal btn-flat right white-text animate">Next <i className="material-icons right">done</i> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const sum=(...input)=>{
    let values = [{year1:0}, {year2:0}, {year3:0}, {year4:0}, {year5:0}];
    console.log("aaa",input)
    input.map((field,index)=>{
        field.map((year, count)=>{
            values[0].year1 += year.year1=== undefined || year.year1=== "" ?0:parseFloat(year.year1);
            values[1].year2 += year.year2=== undefined || year.year2=== "" ?0:parseFloat(year.year2);
            values[2].year3 += year.year3=== undefined || year.year3=== "" ?0:parseFloat(year.year3);
            values[3].year4 += year.year4=== undefined || year.year4=== "" ?0:parseFloat(year.year4);
            values[4].year5 += year.year5=== undefined || year.year5=== "" ?0:parseFloat(year.year5)
        })
    })
    return [values]
}

const mapDispatchToProps = {
  fetchFinalcialsDetails,
  updateFinalcialsDetails
};

UpdateFinancials = reduxForm({
  form: 'financialsUpdateForm',
  destroyOnUnmount: false,
  enableReinitialize : true
})(UpdateFinancials)


const selector = formValueSelector('financialsUpdateForm');
UpdateFinancials = connect(
    (state,props) =>{
        const Cash = selector(state, 'Cash');
        const AccountsReceivable = selector(state, 'AccountsReceivable');
        const Inventory = selector(state, 'Inventory');
        const OtherCurrentAssets = selector(state, 'OtherCurrentAssets');
        const AccountsPayable = selector(state, 'AccountsPayable');
        const LineOfCredit = selector(state, 'LineOfCredit');
        const CurrentPeriodPrincipal = selector(state, 'CurrentPeriodPrincipal');
        const OtherCurrentLiabilities = selector(state, 'OtherCurrentLiabilities');

        const TotalCurrentAssets = sum(!Cash?[]:Cash, !AccountsReceivable?[]:AccountsReceivable, !Inventory?[]:Inventory, !OtherCurrentAssets?[]:OtherCurrentAssets);
        const TotalCurrentLiabilities = sum(!AccountsPayable?[]:AccountsPayable, !LineOfCredit?[]:LineOfCredit, !CurrentPeriodPrincipal?[]:CurrentPeriodPrincipal, !OtherCurrentLiabilities?[]:OtherCurrentLiabilities);
        let buyerName=""
        let statementQuality ="";
        if (props.history.location.params !== undefined){
          buyerName = props.history.location.params.buyerName 
          statementQuality = props.history.location.params.statementQuality
        }
        if (state.auth.financialDetails !== undefined && state.auth.financialDetails.Cash !== undefined){
        return{
            TotalCurrentLiabilities,
            TotalCurrentAssets,
            initialValues:{
                buyerName: buyerName,
                statementQuality:statementQuality,
                Cash: state.auth.financialDetails.Cash,
                AccountsReceivable:state.auth.financialDetails.AccountsReceivable,
                Inventory:state.auth.financialDetails.Inventory,
                OtherCurrentAssets:state.auth.financialDetails.OtherCurrentAssets,
                FixedAssets:state.auth.financialDetails.FixedAssets,
                OtherNonCurrentAssets:state.auth.financialDetails.OtherNonCurrentAssets,
                Intangibles:state.auth.financialDetails.Intangibles,
                TotalAssets:state.auth.financialDetails.TotalAssets,
                AccountsPayable:state.auth.financialDetails.AccountsPayable,
                LineOfCredit:state.auth.financialDetails.LineOfCredit,
                CurrentPeriodPrincipal:state.auth.financialDetails.CurrentPeriodPrincipal,
                OtherCurrentLiabilities:state.auth.financialDetails.OtherCurrentLiabilities,
                LongTermLiabilities: state.auth.financialDetails.LongTermLiabilities
                // TotalCurrentAssets,
                // TotalCurrentLiabilities
            }
        }
      }else{
        return {TotalCurrentLiabilities,
        TotalCurrentAssets}
      }
    },
    mapDispatchToProps
)(UpdateFinancials)

export default UpdateFinancials
