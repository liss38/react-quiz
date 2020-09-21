import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';


class Quiz extends PureComponent {

	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.retryQuiz();
	}

	render() {
		return (
			<div className={classes['Quiz']}>
				<div className={classes['QuizWrapper']}>
					<h1>Ответьте на все вопросы</h1>
					{
						this.props.isFinished
							? <FinishedQuiz
								results={this.props.results}
								quiz={this.props.quiz}
								onRetry={this.props.retryQuiz}
							/>
							: !this.props.isLoaded || !this.props.quiz
								? <Loader />
								: <ActiveQuiz
									question={this.props.quiz[this.props.activeQuestion].question}
									answers={this.props.quiz[this.props.activeQuestion].answers}
									rightAnswerId={this.props.quiz[this.props.activeQuestion].rightAnswerId}
									onAnswerClick={this.props.quizAnswerClick}
									quizLength={this.props.quiz.length}
									answerNumber={this.props.activeQuestion + 1}
									state={this.props.answerState}
								/>
					}
				</div>
			</div>
		);
	}
}



function mapStateToProps(state) {
	return {
		isLoaded: state.quiz.isLoaded,
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: (id) => dispatch(fetchQuizById(id)),
		quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);