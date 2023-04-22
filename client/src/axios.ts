import axios from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
});

// instance.interceptors.request.use((config) => {
// 	console.log(config);
// 	config.headers!.Authorization = window.localStorage.getItem('user');
// 	return config;
// });

export default instance;
