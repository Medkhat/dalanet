import React from 'react'
import { reduxForm } from 'redux-form'
import { ValidateElement, createField } from '../common/FormControls/FormControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/reducers/authReducer'
import { Redirect } from 'react-router-dom'


let Input = ValidateElement("input")

const LoginForm =  reduxForm({form: 'login'})(({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div style={{color: 'red'}}>{error}</div>
            {createField("text", "Email", "email", Input, [required], "")}
            {createField("password", "Password", "password", Input, [required], "")}
            {createField("checkbox", "", "rememberMe", Input, [], "Remember me")}
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
})

const Login = (props) => {

    const onFormSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) 
        return <Redirect to={'/profile'}/>

    return (
        <div>
             <h1>LOGIN PAGE</h1>
             <LoginForm onSubmit={onFormSubmit} />
        </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, { login })(Login)