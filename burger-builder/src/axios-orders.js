import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-react-burger-app-proj01.firebaseio.com/',
});

export default instance