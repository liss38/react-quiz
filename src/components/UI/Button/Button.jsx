import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
	const classList = [
		classes['Button'],
		classes[props.type]
	];

	return (
		<button
			onClick={props.onClick}
			className={classList.join(`  `)}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;