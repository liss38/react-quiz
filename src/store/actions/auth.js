// @help:  https://firebase.google.com/docs/reference/rest/auth?hl=ru#section-sign-in-email-password
// @help: https://firebase.google.com/docs/reference/rest/auth?hl=ru#section-create-email-password
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCI96Y0ZnS2Jpm6qsr43wl-326sIjWCpbo
/*
	email	            string	   The email for the user to create.
	password	        string	   The password for the user to create.
	returnSecureToken	boolean	   Whether or not to return an ID and refresh token. Should always be true.
*/

import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';



export function auth(email, password, isLogin) {
	return async (dispatch) => {
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD33lqisciiLrNlutfPCVOe9EeHrSwz1gU`;
		
		if(isLogin) { // если авторизация
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD33lqisciiLrNlutfPCVOe9EeHrSwz1gU`;
		}

		const response = await axios.post(url, authData);
		const data = response.data;

		const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

		// сохранить токен сессии, id юзера и срок хранения сессии в локал сторадже
		localStorage.setItem(`token`, data.idToken);
		localStorage.setItem(`userId`, data.userId);
		localStorage.setItem(`expirationDate`, expirationDate);

		dispatch(authSuccess(data.idToken));
		dispatch(autoLogout(data.expiresIn));
	}
}



export function authSuccess(token) {
	return {
		type: AUTH_SUCCESS,
		payload: token,
	}
}

export function logout() {
	// удалить из localStorage информацию о сессии
	localStorage.removeItem(`token`);
	localStorage.removeItem(`userId`);
	localStorage.removeItem(`expirationDate`);

	return {
		type: AUTH_LOGOUT,
	}
}

export function autoLogout(time) {
	return (dispatch) => {
		setTimeout( () => {
			dispatch(logout());
		}, time * 1000);
	}
}

export function autoLogin() {
	return (dispatch) => {
		const token = localStorage.getItem(`token`);

		if(!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem(`expirationDate`));
			if(expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(autoLogout( (expirationDate.getTime() - (new Date).getTime()) / 1000 ));
			}
		}
	}
}