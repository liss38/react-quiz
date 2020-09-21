import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../store/actions/quiz';


class QuizList extends PureComponent {

	renderQuizes() {
		return this.props.quizes.map( (quiz, i) => {
			return (
				<li
					key={quiz.id}
				>
					<NavLink to={`/quiz/${quiz.id}`}>
						{quiz.name}
					</NavLink>
				</li>
			);
		});
	}

	componentDidMount() {
		this.props.fetchQuizes();
	}

	render() {
		return (
			<div className={classes['QuizList']}>
				<div>
					<h1>Список тестов {`${!this.props.isLoaded}`} {this.props.quizes.length}</h1>
					{!this.props.isLoaded && this.props.quizes.length !== 0
						? <Loader /> 
						: (
							<ul>
								{ this.renderQuizes() }
							</ul>
						)
					}
					
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	// функция mapStateToProps, которая принимает в себя стэйт 
	// и должна вернуть новый объект

	return {
		quizes: state.quiz.quizes,
		isLoaded: state.quiz.isLoaded,
	}
}

function mapDispatchToprops(dispatch) {
	// функция mapDispatchToprops, которая принимает параметр dispatch 
	// и должна вернуть новый объект
	// мы здесь будем говорить компоненту о том, что ему нужно будет 
	// загрузить какой-то набор "тестов/вопросов"

	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}


export default connect(mapStateToProps, mapDispatchToprops)(QuizList);