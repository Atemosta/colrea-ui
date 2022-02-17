import React from 'react';
import Grid from '@material-ui/core/Grid';
import ColreaCard from './ColreaCard';

// import LoadingIndicator from '../LoadingIndicator';

/*
 * We pass in our characterNFT metadata so we can a cool card in our UI
 */
const ViewAllCards = ({ cardList, setSelectedCard, setLocation }) => {

  return (
    <div className="arena-container">
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