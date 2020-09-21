import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import Loader from '../../components/UI/Loader/Loader';
import { createControl, validate, validateForm } from '../../form/form-framework';
import Auxiliary from '../../hocs/Auxiliary/Auxiliary';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';


function createControlOption(number) {
	return createControl({
		id: number,
		label: `Вариант ${number}`,
		errorMessage: `Ответ не может быть пустым`,
	}, { required: true });
}

function createFormControls() {
	return {
		question: createControl({
			label: `Введите вопрос`,
			errorMessage: `Вопрос не может быть пустым`,
		}, { required: true }),
		option1: createControlOption(1),
		option2: createControlOption(2),
		option3: createControlOption(3),
		option4: createControlOption(4),
	};
}

class QuizCreator extends PureComponent {

	state = {
		rightAnswerId: 1,
		formControls: createFormControls(),
		isFormValid: false,
	}

	submitHandler = (evt) => {
		evt.preventDefault();
	}

	addQustionHandler = (evt) => {
		evt.preventDefault();

		const {
			question,
			option1,
			option2,
			option3,
			option4,
		} = this.state.formControls;

		const questionItem = {
			id: this.props.quiz.length + 1,
			question: question.value,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id, },
				{ text: option2.value, id: option2.id, },
				{ text: option3.value, id: option3.id, },
				{ text: option4.value, id: option4.id, },
			],
		};

		this.props.createQuizQuestion(questionItem);

		// ... очищаем содержимое вопроса  в форме(= стэйте)
		this.setState({
			rightAnswerId: 1,
			formControls: createFormControls(),
			isFormValid: false,
		});
	}
	
	createQuizHandler = (evt) => {
		evt.preventDefault();

		this.setState({
			rightAnswerId: 1,
			formControls: createFormControls(),
			isFormValid: false,
			isFetching: false,
		});

		this.props.finishCreateQuiz();
	}
	
	inputChangeHandler = (value, controlName) => {
		const formControls = {...this.state.formControls};
		const control = {...formControls[controlName]};

		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);

		formControls[controlName] = control;

		let isFormValid = validateForm(formControls);

		this.setState({ formControls, isFormValid });
	}
	
	selectChangeHandler = (evt) => {
		this.setState({ rightAnswerId: +evt.target.value });
	}

	renderControls() {
		return Object.keys(this.state.formControls).map( (key, i) => {
			const control = this.state.formControls[key];

			return (
				<Auxiliary key={key + i}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={(evt) => this.inputChangeHandler(evt.target.value, key)}
					/>
					{i === 0 && <hr />}
				</Auxiliary>
			);
		});
	}

	render() {
		const select = <Select
			label="Выберите правильный ответ"
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{ value: 1, text: 1, },
				{ value: 2, text: 2, },
				{ value: 3, text: 3, },
				{ value: 4, text: 4, },
			]}
		/>;
		
		return (
			<div className={classes[`QuizCreator`]}>
				<div className={classes[`QuizCreator-container`]}>
					<h1 className={classes[`QuizCreator-heading`]}>Создание тестов</h1>

					{this.state.isFetching 
						? <Loader />
						: (
							<form className={classes[`QuizCreator-form`]} onSubmit={this.submitHandler}>
								{this.renderControls()}

								{select}

								<Button
									type="primary"
									onClick={this.addQustionHandler}
									disabled={!this.state.isFormValid}
								>
									Добавить вопрос
								</Button>

								<Button
									type="success"
									onClick={this.createQuizHandler}
									disabled={this.props.quiz.length === 0}
								>
									Создать тест
								</Button>
							</form>
						)
					}
				</div>
			</div>
			
		);
	}
}


function mapStateToProps(state) {
	return {
		quiz: state.create.quiz,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);