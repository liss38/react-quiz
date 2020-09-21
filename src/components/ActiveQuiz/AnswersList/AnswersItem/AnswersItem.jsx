import React from 'react';
import classes from './AnswersItem.module.css';

const AnswersItem = (props) => {
	const itemClasses = [classes['AnswersItem']];

	if(props.state) {
		itemClasses.push(classes[props.state]);
	}

	return (
		<li
			className={itemClasses.join(`  `)}
			onClick={() => props.onAnswerClick(props.answer.id)}
		>
			{ props.answer.text }
		</li>
	);
};

export default AnswersItem;