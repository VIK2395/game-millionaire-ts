import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import logoHand from '../../assets/logoHand.svg';
import style from './StartPage.module.css';
import ErrorMessage from '../common/errorMessage/ErrorMessage';
import { ActionTypes, IState } from '../../types';
import {
  setIsInitLoad,
  resetGameData,
  setIsInGame,
  setIsInGameEnd,
  setIsInGameStart,
} from '../../redux/gameActions';

const StartPage: React.FC<Props> = ({
  isInGame,
  isInGameEnd,
  error,
  setIsInitLoad,
  resetGameData,
  setIsInGame,
  setIsInGameEnd,
  setIsInGameStart,
}) => {
  useEffect(() => {
    setIsInitLoad(false);
  }, [setIsInitLoad]); // runs only first time

  const onStartClicked = () => {
    resetGameData();
    setIsInGame(true);
    setIsInGameEnd(false);
    setIsInGameStart(false);
  };

  if (isInGame) return <Redirect to="/game" />;

  if (isInGameEnd) return <Redirect to="/gameover" />;

  if (error !== null) return <ErrorMessage error={error} />;

  return (
    <div className={style.wrapper}>
      <div className={`${style.content} ${style.content_portrait}`}>
        <div className={style['content__portrait-block']}>
          <img
            className={`${style.content__logo} ${style.logo}`}
            draggable="false"
            width="198"
            height="156"
            src={logoHand}
            alt="logo_hand"
          />
          <p className={style.content__text}>
            Хто хоче стати
            <br />
            мільйонером?
          </p>
        </div>
        <Link
          to="/game"
          className={`${style['content__link-button']} ${style['link-button']}`}
          onClick={onStartClicked}
        >
          Старт
        </Link>
      </div>
      <div className={`${style.content} ${style.content_landscape}`}>
        <img
          className={`${style.content__logo} ${style.logo}`}
          draggable="false"
          width="198"
          height="156"
          src={logoHand}
          alt="logo_hand"
        />
        <div className={style['content__landscape-block']}>
          <p className={style.content__text}>
            Хто хоче стати
            <br />
            мільйонером?
          </p>
          <Link
            to="/game"
            className={`${style['content__link-button']} ${style['link-button']}`}
            onClick={onStartClicked}
          >
            Старт
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  isInGame: state.redirect.isInGame,
  isInGameEnd: state.redirect.isInGameEnd,
  error: state.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, unknown, ActionTypes>) => ({
  setIsInitLoad: (to: boolean) => dispatch(setIsInitLoad(to)),
  resetGameData: () => dispatch(resetGameData),
  setIsInGame: (to: boolean) => dispatch(setIsInGame(to)),
  setIsInGameEnd: (to: boolean) => dispatch(setIsInGameEnd(to)),
  setIsInGameStart: (to: boolean) => dispatch(setIsInGameStart(to)),
});

// passing mapDispatchToProps as an object works only with thunk creators, not plain thunk!!!
// see gameActions comments
// const mapDispatchToProps = {
//   setIsInitLoad,
//   resetGameData,
//   setIsInGame,
//   setIsInGameEnd,
//   setIsInGameStart,
// }

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(StartPage);
