import React from 'react';
import classes from './Input.module.css';


function isInvalid({valid, touched, shouldValidate}) {
	return !valid && shouldValidate && touched;
}

const Input = (props) => {
	const inputType = props.type || `text`;
	const classList = [classes[`Input`]]
	const htmlFor = `${inputType}-${Math.random()}`;

	if(isInvalid(props)) {
		classList.push(classes[`invalid`]);
	}

	return (
		<div className={classList.join(`  `)}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				id={htmlFor}
				type={inputType}
				value={props.value}
				onChange={props.onChange}
			/>
			{isInvalid(props) && <span>{props.errorMessage || `Введите верное значение`}</span>}
		</div>
	);
};

export default Input;