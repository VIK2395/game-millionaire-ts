import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes, IError, IConfigDataQuestion, IState, AppThunk } from '../types';
import firebase from '../firebaseConfig/firebaseConfig';
import isGameConfigDataStructureValid from '../utils/isGameConfigDataStructureValid';
import isAllScoreQuestionsAvailable from '../utils/isAllScoreQuestionsAvailable';
import {
  SET_IS_INIT_LOAD,
  SET_IS_IN_GAME_START,
  SET_IS_IN_GAME,
  SET_IS_IN_GAME_END,
  SET_IS_LOADING_GAME_CONFIG_DATA,
  SET_GAME_CONFIG_DATA,
  SET_ERROR,
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

export const setError = (error: IError): ActionTypes => ({
  type: SET_ERROR,
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
  dispatch: ThunkDispatch<IState, unknown, ActionTypes>,
  getState: () => IState
): void => {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('gameConfigData').doc('document');
  docRef
    .get()
    .then((doc) => {
      try {
        if (!doc.exists)
          throw new Error("Oops! No 'document' in the database 'gameConfigData' collection!");
        if (!doc.data()!.config)
          throw new Error("Oops! No 'config' in the 'document' of the database!");
        return JSON.parse(doc.data()!.config);
        // return JSON.parse("{ bad json o_O }");
      } catch (error) {
        if (error.name === 'SyntaxError') {
          throw new Error('Oops! The game JSON config file badly formated. Please check the file!');
        } else {
          throw error;
        }
      }
    })
    .then((gameConfigData) => {
      if (isGameConfigDataStructureValid(gameConfigData)) {
        return gameConfigData;
      }
      throw new Error('Oops! Not valid the game config data structure. Please check the data!');
    })
    .then((gameConfigData) => {
      if (isAllScoreQuestionsAvailable(getState().scoreDashboard, gameConfigData)) {
        return gameConfigData;
      }
      throw new Error(
        'Oops! Not all appropriate score questions are in the game config data. Please check the data!'
      );
    })
    .then((gameConfigData) => {
      dispatch(setGameConfigData(gameConfigData));
    })
    .catch((error) => {
      dispatch(setError(error));
    })
    .finally(() => {
      dispatch(setIsLoadingGameConfigData(false));
    });
};

export const checkAnswerAndOn = (answerId: string): AppThunk => (dispatch, getState) => {
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

// for such a way of thunk declaration to work, mapDispatchToProps requires to be declared as function
// for this reason Redux recommends to use thunk creators instead
// see StartPage comments
export const resetGameData = (dispatch: ThunkDispatch<IState, unknown, ActionTypes>): void => {
  dispatch(formGameQuestions());
  dispatch(resetScore());
  dispatch(setScoreQuestion());
  dispatch(resetEarned());
};

// for this case, thunk creator would be as follows
// export const resetGameData = ():ThunkType => (dispatch) => {
//   dispatch(formGameQuestions());
//   dispatch(resetScore());
//   dispatch(setScoreQuestion());
//   dispatch(resetEarned());
// };
