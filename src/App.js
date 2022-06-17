import React, { useEffect, useState } from "react";

// External Imports
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Internal Imports
import { BIO_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH } from './constants';
import { getEditionContract, parseRawNFT } from './helpers';
import { networks } from './utils/networks';

// Asset Imports
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import polygonLogo from './assets/polygonlogo.png';
import ethLogo from './assets/ethlogo.png';
import itemData from './components/MintCard/itemData';

// Constants
const TWITTER_HANDLE = 'Atemosta';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const CHAIN_NAME = 'Polygon Mumbai Testnet'
// const tld = '.aincrad';

const App = () => {
	// State 
	const [currentAccount, setCurrentAccount] = useState('');
  const [loading, setLoading] = useState(false);
	const [mintBio, setMintBio] = useState('');
	const [mintName, setMintName] = useState('');
  const [mintImg, setMintImg] = React.useState('');
  const [mintTitle, setMintTitle] = React.useState('');
	const [mints, setMints] = useState([]);
	const [network, setNetwork] = useState('');
	// Connect Wallet
	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	}
	// Switch Network
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
											decimals: 18,
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
	// Check if Wallet is Connected
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Make sure you have metamask!');
			return;
		} else {
			// console.log('We have the ethereum object', ethereum);
		}

		// Check if we're authorized to access the user's wallet
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		// Users can have multiple authorized accounts, we grab the first one if its there!
		if (accounts.length !== 0) {
			const account = accounts[0];
			// console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}

		const chainId = await ethereum.request({ method: 'eth_chainId' });
		setNetwork(networks[chainId]);

		ethereum.on('chainChanged', handleChainChanged);
		
		// Reload the page when they change networks
		function handleChainChanged(_chainId) {
			window.location.reload();
		}
	};
	// On Image Click
  const onImageClick = (img, title) => {
    setMintImg(img)
    setMintTitle(title)
  }
	// Mint Colrea
	const mintColrea = async () => {
		// Don't run if image is not selected is empty
		if (!mintImg) { 
			alert('Please select an image!');
			return 
		}
		// Don't run if the name is empty
		if (!mintName) { 
			alert('Missing Name!');
			return 
		}
		// Alert the user if the name is too short
		if (mintName.length < NAME_MIN_LENGTH) {
			alert('Name must be at least 3 characters long');
			return;
		}
		// Alert the user if the name is too short
		if (mintName.length > NAME_MAX_LENGTH) {
			alert('Name must be at most 25 characters long');
			return;
		}
		// Alert the user if the bio is too long
		if (mintBio.length > BIO_MAX_LENGTH) {
			alert('Bio must be at most 35 characters');
			return;
		}
		setLoading(true);
		try {
			// Address of the wallet you want to mint the NFT to
			const toAddress = currentAccount;
			// Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
			const metadata = {
				name: mintName,
				description: mintBio,
				image: mintImg // This can be an image url or file
			}
			const metadataWithSupply = {
				metadata,
				supply: 100, // The number of this NFT you want to mint
			}
			console.log("Attempting to mint new Colrea...")
			const contract = getEditionContract();
			let tx = await contract.mintTo(toAddress, metadataWithSupply);
			console.log("tx: ");
			console.log(tx)
			// Wait for the transaction to be mined
			const receipt = tx.receipt; // the transaction receipt
			// Check if the transaction was successfully completed
			if (receipt.status === 1) {
				console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+ receipt.transactionHash);
				// Call fetchMints after 2 seconds
				setTimeout(() => {
					fetchMints();
				}, 2000);
				setMintName('');
				setMintBio('');
				setMintImg('');
				setMintTitle('');
			}
			else {
				alert("Transaction failed! Please try again");
			}
		}
		catch(error){
			console.log(error);
		}
		setLoading(false)
	}
	// Fetch Mints
	const fetchMints = async () => {
		setLoading(true)
    try {
      const contract = getEditionContract()
      const address = currentAccount; // The address you want to get the NFTs for;
			const nfts = await contract.getOwned(address);
      setMints(nfts);
    } catch (error) {
      console.log(error);
    }
		setLoading(false)
	}
	// Create a function to render if wallet is not connected yet
	const renderNotConnectedContainer = () => (
    <div className="connect-wallet-container">
      <p className="sub-text">Mint your Metaverse ID Card!</p>
      <br/>
      <img
        src="https://i.pinimg.com/originals/31/7e/75/317e756a8c338c113cd328e05a1e2713.gif"
        alt="Sword Art Online Gif"
      />
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect Wallet To Get Started
      </button>
    </div>
  );
	// Form to enter domain name and data
	const renderInputForm = () => {
		// If not on Polygon Mumbai Testnet, render "Please connect to Polygon Mumbai Testnet"
		if (network !== CHAIN_NAME) {
			return (
				<div className="connect-wallet-container">
					<p className="sub-text">{`Please connect to the ${CHAIN_NAME}`}</p>
          <br/>
          <img
            src="https://mojo.dailybruin.com/wp-content/uploads/2014/06/kirito-gif-kirito-sword-art-online-34958972-500-281.gif"
            alt="Sword Art Online Menu GIF"
          /> 
					<button className='cta-button mint-button' onClick={switchNetwork}>Click here to switch</button>
				</div>
			);
		}
		return (
			<div className="form-container">
				{/* Image List */}
				<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
					{itemData.map((item) => (
						<ImageListItem 
							key={item.img} 
							onClick={() => onImageClick(item.ipfs, item.title)}
							style= {{cursor: 'pointer' }}
						>
							<img
								src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
								srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
								alt={item.title}
								loading="lazy"
							/>
						</ImageListItem>
					))}
				</ImageList>
				{/* Input Form (Image) */}
				<div className="first-row">
					<input
						type="text"
						disabled
						value={mintTitle}
						placeholder='Select Character Image'
						onChange={e => setMintTitle(e.target.value)}
					/>
				</div>
				{/* Input Form (Name) */}
				<div className="first-row">
					<input
						type="text"
						value={mintName}
						placeholder={"Name"}
						onChange={e => setMintName(e.target.value)}
					/>
				</div>
				{/* Input Form (Bio) */}
					<input
						type="text"
						value={mintBio}
						placeholder={"Bio"}
						onChange={e => setMintBio(e.target.value)}
					/>
				{/* Mint Button */}
				<button className='cta-button mint-button' disabled={loading} onClick={() => mintColrea()}>
					Mint New Colrea
				</button>  
			</div>
		);
	}
	// Add this render function next to your other render functions
	const renderMints = () => {
		if (currentAccount && mints.length > 0) {
			return (
				<div className="mint-container">
					<p className="subtitle"> Your Collected Colreas!</p>
					<p className="subtitle"> Click on a Colrea to transfer it to a friend</p>
					<div className="mint-list">
						{ mints.map((mint, index) => {
							const nft = parseRawNFT(mint);
							return (
								<div className="mint-item" key={index}>
									<div className='mint-row'>
										{/* <a className="link" href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`} target="_blank" rel="noopener noreferrer"> */}
										<a className="link" href={`https://testnets.opensea.io/`} target="_blank" rel="noopener noreferrer"> 
											<img 
												src={nft.image} 
												alt={nft.bio} 
												width="125" 
												height="125"
											/>
											<p className="colrea-card-name">{' '}{nft.name}{' (x' + nft.balance + ')'}</p>
											<p className="colrea-card-bio">{' '}{nft.bio}{' '}</p>
										</a>
									</div>
								</div>)
						})}
					</div>
			</div>);
		}
	};
	// This runs our function when the page loads.
	useEffect(() => {
		checkIfWalletIsConnected();
	}, [])
	// This will run any time currentAccount or network are changed
	useEffect(() => {
		if (network === CHAIN_NAME) {
			fetchMints();
		}
	}, [currentAccount, network]);
  return (
		<div className="App">
			<div className="container">

				<div className="header-container">
					<header>
            <div className="left">
              <p className="title">⚔️🗡️ Aincrad Name Service</p>
              <p className="subtitle">Your immortal Sword Art on Blockchain!</p>
            </div>
						{/* Display a logo and wallet connection status*/}
						<div className="right">
							<img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} />
							{ currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : <p> Not connected </p> }
						</div>
					</header>
				</div>

				{/* Hide the connect button if currentAccount isn't empty*/}
				{!currentAccount && renderNotConnectedContainer()}

				{/* Render the input form if an account is connected */}
				{currentAccount && renderInputForm()}

				{/* Render minted domains */}
				{mints && renderMints()}

        <div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built with @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
}

export default App;