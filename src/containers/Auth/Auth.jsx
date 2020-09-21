import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import { auth } from '../../store/actions/auth';


class Auth extends PureComponent {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: ``,
				type: `email`,
				label: `Email`,
				errorMessage: `Введите корректный email`,
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: ``,
				type: `password`,
				label: `Пароль`,
				errorMessage: `Введите корректный пароль`,
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	}

	loginHandler = () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			true
		);
	}
	
	registerHandler = () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			false
		);
	}

	submitHandler = (evt) => {
		evt.preventDefault();
	}

	validateControl(value, validation) {
		if(!validation) {
			return true;
		}

		let isValid = true;

		if(validation.required) {
			isValid = value.trim() !== `` && isValid;
		}

		if(validation.email) {
			isValid = is.email(value) && isValid;
		}
		
		if(validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}

		return isValid;
	}

	onChangeHandler = (evt, controlName) => {
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}; // клон объекта во избежание ссылочного типа
		
		control.value = evt.target.value;
		control.touched = true;
		control.valid = this.validateControl(control.value, control.validation);

		formControls[controlName] = control;

		let isFormValid = true;
		Object.keys(formControls).forEach( (key) => {
			isFormValid = formControls[key].valid;
		});

		this.setState({ isFormValid, formControls });
	}

	renderInputs() {
		const inputs = Object.keys(this.state.formControls).map( (key, i) => {
			const input = this.state.formControls[key];

			return (
				<Input
					key={`${key}-${i}`}
					type={input.type}
					value={input.value}
					valid={input.valid}
					touched={input.touched}
					label={input.label}
					errorMessage={input.errorMessage}
					shouldValidate={!!input.validation}
					onChange={(evt) => this.onChangeHandler(evt, key)}
				/>
			);
		})

		return inputs;
	}

	render() {
		return (
			<div className={classes[`Auth`]}>
				<div className={classes[`auth-container`]}>
					<h1 className={classes[`auth-heading`]}>Авторизация</h1>

					<form className={classes[`auth-form`]} onSubmit={this.submitHandler}>
						{this.renderInputs()}

						<Button
							type="success"
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}
						>
							Войти
						</Button>
						<Button
							type="primary"
							onClick={this.registerHandler}
							disabled={!this.state.isFormValid}
						>
							Зарегистрироваться
						</Button>
					</form>
				</div>
			</div>
		);
	}
};



function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
}



export default connect(null, mapDispatchToProps)(Auth);