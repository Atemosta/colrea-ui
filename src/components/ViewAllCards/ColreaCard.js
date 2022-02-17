// React Imports
import React from 'react'

// Internal Imports
import { parseCardNFT } from '../../helpers';

import './SelectCard.css';

const ColreaCard = ({cardNFT, setSelectedCard, setLocation }) => {

  const card = parseCardNFT(cardNFT)

  const getMoreDetails = (card) => {
    console.log(card);
    setSelectedCard(card)
    setLocation("ViewSelectedCard")
  }

    return (
      <div >
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
            <h3>
              {card.bio}
            </h3>
            {/* <Link href={`https://testnets.opensea.io/assets/mumbai/${BUNDLE_MODULE_ADDRESS}/${card.id}`} 
              color="inherit" 
              className="cta-button connect-wallet-button"
            >
              View on OpenSea
            </Link> */}
          <button
            className="cta-button connect-wallet-button"
            onClick={() => getMoreDetails(card)}
          >
            Get More Details
          </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ColreaCard
