// React Imports
import React from 'react'

// External Imports
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

// Internal Imports
import { BUNDLE_MODULE_ADDRESS } from '../../constants';
import { parseCardNFT } from '../../helpers';

import './SelectCard.css';

const ColreaCard = ({cardNFT, setLocation }) => {

  const card = parseCardNFT(cardNFT)

  const beginYourJourney = () => {
    // console.log(characterNFT);
    // setLocation("ExploreWasteland")
    // setCharacterNFT(characterNFT)
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
                alt={`${card.name} Image`}
              />

            <br/>
            {/* <Link to="/signup" className="btn btn-primary">Sign up</Link> */}
            <Link href={`https://testnets.opensea.io/assets/mumbai/${BUNDLE_MODULE_ADDRESS}/${card.id}`} 
              color="inherit" 
              className="cta-button connect-wallet-button"
            >
              View on OpenSea
            </Link>
          {/* <button
            className="cta-button connect-wallet-button"
            onClick={() => console.log("Hii")}
          >
            View on OpenSea
          </button> */}
          <br/>
          <br/>
          <button
            className="cta-button connect-wallet-button"
            onClick={() => beginYourJourney()}
          >
            Begin Your Journey
          </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ColreaCard
