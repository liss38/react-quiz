import axios from 'axios';

export default axios.create({
	baseURL: `https://react-quiz-b3f05.firebaseio.com/`,
});