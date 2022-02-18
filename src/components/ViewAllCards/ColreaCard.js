// React Imports
import React from 'react'

// External Imports
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


// Internal Imports
import { parseCardNFT } from '../../helpers';

import './SelectCard.css';

const ColreaCard = ({cardNFT, setSelectedCard, setLocation }) => {
  // Get Card Metadata
  const card = parseCardNFT(cardNFT)

  // State 
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [transferAmount, setTransferAmount] = React.useState(null);
  const [transferStatus, setTransferStatus] = React.useState(null);
  const [walletAddress, setWalletAddress] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  
  const handleClose = () => {
    setTransferAmount(null)
    setTransferStatus(null)
    setWalletAddress(null)
    setOpen(false);
  };

  const transferCards = () => {
    console.log(walletAddress)
    console.log(transferAmount)
     if (!walletAddress){
      setTransferStatus("error")
      setAlertMessage("Missing Wallet Address")
    } else if (!transferAmount){
      setTransferStatus("error")
      setAlertMessage("Missing Transfer Amount")
    } else if (parseInt(transferAmount) > parseInt(card.balance)){
      setTransferStatus("error")
      setAlertMessage("Not enough cards to transfer - please mint or receive more. ")
    } else if (walletAddress && transferAmount){
      setTransferStatus("sending")
      // do thirdweb stuff here lol
      // "Failed to send contact cards - please try again."
      // handleClose()
    }


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
              type="number"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            {
              (transferStatus === "sending") ?
              <CircularProgress /> : 
              <Button onClick={transferCards} color="primary">
              Transfer
              </Button>
            }
          </DialogActions>
          { (transferStatus === "success") && <Alert onClose={handleClose} severity="success">Successfully sent contact cards!</Alert>}
          { (transferStatus === "error") && <Alert onClose={handleClose} severity="error">{alertMessage}</Alert>}
        </Dialog>
      </div>
    )
}

export default ColreaCard
