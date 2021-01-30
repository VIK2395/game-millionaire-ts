import React from 'react';
import './ErrorMessage.css';
import { IError } from '../../../types';

type Props = {
  error: IError;
};

const ErrorMessage: React.FC<Props> = ({ error }) => (
  <div className="error-message">
    <p>{error.message}</p>
  </div>
);

export default ErrorMessage;
