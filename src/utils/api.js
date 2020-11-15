import request from 'utils/request';

const BASE_URL = 'https://polls.apiblueprint.org';

const getQuestions = () => request(BASE_URL + '/questions');
const getQuestionDetail = qid => request(BASE_URL + '/questions/' + qid);
const vote = url => request(BASE_URL + url, { method: 'POST' });
const postQuestion = poll => request(BASE_URL + '/questions', { method: 'POST', body: JSON.stringify(poll) });

const api = {
  getQuestions,
  getQuestionDetail,
  vote,
  postQuestion,
};

export default api;
