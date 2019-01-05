import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://MoneyTracker.firebaseio.com/'
});

export default instance;