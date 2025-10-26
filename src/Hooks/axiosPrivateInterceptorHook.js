import axios from "../API/axios";
import { useContext, useLayoutEffect } from "react";
import AuthConext from "../Context/authProvider.js";

export default function useInterceptorHook() {
	const { accessToken, setToken } = useContext(AuthConext);
	useLayoutEffect(() => {
		//changes requeset header with the access token
		const authInterceptor = axios.interceptors.request.use(
			(config) => {
				if (!config.headers.Authorization) {
					config.headers.Authorization = `Bearer ${accessToken}`;
				}
				//console.log('interceptor called', config)
				return config;
			},
			(error) => Promise.reject(error)
		);

		const refreshInterceptor = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				let originalReq = error.config;
				//console.log(error)
				if (error.response.status == 401) {
					//console.log('error being called')
					try {
						if (originalReq.retry) return;

						//refrsh token if request fails
						let newToken = await axios.post(
							"http://ec2-3-135-19-176.us-east-2.compute.amazonaws.com:8080/refresh"
						);
						//console.log(newToken.data.accessToken, 'called from axios')
						setToken(newToken.data.accessToken);

						originalReq.headers.Authorization = `Bearer ${newToken.data.accessToken}`;
						originalReq.retry = true;
						return axios(originalReq);
					} catch (e) {
						console.log(e, "refreshtoken error");
						setToken(null);
						return Promise.reject(error);
					}
				}
				return Promise.reject(error);
			}
		);
		return () => {
			axios.interceptors.request.eject(authInterceptor);
			axios.interceptors.response.eject(refreshInterceptor);
		};
	}, [accessToken]);
	return axios;
}
