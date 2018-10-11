import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './AppStyles';
import logo from './logo.svg';

class App extends React.Component<any, any> {
  public render() {
    return <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          </p>
        <a className={styles.appLink} href="https://cobli.co" target="_blank" rel="noopener noreferrer">
          Visit Cobli
          </a>
        <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
          </a>
      </header>
    </div>;
  }
}

export default hot(module)(App);
