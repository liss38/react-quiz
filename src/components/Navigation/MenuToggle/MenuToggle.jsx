import React from 'react';
import classes from './MenuToggle.module.css';

const MenuToggle = (props) => {
	const classList = [
		classes['MenuToggle'],
		`fa`,
	];

	if(props.isOpen) {
		classList.push(`fa-times`);
		classList.push(classes['MenuToggle--open']);
	} else {
		classList.push(`fa-bars`);
	}

	return (
		<i
			className={classList.join(`  `)}
			onClick={props.onToggle}
		/>
	);
};

export default MenuToggle;