import React from 'react';
import classes from './AnswersList.module.css';
import AnswersItem from './AnswersItem/AnswersItem';

const AnswersList = (props) => {
	return (
			<ul className={classes['AnswersList']}>
				{props.answers.map( (answer, i) => (
					<AnswersItem
						key={answer.id}
						answer={answer}
						onAnswerClick={props.onAnswerClick}
						state={props.state ? props.state[answer.id] : null}
					/>
				))}
			</ul>
	);
};

export default AnswersList;