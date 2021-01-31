import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import StartPage from './components/startPage/StartPage';
import GamePage from './components/gamePage/GamePage';
import EndPage from './components/endPage/EndPage';
import Loader from './components/common/loader/Loader';
import { IState } from './types';

const App: React.FC<Props> = ({ isLoadingGameConfigData }) => (
  <Loader isActive={isLoadingGameConfigData}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/game" component={GamePage} />
        <Route path="/gameover" component={EndPage} />
      </Switch>
    </BrowserRouter>
  </Loader>
);

const mapStateToProps = ({ isLoadingGameConfigData }: IState) => ({
  isLoadingGameConfigData,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(App);
