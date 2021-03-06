import {
  SET_IS_INIT_LOAD,
  FORM_GAME_QUESTIONS,
  SET_NEXT_SCORE,
  RESET_EARNED,
  RESET_SCORE,
  SET_ANSWER,
  SET_EARNED,
  SET_GAME_CONFIG_DATA,
  SET_IS_IN_GAME,
  SET_IS_IN_GAME_END,
  SET_IS_IN_GAME_START,
  SET_ERROR,
  SET_SCORE_QUESTION,
  SET_IS_LOADING_GAME_CONFIG_DATA,
  SET_IS_CORRECT_ANSWER_SHOWN,
} from './actionTypes';

import { IState, ActionTypes } from '../types';

import shuffle from '../utils/shuffle';

const initState: IState = {
  redirect: {
    isInitLoad: true,
    isInGameStart: true,
    isInGame: false,
    isInGameEnd: false,
  },
  isLoadingGameConfigData: true,
  error: null,
  score: 500,
  earned: 0,
  answer: null,
  question: null,
  scoreDashboard: [
    1000000,
    500000,
    250000,
    125000,
    64000,
    32000,
    16000,
    8000,
    4000,
    2000,
    1000,
    500,
  ],
  gameQuestions: [],
  gameConfigData: [],
};

const gameReducer = (state = initState, action: ActionTypes): IState => {
  switch (action.type) {
    case SET_GAME_CONFIG_DATA:
      return {
        ...state,
        gameConfigData: action.payload,
      };
    case FORM_GAME_QUESTIONS:
      return {
        ...state,
        gameQuestions: state.gameConfigData.map((questionPackage) => {
          const randomIndex = Math.floor(Math.random() * questionPackage.questions.length);
          const question = questionPackage.questions[randomIndex];
          const deepCopyOfQuestion = {
            questionText: question.questionText,
            answers: question.answers.map((answer) => ({
              ...answer,
            })),
          };
          shuffle(deepCopyOfQuestion.answers);
          return {
            questionScore: questionPackage.questionScore,
            question: deepCopyOfQuestion,
          };
        }),
      };
    case SET_IS_LOADING_GAME_CONFIG_DATA:
      return {
        ...state,
        isLoadingGameConfigData: action.payload,
      };
    case SET_NEXT_SCORE: {
      const scoreIndex = state.scoreDashboard.findIndex((scoreValue) => scoreValue === state.score);
      const nextScoreIndex = scoreIndex - 1;
      const nextScoreValue = state.scoreDashboard[nextScoreIndex];
      return {
        ...state,
        score: nextScoreValue,
      };
    }
    case SET_SCORE_QUESTION: {
      const { question } = state.gameQuestions.find(
        (question) => question.questionScore === state.score
      )!;
      return {
        ...state,
        question: {
          ...question,
          isCorrectAnswerShown: false,
        },
      };
    }
    case SET_ANSWER: {
      const answer = state.question!.answers.find((answer) => answer.answerId === action.payload)!;
      return {
        ...state,
        answer,
      };
    }
    case SET_EARNED:
      return {
        ...state,
        earned: action.payload,
      };
    case RESET_SCORE:
      return {
        ...state,
        score: state.scoreDashboard[state.scoreDashboard.length - 1],
      };
    case RESET_EARNED:
      return {
        ...state,
        earned: 0,
      };
    case SET_IS_INIT_LOAD:
      return {
        ...state,
        redirect: {
          ...state.redirect,
          isInitLoad: action.payload,
        },
      };
    case SET_IS_IN_GAME:
      return {
        ...state,
        redirect: {
          ...state.redirect,
          isInGame: action.payload,
        },
      };
    case SET_IS_IN_GAME_END:
      return {
        ...state,
        redirect: {
          ...state.redirect,
          isInGameEnd: action.payload,
        },
      };
    case SET_IS_IN_GAME_START:
      return {
        ...state,
        redirect: {
          ...state.redirect,
          isInGameStart: action.payload,
        },
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_IS_CORRECT_ANSWER_SHOWN:
      return {
        ...state,
        question: {
          ...state.question!,
          isCorrectAnswerShown: action.payload,
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
