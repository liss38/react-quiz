import { 
	FETCH_QUIZES_START, 
	FETCH_QUIZES_SUCCESS, 
	FETCH_QUIZES_ERROR, 
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY
 } from '../actions/actionTypes';

const initialState = {
	isLoaded: false,
	quizes: [],
	error: null,
	results: {}, // { [id]: `success` | `error`}
	isFinished: false,
	activeQuestion: 0,
	answerState: null, // { [id]: 'success' | 'error' }
	quiz: null,
}

export default function quizReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_QUIZES_START:
			return {
				...state,
				isLoaded: false,
			};

		case FETCH_QUIZES_SUCCESS:
			return {
				...state,
				isLoaded: true,
				quizes: action.payload,
			};

		case FETCH_QUIZES_ERROR:
			return {
				...state,
				isLoaded: true,
				error: action.payload,
			};

		case FETCH_QUIZ_SUCCESS:
			return {
				...state,
				isLoaded: true,
				quiz: action.payload,
			};

		case QUIZ_SET_STATE:
			return {
				...state,
				...action.payload,
			};

		case FINISH_QUIZ:
			return {
				...state,
				isFinished: true,
			};

		case QUIZ_NEXT_QUESTION:
			return {
				...state,
				...action.payload,
			};

		case QUIZ_RETRY:
			return {
				...state,
				results: {},
				isFinished: false,
				activeQuestion: 0,
				answerState: null,
			};

		default:
			return state;
	}
}