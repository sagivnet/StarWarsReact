import axios from 'axios';

const server = axios.create();

export const get = function(fullUrl='https://swapi.dev/api/films/') {
    return server.get(fullUrl);
}