import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { defaultTo } from 'utils/helpers';
import { actions, useReduxInjector, questionDetailSelector } from './redux';

const useGetQuestionId = () => {
  const router = useRouter();
  const { qid } = router.query;
  return qid;
};

const RadioForm = ({ choices = defaultTo.arr, onChange = defaultTo.fn }) => {
  const handleClick = e => {
    onChange(e.target.value);
  };

  return (
    <form onChange={handleClick}>
      {choices?.map((item, index) => (
        <div key={item?.key || index}>
          <label>
            <input type="radio" name="form" value={item?.key} />
            {item.choice}
          </label>
        </div>
      ))}
    </form>
  );
};

RadioForm.propTypes = {
  choices: PropTypes.array,
  onChange: PropTypes.func,
};

const Poll = ({ choices = defaultTo.arr, onSubmit = defaultTo.fn }) => {
  const [url, setUrl] = useState();

  const radioProps = choices.map(item => ({ ...item, key: item.url }));
  const handleSubmit = () => {
    onSubmit(url);
  };

  return (
    <div>
      <RadioForm
        onChange={c => {
          setUrl(c);
        }}
        choices={radioProps}
      />
      <button type="button" disabled={!url} onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

Poll.propTypes = {
  choices: PropTypes.array,
  onSubmit: PropTypes.func,
};

const Results = ({ choices = defaultTo.arr }) => (
  <div>
    {choices.map(item => (
      <div key={item.url}>
        <span>{item.choice}</span>
        <span>{item.votes}</span>
      </div>
    ))}
  </div>
);

Results.propTypes = {
  choices: PropTypes.array,
};

function QuestionsPage() {
  useReduxInjector();
  const dispatch = useDispatch();
  const data = useSelector(questionDetailSelector);
  const qid = useGetQuestionId();

  useEffect(() => {
    dispatch(actions.getQuestionDetail({ qid }));
  }, []);

  const handleSubmit = url => {
    dispatch(actions.vote({ url }));
  };

  return (
    <Layout>
      <h3>{data?.question?.question}</h3>
      {!data?.voted ? (
        <Poll choices={data?.question?.choices} onSubmit={handleSubmit} />
      ) : (
        <Results choices={data?.question?.choices} />
      )}
    </Layout>
  );
}

export default QuestionsPage;
