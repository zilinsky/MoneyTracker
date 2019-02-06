import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://moneytracker-93fc9.firebaseio.com/'
});

export default instance;