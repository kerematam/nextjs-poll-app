import React, { useState, useRef } from 'react';
import { defaultTo } from 'utils/helpers';
import styles from './CreatePoll.module.css';

const validatePoll = {
  question: {
    checkEmpty: value => !(value?.length > 0) && 'Question should not be empty',
  },
  choice: {
    checkEmpty: value => !(value?.length > 0) && 'Choice should not be empty',
    checkRepeats: (value, list) => list.find(i => i === value) && 'Choice should not be same',
  },
  choices: {
    checkMultiple: value => !(value?.length > 1) && 'There should be atleast two choices',
  },
};

const CreatePoll = ({ onSubmit = defaultTo.fn }) => {
  const [choices, setChoices] = useState(defaultTo.arr);

  const questionRef = useRef();
  const choiceRef = useRef();

  const handleSubmit = () => {
    const question = questionRef.current.value;
    const err = validatePoll.question.checkEmpty(question) || validatePoll.choices.checkMultiple(choices);

    if (!err) {
      onSubmit({ question, choices });
    } else {
      alert(err);
    }
  };

  const handleAddChoice = () => {
    const choice = choiceRef.current.value;
    const err = validatePoll.choice.checkEmpty(choice) || validatePoll.choice.checkRepeats(choice, choices);
    if (!err) {
      setChoices([...choices, choice]);
    } else {
      alert(err);
    }
  };

  const handleDeleteChoice = choice => {
    const newChoices = choices.filter(c => c !== choice);
    setChoices(newChoices);
  };

  return (
    <div className={styles.pollContainer}>
      <label>
        Question:
        <input ref={questionRef} type="text" />
      </label>
      <div>
        <label>
          Add Choice :
          <input ref={choiceRef} type="text" />
          <button type="button" onClick={handleAddChoice}>
            Add
          </button>
        </label>
      </div>
      {choices.map(choice => (
        <div key={choice}>
          <label>
            <span>{choice}</span>
            <button type="button" onClick={() => handleDeleteChoice(choice)}>
              Delete
            </button>
          </label>
        </div>
      ))}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreatePoll;
