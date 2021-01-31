import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { checkAnswerAndOn } from '../../redux/gameActions';
import AnswerCell from './AnswerCell';
import { IState } from '../../types';

const AnswersList: React.FC<Props> = ({
  setIsDisabled,
  answers,
  checkAnswerAndOn,
  isCorrectAnswerShown,
}) => {
  useEffect(() => {
    setIsDisabled(false);
  }, [answers, setIsDisabled]);

  return (
    <ul className="content__answers-list">
      {answers.map((answer, index) => (
        <AnswerCell
          key={answer.answerId}
          index={index}
          answer={answer}
          isCorrectAndShown={answer.isCorrect && isCorrectAnswerShown}
          setIsDisabled={setIsDisabled}
          checkAnswerAndOn={checkAnswerAndOn}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state: IState) => ({
  answers: state.question ? state.question.answers : [],
  isCorrectAnswerShown: state.question ? state.question.isCorrectAnswerShown : false,
});

const mapDispatchToProps = {
  checkAnswerAndOn,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = {
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = PropsFromRedux & OwnProps;

export default connector(React.memo(AnswersList));
