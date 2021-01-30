import { ThunkAction } from 'redux-thunk';
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
} from './redux/actionTypes';

// store
export interface IAnswer {
  answerId: string;
  answerText: string;
  isCorrect: boolean;
}

export interface IQuestion {
  isCorrectAnswerShown: boolean;
  questionText: string;
  answers: IAnswer[];
}

export interface IGameQuestion {
  questionScore: number;
  question: {
    questionText: string;
    answers: IAnswer[];
  };
}

export interface IConfigDataQuestion {
  questionScore: number;
  questions: [
    {
      questionText: string;
      answers: IAnswer[];
    }
  ];
}

export interface IError {
  name: string;
  message: string;
  stack?: string;
}

export interface IRedirect {
  isInitLoad: boolean;
  isInGameStart: boolean;
  isInGame: boolean;
  isInGameEnd: boolean;
}

export interface IState {
  redirect: IRedirect;
  isLoadingGameConfigData: boolean;
  loadError: IError | null;
  score: number;
  earned: number;
  answer: IAnswer | null;
  question: IQuestion | null;
  scoreDashboard: number[];
  gameQuestions: IGameQuestion[];
  gameConfigData: IConfigDataQuestion[];
}

// actions
interface ISetIsInitLoad {
  type: typeof SET_IS_INIT_LOAD;
  payload: boolean;
}

interface ISetIsInGameStart {
  type: typeof SET_IS_IN_GAME_START;
  payload: boolean;
}

interface ISetIsInGame {
  type: typeof SET_IS_IN_GAME;
  payload: boolean;
}

interface ISetIsInGameEnd {
  type: typeof SET_IS_IN_GAME_END;
  payload: boolean;
}

interface ISetIsLoadingGameConfigData {
  type: typeof SET_IS_LOADING_GAME_CONFIG_DATA;
  payload: boolean;
}

interface ISetGameConfigData {
  type: typeof SET_GAME_CONFIG_DATA;
  payload: IConfigDataQuestion[];
}

interface ISetLoadError {
  type: typeof SET_LOAD_ERROR;
  payload: IError;
}

interface ISetNextScore {
  type: typeof SET_NEXT_SCORE;
}

interface ISetScoreQuestion {
  type: typeof SET_SCORE_QUESTION;
}

interface IResetScore {
  type: typeof RESET_SCORE;
}

interface ISetEarned {
  type: typeof SET_EARNED;
  payload: number;
}

interface IResetEarned {
  type: typeof RESET_EARNED;
}

interface IFormGameQuestions {
  type: typeof FORM_GAME_QUESTIONS;
}

interface ISetAnswer {
  type: typeof SET_ANSWER;
  payload: string;
}

interface ISetIsCorrectAnswerShown {
  type: typeof SET_IS_CORRECT_ANSWER_SHOWN;
  payload: boolean;
}

export type ActionTypes =
  | ISetIsInitLoad
  | ISetIsInGameStart
  | ISetIsInGame
  | ISetIsInGameEnd
  | ISetIsLoadingGameConfigData
  | ISetGameConfigData
  | ISetLoadError
  | ISetNextScore
  | ISetScoreQuestion
  | IResetScore
  | ISetEarned
  | IResetEarned
  | IFormGameQuestions
  | ISetAnswer
  | ISetIsCorrectAnswerShown;

// thunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IState, unknown, ActionTypes>;
