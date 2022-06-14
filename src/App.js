import React, { useEffect, useState } from 'react';
import './App.css';

// External Imports
// import { ethers } from 'ethers';

// Internal Imports 
import { convertBalanceHexToInt, getBundleModule } from './helpers';
import { networks } from './utils/networks';

// Custom Components
import LoadingIndicator from './components/LoadingIndicator';
import MintCard from './components/MintCard';
import ViewAllCards from './components/ViewAllCards';
import ViewSelectedCard from './components/ViewSelectedCard';

// Asset Imports

// Constants
import twitterLogo from './assets/twitter-logo.svg';
const TWITTER_HANDLE = 'Atemosta';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {
  // State
  const [cardList, setCardList] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [network, setNetwork] = useState('');
  const [selectedCard, setSelectedCard] = useState([]);

	const switchNetwork = async () => {
		if (window.ethereum) {
			try {
				// Try to switch to the Mumbai testnet
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
				});
			} catch (error) {
				// This error code means that the chain we want has not been added to MetaMask
				// In this case we ask the user to add it to their MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{	
									chainId: '0x13881',
									chainName: 'Polygon Mumbai Testnet',
									rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
									nativeCurrency: {
											name: "Mumbai Matic",
											symbol: "MATIC",
											decimals: 18
									},
									blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			// If window.ethereum is not found then MetaMask is not installed
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		} 
	}

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!'); // DEBUG
        return;
      } else {
        // console.log('We have the ethereum object', ethereum); // DEBUG

        /*
         * Check if we are on the correct network verison
         */
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        // console.log(accounts); // DEBUG
        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const account = accounts[0];
          // console.log('Found an authorized account:', account); // DEBUG
          setCurrentAccount(account);
        } else {
          // console.log('No authorized account found'); // DEBUG
          setIsLoading(false);
        }

        // Reload the page when they change network
        ethereum.on('chainChanged', handleChainChanged);
        function handleChainChanged(_chainId) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    /*
    * The function we will call that interacts with out smart contract
    */
    const fetchNFTMetadata = async () => {

      try {
        const module = await getBundleModule()
        const address = currentAccount; // The address you want to get the NFTs for;
        const allNFTs = await module.getAll(address);
        const totalNFTs = allNFTs.length
        const ownedNfts = []
        for (let i = 0; i < totalNFTs; i++) {
          const currentNFT = allNFTs[i]
          const ownedByAdressHex = currentNFT.ownedByAddress["_hex"]
          const ownedByAddressInt = convertBalanceHexToInt(ownedByAdressHex)
          if (ownedByAddressInt > 0){
            ownedNfts.push(currentNFT)
          }
        }        
        setCardList(ownedNfts);
        setLocation("ViewAllCards")

      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    /*
    * We only want to run this, if we have a connected wallet
    */
    if (currentAccount) {
      // console.log('CurrentAccount:', currentAccount); // DEBUG
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  // Render Methods
  const renderContent = () => {
    // console.log("Location:" + location); // DEBUG
    if (isLoading) {
      return <LoadingIndicator />;
    }  

    /*
    * Scenario #0: Account Not Connected
    */
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <p className="sub-text">Mint your Metaverse ID Card!</p>
          <img
            src="https://i.pinimg.com/originals/31/7e/75/317e756a8c338c113cd328e05a1e2713.gif"
            alt="Sword Art Online Gif"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
    }

    /*
    * Scenario #1: Wrong Network Not Connected
    */
    else if (network === '0x13881') {
      setIsLoading(false);
      return (
        <div className="select-character-container">
          <p className="sub-text">You are on the wrong network! Please connect to <b>Polygon</b> and refresh to continue.</p>
          <img
            src="https://mojo.dailybruin.com/wp-content/uploads/2014/06/kirito-gif-kirito-sword-art-online-34958972-500-281.gif"
            alt="Sword Art Online Menu GIF"
          /> 
          <br/><br/>
          <button className='cta-button mint-button' onClick={switchNetwork}>Click here to switch to Polygon Network</button>
        </div>
      );
    }

    /*
    * Scenario #2: View All Collected Contact Cards
    */
    else if (location === "ViewAllCards") {
        return <ViewAllCards cardList={cardList} setSelectedCard={setSelectedCard} setLocation={setLocation} />;
    }
    /*
    * Scenario #3: Display Selected Contact Card
    */
    else if (location === "ViewSelectedCard") {
      return <ViewSelectedCard selectedCard={selectedCard} setSelectedCard={setSelectedCard} setLocation={setLocation} />;
    }
    /*
    * Scenario #4: Mint New Card!
    */
    else if (location === "MintCard") {
        return <MintCard currentAccount={currentAccount} selectedCard={selectedCard} setSelectedCard={setSelectedCard} setLocation={setLocation} />;
    }
  };

  return (
    <div className="App">
      {/* <Navbar setLocation={setLocation}/> */}
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Colrea</p>
          {renderContent()}
        </div>
        <br/>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Twitter -> @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
