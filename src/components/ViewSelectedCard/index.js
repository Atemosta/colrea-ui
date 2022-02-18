// React Imports
import React from 'react'

// External Imports
import Link from '@material-ui/core/Link';

// Internal Imports
import { BUNDLE_MODULE_ADDRESS } from '../../constants';
import { checkIfPropertyExists } from '../../helpers';

import './SelectCard.css';

const ViewSelectedCard = ({selectedCard, setSelectedCard, setLocation}) => {

  const card = selectedCard
  const properties = card.properties

  // Get List of Properties
  const websiteProperty = checkIfPropertyExists("website", properties)
  const emailProperty = checkIfPropertyExists("email", properties)
  const telegramProperty = checkIfPropertyExists("telegram", properties)
  const discordProperty = checkIfPropertyExists("discord", properties)
  const twitterProperty = checkIfPropertyExists("twitter", properties)
  const instagramProperty = checkIfPropertyExists("instagram", properties)
  const githubProperty = checkIfPropertyExists("github", properties)

  const returnToHome = () => {
    setLocation("ViewAllCards")
    setSelectedCard([])
  }

    return (
      <div className="arena-container">
        <div className="players-container">
          <div className="player">
            <div className="image-content">
              <h2>{card.name}</h2>
              <img
                // src={characterNFT.imageURI}
                src={`${card.image}`}
                alt={`${card.name}`}
              />
            <br/>
            <Link href={`https://testnets.opensea.io/assets/mumbai/${BUNDLE_MODULE_ADDRESS}/${card.id}`} 
              color="inherit" 
              className="cta-button connect-wallet-button"
            >
              View Metadata on OpenSea
            </Link>
            <h3>
              {card.bio}
            </h3>
            { websiteProperty && <h4> Website: <Link href={websiteProperty} > {websiteProperty} </Link> </h4>}
            { emailProperty && <h4> Email: <Link href="https://protonmail.com/" > {emailProperty} </Link> </h4>}
            { telegramProperty && <h4> Telegram: <Link href="https://telegram.org/" > {telegramProperty} </Link> </h4>}
            { discordProperty && <h4> Discord: <Link href="https://discord.com/" > {discordProperty} </Link> </h4>}
            { twitterProperty && <h4> Twitter: <Link href={twitterProperty} > {twitterProperty} </Link> </h4>}
            { instagramProperty && <h4> Instagram: <Link href={instagramProperty} > {instagramProperty} </Link> </h4>}
            { githubProperty && <h4> GitHub: <Link href={githubProperty} > {githubProperty} </Link> </h4>}
          <button
            className="cta-button connect-wallet-button"
            onClick={() => returnToHome()}
          >
            Return to Home
          </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ViewSelectedCard
