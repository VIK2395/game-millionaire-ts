import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ScoreCell from './ScoreCell';
import { IState } from '../../types';

const ScoreList: React.FC<Props> = ({ scoreDashboard, score }) => (
  <ul className="score__list">
    {scoreDashboard.map((cellValue) => (
      <ScoreCell
        key={cellValue}
        value={cellValue}
        isActive={cellValue === score}
        isPassed={cellValue < score}
      />
    ))}
  </ul>
);

const mapStateToProps = ({ scoreDashboard, score }: IState) => ({
  scoreDashboard,
  score,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(React.memo(ScoreList));
