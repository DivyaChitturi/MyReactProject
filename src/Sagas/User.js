import {take, put, call, fork} from 'redux-saga/effects';
import {userActions} from '../Features/userSlice';
import ApiHandler from '../Helpers/ApiHandler';

const {request, success, failure} = userActions;

function callGetRequest(url, data, headers) {
  return ApiHandler.get(url, data, headers);
}

function callPostRequest(url, data, headers) {
  return ApiHandler.post(url, data, headers);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(request);

    try {
      let response;
      response = yield call(callPostRequest, payload.url, payload.data);
      yield put(success(response));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchRequest);
}
