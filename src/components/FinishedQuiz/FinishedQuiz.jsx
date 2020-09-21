import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = (props) => {
	const succesCount = Object.keys(props.results).reduce( (total, key) => {

		return props.results[key] === `success` ? total + 1 : total;
	}, 0);

	return (
		<div className={classes['FinishedQuiz']}>
			<h1>Finished!</h1>
			<ul>
				{props.quiz.map( (quizItem, i) => {
					const classList = [
						classes['FinishedQuiz-icon'],
						`fa`,
						props.results[quizItem.id] === `success` ? `fa-check` : `fa-times`,
						props.results[quizItem.id] === `success` ? classes['FinishedQuiz-icon--success'] : classes['FinishedQuiz-icon--error'],
					];

					return (
						<li key={i}>
							<strong>{i + 1}.</strong>&nbsp;
							{quizItem.question}
							<i className={classList.join(`  `)} />
						</li>
					);
				})}
			</ul>

			<p>Правильно {succesCount} из {props.quiz.length}</p>

			<div>
				<Button onClick={props.onRetry} type="primary">Повторить</Button>
				<Link to="/">
					<Button type="success">Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	);
};

export default FinishedQuiz;