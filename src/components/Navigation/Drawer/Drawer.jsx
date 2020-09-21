import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';


class Drawer extends PureComponent {
	renderLinks(links) {
		return links.map( (link, i) => (
			<li
				key={i}
				className={classes['DrawerList__item']}
			>
				<NavLink
					to={link.to}
					exact={link.exact}
					className={classes['DrawerList__link']}
					activeClassName={classes['DrawerList__link--active']}
					onClick={this.clickHandler}
				>
					{link.label}
				</NavLink>
			</li>
		));
	}

	clickHandler = () => {
		this.props.onClose();
	}

	render() {

		const classList = [classes['Drawer']];

		if(!this.props.isOpen) {
			classList.push(classes['Drawer--close'])
		}

		const links = [
			{ to: `/`, label: `Список`, exact: true, },
		];

		if(this.props.isAuthenticated) {
			// 
			links.push({ to: `/quiz-creator`, label: `Создать тест`, exact: false, });
			links.push({ to: `/logout`, label: `Выйти`, exact: false, });
		} else {
			// 
			links.push({ to: `/auth`, label: `Авторизация`, exact: false, });
		}

		return (
			<React.Fragment>
				<nav className={classList.join(`  `)}>
					<ul className={classes['DrawerList']}>
						{this.renderLinks(links)}
					</ul>
				</nav>
				{this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
			</React.Fragment>
		);
	}
}

export default Drawer;