import Axios from 'axios';

const api = 'https://api.themoviedb.org/3';
const key = '6ec20725c4e1397d97a80353954d8598';

const defaultContent = {
  api_key: key,
  language: 'en-US',
};

function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

export const request = async (url, content = {}, debug = false) => {
  const obj = {...defaultContent, ...content};

  const response = await fetch(`${api}/${url}?${queryString(obj)}`);
  const data = await (debug ? response.status : response.json());

  return data;
};
