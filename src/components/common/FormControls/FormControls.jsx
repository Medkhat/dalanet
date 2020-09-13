import React from 'react'
import { Field } from 'redux-form';

export const ValidateElement = ValidateElement => ({ input, meta: {touched, error}, ...props }) => {
    const hasError = touched && error
    const controlStyles = hasError ? {border: `2px solid red`} : {}
    return (
        <>
            <ValidateElement {...input} {...props} style={controlStyles} />
            { hasError && <span style={{color: 'red'}}> { error } </span> }
        </>
    );
};

export const createField = (type, placeholder, name, component, validators, label) => (
    <div style={{marginBottom: 10}}>
        <Field type={type} component={component} validate={validators} name={name}  placeholder={placeholder}/> {label}
    </div>
)