import {Alert} from 'react-native';
import {
  kApiUrlEndpoint,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_WRONG_CREDENTIALS,
} from '../Config/Constants';

class ApiHandler {
  async get(url, data) {
    const completeUrl = kApiUrlEndpoint + url;
    const response = await fetch(completeUrl, data).then(x => x.json());

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async post(url, data) {
    const response = await fetch(url, data).then(x => x.json());

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async delete() {}
  async put() {}

  handlePromise = (resolve, reject, response) => {
    if (response.error) {
      if (response.error.code === 'LOGIN_FAILED') {
        reject(ERROR_WRONG_CREDENTIALS); //
      } else if (response.error.code === 'NETWORK_ISSUE') {
        reject(ERROR_NETWORK_NOT_AVAILABLE);
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHandler();
