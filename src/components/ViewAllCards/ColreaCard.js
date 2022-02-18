// React Imports
import React from 'react'

// External Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Internal Imports
import { parseCardNFT } from '../../helpers';

import './SelectCard.css';

const ColreaCard = ({cardNFT, setSelectedCard, setLocation }) => {
  // State 
  const card = parseCardNFT(cardNFT)
  const [open, setOpen] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState(false);
  const [transferAmount, setTransferAmount] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  
  const handleClose = () => {
    setOpen(false);
  };

  const transferCards = () => {
    console.log(walletAddress)
    console.log(transferAmount)
    handleClose()
    // setSelectedCard(card)
    // setLocation("ViewSelectedCard")
  }

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
          <br/>
          <br/>
          <button
            className="cta-button connect-wallet-button"
            onClick={() => handleClickOpen(card)}
          >
            Transfer Card
          </button>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" background-color="#3d5afe">
          <DialogTitle id="form-dialog-title">Transfer Contact Card</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="name"
              label="Wallet Address"
              fullWidth
              margin="dense"
              onChange={event => setWalletAddress(event.target.value)}
              required
              variant="outlined"
              type="text"
            />
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="quantity"
              label={`Quantity: ${card.balance}`}
              onChange={event => setTransferAmount(event.target.value)}
              required
              type="number"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={transferCards} color="primary">
              Transfer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default ColreaCard
