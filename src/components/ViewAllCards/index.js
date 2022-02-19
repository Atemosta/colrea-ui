import React from 'react';
import Grid from '@material-ui/core/Grid';
import ColreaCard from './ColreaCard';


const ViewAllCards = ({ cardList, setSelectedCard, setLocation }) => {

  // Open ViewSelectedCard Component
  const mintCard = () => {
    setLocation("MintCard")
  }

  return (
    <div className="arena-container">
      <br/>
      <button
        className="cta-button connect-wallet-button"
        onClick={() => mintCard()}
      >
        Mint a New Colrea Card
      </button>
      <h2>Your Contact Cards</h2>
      {/* Character NFT */}
      <Grid container justifycontent="center" spacing={4}>
        {cardList.map((cardNFT, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <ColreaCard cardNFT={cardNFT} setSelectedCard={setSelectedCard} setLocation={setLocation} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewAllCards;