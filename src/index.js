import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";
import Moralis from 'moralis'
import AppContext from './context/AppContext';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

Moralis.start({serverUrl: SERVER_URL, appId: APP_ID, masterKey: 'B2qwh3QfLOREDkS5TDNWbzWHR7LZ48gRdpPpdAee'})
ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider  appId={APP_ID} serverUrl={SERVER_URL} >
      <AppContext>
      <App />
      </AppContext>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


