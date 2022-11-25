import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import App from '../src/App';
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stock Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </div>
  );
}
