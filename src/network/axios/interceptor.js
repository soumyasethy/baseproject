import axios from './axiosInstance';
import {inject, observer} from 'mobx-react';
import {storeType} from '../../store/storeType';

const SetupInterceptor = props => {
  console.warn('****token****', props.userStore.token);
  // Add a request interceptor
  axios.interceptors.request.use(
    config => {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${props.userStore.token}`;
      return config;
    },
    error => {
      // Do something with request error
      //console.warn('Request Error-->', JSON.stringify(error));
      //return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    response => {
      // Do something with response data
      //console.warn("Response-->", response);
      return response;
    },
    error => {
      // Do something with response error
      //console.warn('Response Error-->', JSON.stringify(error));
      return Promise.reject(error);
    },
  );
};

export default inject(storeType.userStore)(observer(SetupInterceptor));
