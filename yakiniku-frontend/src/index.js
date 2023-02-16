import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import config from "./config.json";
import { BrowserRouter as Router } from "react-router-dom";
import { ProfileContextProvider } from "./context/profile";
import { ForumContextProvider } from "./context/forum";
import { NftMarketplaceContextProvider } from "./context/nftMarketplace";

// This is the chainId your dApp will work on.
// const activeChainId = ChainId.Mainnet;
const chainId = config.chainId;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={chainId}>
      <Router>
        <ProfileContextProvider>
          <ForumContextProvider>
            <NftMarketplaceContextProvider>
              <App />
            </NftMarketplaceContextProvider>
          </ForumContextProvider>
        </ProfileContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
