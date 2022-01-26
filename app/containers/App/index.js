/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {NotFoundPage} from '../NotFoundPage/Loadable';
import '../../styles/global-style.scss';
import './index.scss';
import ThemeWrapper from './ThemeWrapper';
import Auth from './Auth';
import Application from './Application';
import {hotjar} from 'react-hotjar'
import ReactGA from "react-ga4";
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import {
//   getLedgerWallet,
//   getPhantomWallet,
//   getSlopeWallet,
//   getSolflareWallet,
//   getSolletExtensionWallet,
//   getSolletWallet,
//   getTorusWallet,
// } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';

const App = () => {
  useEffect(() => {
    if (process.env.HOTJAR_ID) {
      hotjar.initialize(+process.env.HOTJAR_ID, +process.env.HOTJAR_HJSV)
    }
    if (process.env.MEASUREMENT_ID) {
      ReactGA.initialize(process.env.MEASUREMENT_ID)
    }
  }, [])

  return (
    // <Context>
    <ThemeWrapper>
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={Application}/>
        <Route path="*" component={NotFoundPage}/>
      </Switch>
    </ThemeWrapper>
    // </Context>
  );
};

// const Context = ({ children }) => {
//   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//   const network = WalletAdapterNetwork.Mainnet;
//
//   // You can also provide a custom RPC endpoint.
//   const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//
//   // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
//   // Only the wallets you configure here will be compiled into your application, and only the dependencies
//   // of wallets that your users connect to will be loaded.
//   const wallets = useMemo(
//     () => [
//       getPhantomWallet(),
//       getSlopeWallet(),
//       getSolflareWallet(),
//       getTorusWallet({
//         options: { clientId: 'Get a client ID @ https://developer.tor.us' },
//       }),
//       getLedgerWallet(),
//       getSolletWallet({ network }),
//       getSolletExtensionWallet({ network }),
//     ],
//     [network]
//   );
//
//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>{children}</WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };


export default App;
