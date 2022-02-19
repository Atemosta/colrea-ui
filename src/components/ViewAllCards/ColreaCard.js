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
import { getBundleModule, parseCardNFT } from '../../helpers';

import './SelectCard.css';

const ColreaCard = ({cardNFT, setSelectedCard, setLocation }) => {
  // Get Card Metadata
  const card = parseCardNFT(cardNFT)

  // State 
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [transferAmount, setTransferAmount] = React.useState(null);
  const [transferStatus, setTransferStatus] = React.useState(null);
  const [transferAddress, setTransferAddress] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTransferAmount(null)
    setTransferStatus(null)
    setTransferAddress(null)
    setOpen(false);
  };

  async function transferCards() {
     if (!transferAddress){
      setTransferStatus("error")
      setAlertMessage("Missing Wallet Address")
    } else if (!transferAmount){
      setTransferStatus("error")
      setAlertMessage("Missing Transfer Amount")
    } else if (parseInt(transferAmount) > parseInt(card.balance)){
      setTransferStatus("error")
      setAlertMessage("Not enough cards to transfer - please mint or receive more. ")
    } else if (transferAddress && transferAmount){
      // do thirdweb stuff here lol
      try {
        setTransferStatus("sending")
        const toAddress = transferAddress
        const tokenId = card.id
        const amount = transferAmount
        const module = await getBundleModule()
        const transferPromise = await module.transfer(toAddress, tokenId, amount);
        console.log(transferPromise);
        setTransferStatus("success")
      } catch (error) {
        console.log(error);
        setTransferStatus("error")
        setAlertMessage("Failed to send contact cards - please try again.")
      }  
      // handleClose()
    }
  }

  // Open ViewSelectedCard Component
  const getMoreDetails = (card) => {
    // console.log(card); // DEBUG
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
            Transfer Card (QTY: {card.balance})
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
              label="Wallet Address (0x123...)"
              fullWidth
              margin="dense"
              onChange={event => setTransferAddress(event.target.value)}
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
