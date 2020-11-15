import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/Table';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/Layout';
import { actions, useReduxInjector, questionSelector } from './redux';
import Link from 'next/link';
import CreatePoll from './components/CreatePoll';

const formatDate = dateStr => new Date(dateStr).toLocaleString();

function QuestionCell({ row }) {
  return (
    <Link href={row?.url}>
      <a>{row?.question}</a>
    </Link>
  );
}

QuestionCell.propTypes = {
  row: PropTypes.object,
};

function DateCell({ row }) {
  return formatDate(row.published_at);
}

DateCell.propTypes = {
  row: PropTypes.object,
};

export function QuestionsPage() {
  useReduxInjector();
  const dispatch = useDispatch();
  const data = useSelector(questionSelector);

  useEffect(() => {
    dispatch(actions.getQuestions());
  }, []);

  const handleSubmit = poll => {
    dispatch(actions.postQuestion({ poll }));
  };

  const columns = [
    {
      field: 'question',
      headerName: 'Question',
      renderCell: QuestionCell,
    },
    {
      field: 'published_at',
      headerName: 'Publish Time',
      renderCell: DateCell,
    },
  ];

  return (
    <Layout>
      <Table rowKey={'url'} columns={columns} rows={data?.questions} />
      <CreatePoll onSubmit={handleSubmit} />
    </Layout>
  );
}

export default QuestionsPage;
