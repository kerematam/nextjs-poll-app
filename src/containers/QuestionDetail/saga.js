import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './redux';
import api from 'utils/api';

export function* getQuestionDetail({ payload }) {
  try {
    const question = yield call(api.getQuestionDetail, payload.qid);
    yield put(actions.getQuestionDetailFinished({ question }));
  } catch (err) {
    yield put(actions.getQuestionDetailFinished({ err }));
  }
}

export function* vote({ payload }) {
  try {
    const choice = yield call(api.vote, payload.url);
    yield put(actions.voteFinished({ choice }));
  } catch (err) {
    yield put(actions.voteFinished({ err }));
  }
}

export const sagas = {
  getQuestionDetail,
  vote,
};

export default function* pageSaga() {
  yield takeLatest(actions.getQuestionDetail.type, sagas.getQuestionDetail);
  yield takeLatest(actions.vote.type, sagas.vote);
}
