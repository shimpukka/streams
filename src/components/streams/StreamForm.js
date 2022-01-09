import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }){
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    // Redux will provide event hander and props and other useful stuff to this function
    // We just need to wire them up to the form elements by passing them in ex. {...formProps.input}
    renderInput = ({ input, label, meta })  => {
        const classes = `field ${meta.error && meta.touched ? 'error' : '' }`;
        return (
            <div className={classes}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        ); 
    };

    // this will receive form input values by redux-form
    onSubmit = (formValues) => {
       this.props.onSubmit(formValues);
    };

    render() {
        // console.log(this.props);
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <Field name="title" component={this.renderInput} label="Enter title" /> 
                <Field name="description" component={this.renderInput} label="Enter description" />
                <button className="ui primary button">Submit</button>
            </form>
        );
    }
}

// validate function
const validate = (formValues) => {
    const errors = {};

    if(!formValues.title){
        // attach error message to errors object
        errors.title = 'You must enter a title';
    }
    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate,
})(StreamForm);
