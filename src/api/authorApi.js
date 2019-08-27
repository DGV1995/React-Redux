import { handleResponse, handleError } from "./apiUtils";
import { url } from './environment/apiUrl';

const baseUrl = url + '/authors/';

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
