import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './GamePage.css';
import { connect, ConnectedProps } from 'react-redux';
import ScoreList from './ScoreList';
import AnswersListContainer from './AnswersListContainer';
import { IState } from '../../types';

const GamePage: React.FC<Props> = ({ questionText, isInitLoad, isInGameEnd, isInGameStart }) => {
  const [isActive, setActiveClass] = useState(false);

  const toggleActiveClass = () => {
    setActiveClass((isActive) => !isActive);
  };

  if (isInitLoad || isInGameStart) return <Redirect to="/" />;

  if (isInGameEnd) return <Redirect to="/gameover" />;

  return (
    <div className="wrapper">
      <header className="header">
        <div
          className={`header__burger burger ${isActive ? 'active' : ''}`}
          onClick={toggleActiveClass}
        >
          <div className="burger__body">
            <span className="burger__central-line" />
          </div>
        </div>
      </header>

      <section className="content">
        <div className="content__question">
          <p>{questionText}</p>
        </div>
        <AnswersListContainer />
      </section>

      <section className={`score ${isActive ? 'active' : ''}`}>
        <ScoreList />
      </section>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  questionText: state.question ? state.question.questionText : 'loading question...',
  isInitLoad: state.redirect.isInitLoad,
  isInGameEnd: state.redirect.isInGameEnd,
  isInGameStart: state.redirect.isInGameStart,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GamePage);
