import React from 'react';

// External Imports
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import cyan from '@material-ui/core/colors/cyan';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import itemData from './itemData';

// Internal Imports
import { getBundleModule } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  card: {
    width: '100ch',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  imageList: {
    width: 750,
    height: 750,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: cyan,
    type: 'dark',
  },
});

const MintCard = ({currentAccount, setLocation}) => {

  // State 
  const [name, setName] = React.useState(null);
  const [bio, setBio] = React.useState(null);
  const [website, setWebsite] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [telegram, setTelegram] = React.useState(null);
  const [discord, setDiscord] = React.useState(null);
  const [twitter, setTwitter] = React.useState(null);
  const [instagram, setInstagram] = React.useState(null);
  const [github, setGitHub] = React.useState(null);
  const [linktree, setLinktree] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [mintImage, setMintImage] = React.useState(null);
  const [mintTitle, setMintTitle] = React.useState("None");

  const [mintStatus, setMintStatus] = React.useState(null);
  // const [mintAddress, setMintAddress] = React.useState(null);
  const classes = useStyles();

  const returnToHome = () => {
    setLocation("ViewAllCards")
  }

  const onImageClick = (img, title) => {
    setMintImage(img)
    setMintTitle(title)
  }

  async function mintNewCard() {

    console.log(name)
    console.log(bio)
    console.log(website)
    console.log(email)
    console.log(telegram)
    console.log(discord)
    console.log(twitter)
    console.log(instagram)
    console.log(github)
    console.log(linktree)
    console.log(itemData);
  }

  return (
    <div className="arena-container">
      <br/>
      <Button 
      variant="contained" 
      color="primary" 
      onClick={() => returnToHome()}
      >
        {"← Return to Home"}
      </Button>
      <br/>
      <div>
        <ThemeProvider theme={darkTheme}>
        <Card className={classes.card}>

          <Grid container spacing={1}>

            <Grid item xs={12}>
              <h2>Required Fields</h2>      
            </Grid>      

              <Grid item xs={6}>
                <TextField
                  required
                  id="name-required"
                  label="Name"
                  variant="filled"
                  fullWidth
                  onChange={event => setName(event.target.value)}
                  className={classes.textField}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="bio-required"
                  label="One Sentence Bio (Limit to 140 Characters)"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setBio(event.target.value)}
                />        
              </Grid>

              <Grid item xs={12}>
                <h2>Optional Fields</h2>      
              </Grid>    

              <Grid item xs={6}>
                <TextField
                  id="website"
                  label="Website"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setWebsite(event.target.value)}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  label="Email"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setEmail(event.target.value)}
                />        
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="telegram"
                  label="Telegram"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setTelegram(event.target.value)}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="discord"
                  label="Discord"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setDiscord(event.target.value)}
                />        
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="twitter"
                  label="Twitter"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setTwitter(event.target.value)}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="instagram"
                  label="Instagram"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setInstagram(event.target.value)}
                />        
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="github"
                  label="GitHub"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setGitHub(event.target.value)}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="linktree"
                  label="Linktr.ee"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                  onChange={event => setLinktree(event.target.value)}
                />        
              </Grid>

            </Grid>

            <Grid item xs={12}>
              <h2>Select Card Image </h2>      
            </Grid>    

            <div className={classes.root}>
              <ImageList rowHeight={350} className={classes.imageList}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img} onClick={() => onImageClick(item.img, item.title)}>
                    <img src={item.img} alt={item.title} />
                    <ImageListItemBar
                      title={item.title}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            <br/>

            <Grid item xs={12}>
                <h3>Image Selected: <i>{mintTitle}</i></h3>
              </Grid>

            <br/>
            <button
            className="cta-button connect-wallet-button"
            onClick={() => mintNewCard()}
            >
               Mint Colrea Card
            </button>
            <br/>
            <br/>
            { (mintStatus === "success") && <Alert onClose={() => setMintStatus(null)} severity="success" variant="filled">Successfully minted Colrea Cards to <b>{currentAccount}</b>!</Alert>}
            { (mintStatus === "error") && <Alert onClose={() => setMintStatus(null)} severity="error" variant="filled">{alertMessage}</Alert>}
          </Card>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MintCard;