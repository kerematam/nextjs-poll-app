import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './redux';
import api from 'utils/api';

export function* getQuestions() {
  try {
    const questions = yield call(api.getQuestions);
    yield put(actions.getQuestionsFinished({ questions }));
  } catch (err) {
    yield put(actions.getQuestionsFinished({ err }));
  }
}

export function* postQuestion({ payload }) {
  const { poll } = payload;
  try {
    yield call(api.postQuestion, poll);
    yield put(actions.postQuestionFinished({ poll }));
    yield call(getQuestions);
  } catch (err) {
    yield put(actions.postQuestionFinished({ err }));
  }
}

export const sagas = {
  getQuestions,
  postQuestion,
};

export default function* pageSaga() {
  yield takeLatest(actions.getQuestions.type, sagas.getQuestions);
  yield takeLatest(actions.postQuestion.type, sagas.postQuestion);
}
