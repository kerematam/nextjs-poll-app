import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import { createSlice } from '@reduxjs/toolkit';
import saga from './saga';

export const NAMESPACE = 'QuestionDetail';

export const initialState = {
  loading: { getQuestionDetail: false, vote: false },
  question: {},
  voted: false,
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    getQuestionDetail: state => {
      state.loading.getQuestionDetail = true;
    },
    getQuestionDetailFinished: (state, action) => {
      state.loading.getQuestionDetail = false;
      state.question = action.payload?.question || {};
    },
    vote: state => {
      state.loading.vote = true;
    },
    voteFinished: (state, { payload }) => {
      state.loading.vote = false;
      if (!payload.err) {
        state.voted = true;
        const index = state.question.choices.findIndex(({ url }) => url === payload.choice.url);
        state.question.choices[index] = payload.choice;
      }
    },
  },
});

export const { reducer, actions } = slice;

export const useReduxInjector = () => {
  useInjectReducer({ key: NAMESPACE, reducer });
  useInjectSaga({ key: NAMESPACE, saga });
};

export const questionDetailSelector = state => state[NAMESPACE];
