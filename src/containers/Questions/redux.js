import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import { createSlice } from '@reduxjs/toolkit';
import saga from './saga';

export const NAMESPACE = 'Questions';

export const initialState = {
  loading: { questions: false, postQuestion: false },
  questions: [],
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    getQuestions: state => {
      state.loading.questions = true;
    },
    getQuestionsFinished: (state, action) => {
      state.loading.questions = false;
      state.questions = action.payload?.questions || [];
    },
    postQuestion: state => {
      state.loading.postQuestion = true;
    },
    postQuestionFinished: state => {
      state.loading.postQuestion = false;
    },
  },
});

export const { reducer, actions } = slice;

export const useReduxInjector = () => {
  useInjectReducer({ key: NAMESPACE, reducer });
  useInjectSaga({ key: NAMESPACE, saga });
};

export const questionSelector = state => state[NAMESPACE];
