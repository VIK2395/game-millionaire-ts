import React from 'react';
import './ErrorMessage.css';
import { IError } from '../../../types';

type ErrorMessageProps = {
  error: IError;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="error-message">
    <p>{error.message}</p>
  </div>
);

export default ErrorMessage;
