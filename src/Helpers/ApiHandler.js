import {Alert} from 'react-native';
import {
  kApiUrlEndpoint,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_WRONG_CREDENTIALS,
} from '../Config/Constants';

class ApiHandler {
  async get(url, data) {
    if (!url.includes('http')) {
      url = kApiUrlEndpoint + url;
    }
    const response = await fetch(url, data).then(x => x.json());
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }
  async post(url, data) {
    if (!url.includes('http')) {
      url = kApiUrlEndpoint + url;
      console.log(url);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    }).then(x => x.json());
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
