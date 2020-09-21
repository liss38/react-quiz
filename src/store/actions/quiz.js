import { 
	FETCH_QUIZES_START, 
	FETCH_QUIZES_SUCCESS, 
	FETCH_QUIZES_ERROR, 
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY
 } from './actionTypes';

import axios from '../../axios/axios-quiz';

export function fetchQuizes() {
	// fetchQuizes является асинхронным событием, 
	// поэтому он будет нам возвращать новую функцию,
	// которая принимает в свой параметр dispatch
	
	return async (dispatch) => {
		// (1) Какие экшн криэйторы нам нужно диспатчить
		// (2) Для начала нужно задиспатчить ф-ю fetchQizesStart, т.е. сообщить о том, что что-то начало загружаться
		dispatch(fetchQuizesStart());
		try {
			const response = await axios.get(`/quizes.json`) 
			const quizes = [];

			Object.keys(response.data).forEach( (quizKey, i) => quizes.push({
				id: quizKey,
				name: `Тест №${i + 1}`,
			}) );

			// (3) fetchQuizesSuccess, задиспатчить экшн-криэйтор, который сообщает о том, что загрузилось то, что ждали
			// и в этот экшн-криэйтор в качестве payload мы передадим массив с quizes
			dispatch(fetchQuizesSuccess(quizes))
		} catch(err) {
			// (4) В случае если ошибка, будем диспатчить экшн-криэйтор fetchQuizesError
			dispatch(fetchQuizesError(err));
		}
	}
}

export function fetchQuizById(id) {
	// будет возвращать асинхронную функцию с диспатчем
	// в этой функции логика загрузки определенного теста по переданному `id`
	return async (dispatch) => {
		dispatch(fetchQuizesStart());
		try {
			const response = await axios.get(`quizes/${id}.json`);
			const quiz = response.data;
			
			dispatch(fetchQuizSuccess(quiz));
		} catch(err) {
			dispatch(fetchQuizesError(err));
		}
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		payload: {
			answerState,
			results,
		},
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ
	}
}

export function quizNextQuestion(activeQuestion, answerState) {
	return {
		type: QUIZ_NEXT_QUESTION,
		payload: {
			activeQuestion,
			answerState,
		}
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY,
	}
}

export function quizAnswerClick(answerId) {
	// в этот метод перенести всю логику по обработке клика по варианту ответа в тесте
	// redux-thunk предусмотрел возможность получить стэйт в возвращаемой функции,
	// во второй параметр передаётся функция getState

	return (dispatch, getState) => {
		const state = getState().quiz; // 


		console.log(`onAnswerClickHandler  ::  `, answerId, state);

		if(state.answerState) {
			const key = Object.keys(state.answerState);

			if(state.answerState[key] === `success`) {
				return
			}
		}

		const question = state.quiz[state.activeQuestion];
		const results = state.results;

		if(question.rightAnswerId === answerId) {
			if(!state.results[question.id]) {
				results[question.id] = `success`;
			}

			dispatch(quizSetState({[answerId]: 'success'}, results) );
		} else {
			results[question.id] = `error`;
			dispatch(quizSetState({ [answerId]: `error` }, results));
		}

		const isQuizFinished = (state.activeQuestion + 1 === state.quiz.length);

		const timeout = window.setTimeout(() => {
			if(isQuizFinished) {
				dispatch(finishQuiz());
			} else {
				const nextActiveQuestion = state.activeQuestion + 1;
				const answerState = null;

				dispatch(quizNextQuestion(nextActiveQuestion, answerState));
			}

			window.clearTimeout(timeout);
		}, 700);
	}
}


export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START,
	}
}
export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		payload: quizes,
	}
}
export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		payload: quiz,
	}
}
export function fetchQuizesError(err) {
	return {
		type: FETCH_QUIZES_ERROR,
		payload: err,
	}
}
