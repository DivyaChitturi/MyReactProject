import {
  kApiUrlEndpoint,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_WRONG_CREDENTIALS,
} from '../Config/Constants';

class ApiHelper {
  async post(url, data, headers) {
    if (!url.includes('http')) {
      url = kApiUrlEndpoint + url;

      console.log(url, 'apihelper');
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

  async get(url, data, headers) {
    if (!url.includes('http')) {
      url = kApiUrlEndpoint + url;
    }

    const response = await fetch(url, data).then(x => x.json());

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async delete(url, data, headers) {}
  async put(url, data, headers) {}
  async postImage(url, data, headers) {}

  handlePromise = (resolve, reject, response) => {
    if (response.error) {
      if (response.error.code === 'LOGIN_FAILED') {
        reject(ERROR_WRONG_CREDENTIALS);
      } else {
        reject(response.error);
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHelper();
