import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://huttenplaner.firebaseio.com/',
});

export default instance