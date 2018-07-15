import axios from 'axios';

export const ajaxGet = url => axios.get(url);

export const ajaxDelete = url => axios.delete(url);

export const ajaxCreate = (url, data) => axios.post(url, data);
