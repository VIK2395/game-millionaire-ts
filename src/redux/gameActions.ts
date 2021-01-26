import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import firebase from '../firebaseConfig/firebaseConfig';

import { ActionTypes, IError, IConfigDataQuestion, IState } from '../types';

import {
  SET_IS_INIT_LOAD,
  SET_IS_IN_GAME_START,
  SET_IS_IN_GAME,
  SET_IS_IN_GAME_END,
  SET_IS_LOADING_GAME_CONFIG_DATA,
  SET_GAME_CONFIG_DATA,
  SET_LOAD_ERROR,
  SET_NEXT_SCORE,
  SET_SCORE_QUESTION,
  RESET_SCORE,
  SET_EARNED,
  RESET_EARNED,
  FORM_GAME_QUESTIONS,
  SET_ANSWER,
  SET_IS_CORRECT_ANSWER_SHOWN,
} from './actionTypes';

export const setIsInitLoad = (to: boolean): ActionTypes => ({
  type: SET_IS_INIT_LOAD,
  payload: to,
});

export const setIsInGameStart = (to: boolean): ActionTypes => ({
  type: SET_IS_IN_GAME_START,
  payload: to,
});

export const setIsInGame = (to: boolean): ActionTypes => ({
  type: SET_IS_IN_GAME,
  payload: to,
});

export const setIsInGameEnd = (to: boolean): ActionTypes => ({
  type: SET_IS_IN_GAME_END,
  payload: to,
});

export const setIsLoadingGameConfigData = (to: boolean): ActionTypes => ({
  type: SET_IS_LOADING_GAME_CONFIG_DATA,
  payload: to,
});

export const setGameConfigData = (data: Array<IConfigDataQuestion>): ActionTypes => ({
  type: SET_GAME_CONFIG_DATA,
  payload: data,
});

export const setLoadError = (error: IError): ActionTypes => ({
  type: SET_LOAD_ERROR,
  payload: error,
});

export const setNextScore = (): ActionTypes => ({
  type: SET_NEXT_SCORE,
});

export const setScoreQuestion = (): ActionTypes => ({
  type: SET_SCORE_QUESTION,
});

export const resetScore = (): ActionTypes => ({
  type: RESET_SCORE,
});

export const setEarned = (value: number): ActionTypes => ({
  type: SET_EARNED,
  payload: value,
});

export const resetEarned = (): ActionTypes => ({
  type: RESET_EARNED,
});

export const formGameQuestions = (): ActionTypes => ({
  type: FORM_GAME_QUESTIONS,
});

export const setAnswer = (answerId: string): ActionTypes => ({
  type: SET_ANSWER,
  payload: answerId,
});

export const setIsCorrectAnswerShown = (to: boolean): ActionTypes => ({
  type: SET_IS_CORRECT_ANSWER_SHOWN,
  payload: to,
});

export const fetchGameConfigData = (
  dispatch: ThunkDispatch<IState, unknown, ActionTypes>
): void => {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('gameConfigData').doc('docConfig');
  docRef
    .get()
    .then((doc) => {
      try {
        if (!doc.exists)
          throw new Error(
            "Oops! No 'docConfig' document in the database 'gameConfigData' collection!"
          );
        if (!doc.data()!.config)
          throw new Error("Oops! No 'config' field in the 'docConfig' document of the database!");
        return JSON.parse(doc.data()!.config);
        // return JSON.parse("{ bad json o_O }");
      } catch (error) {
        if (error.name === 'SyntaxError') {
          throw new Error("Oops! Game JSON 'config' badly formated. Please check the file!");
        } else {
          throw error;
        }
      }
    })
    .then((gameConfigData) => {
      dispatch(setGameConfigData(gameConfigData));
    })
    .finally(() => {
      dispatch(setIsLoadingGameConfigData(false));
    })
    .catch((error) => {
      dispatch(setLoadError(error));
    });
};

type ThunkType = ThunkAction<void, IState, unknown, ActionTypes>;

export const checkAnswerAndOn = (answerId: string): ThunkType => (dispatch, getState) => {
  dispatch(setAnswer(answerId));
  setTimeout(() => {
    dispatch(setIsCorrectAnswerShown(true));
    const state = getState();
    if (state.answer!.isCorrect) {
      dispatch(setEarned(state.score));
      setTimeout(() => {
        if (state.score !== state.scoreDashboard[0]) {
          dispatch(setNextScore());
          dispatch(setScoreQuestion());
        } else {
          dispatch(setIsInGame(false));
          dispatch(setIsInGameEnd(true));
        }
      }, 2000);
    } else {
      setTimeout(() => {
        dispatch(setIsInGame(false));
        dispatch(setIsInGameEnd(true));
      }, 3000);
    }
  }, 800);
};

export const resetGameData = (): ThunkType => (dispatch) => {
  dispatch(formGameQuestions());
  dispatch(resetScore());
  dispatch(setScoreQuestion());
  dispatch(resetEarned());
};
