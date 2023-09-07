import {fork} from 'redux-saga/effects';

import User from './User';

export default function* rootSaga() {
  yield fork(User);
}
