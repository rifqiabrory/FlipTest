import axios from 'axios';

/**
 * Axios Config's
 */
const HttpClient = axios.create({
  baseURL: 'https://recruitment-test.flip.id/',
});

/**
 * Intercept's Header
 */
HttpClient.defaults.headers.get['Content-Type'] = 'application/json';

export default HttpClient;
