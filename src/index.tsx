import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from './library';
import { MoralisProvider } from 'react-moralis';

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <Web3ReactProvider getLibrary={getLibrary}>
      <MoralisProvider
        //운영
        appId="j2K172Ea6u1iViekuhj9TfhDVGy1tLUmREYbzp3L"
        serverUrl="https://l2uprfa1rouh.usemoralis.com:2053/server"
        
        //개발
        //appId="sgxsg4PbUGG15y09LHVaaXqBATkE560eKJc9l3vB"
        //serverUrl="https://ukkcmr8fjfiw.usemoralis.com:2053/server"
        >
          <App />
        </MoralisProvider>
      </Web3ReactProvider>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
