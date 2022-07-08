import axios from 'axios';

const HttpClient = axios.create({
  baseURL: 'https://recruitment-test.flip.id/',
});

HttpClient.defaults.headers.get['Content-Type'] = 'application/json';

export default HttpClient;
