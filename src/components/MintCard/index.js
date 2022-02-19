import React from 'react';


// External Imports
import Card from '@material-ui/core/Card';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  card: {
    width: '150ch',
  },
  textField: {
    // marginLeft: theme.spacing(20),
    // marginRight: theme.spacing(10),
    width: '70ch',
  },
}));

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

const MintCard = ({setLocation}) => {
  const classes = useStyles();

  const returnToHome = () => {
    setLocation("ViewAllCards")
  }

  return (
    <div className="arena-container">
      <br/>
      <button
      className="cta-button connect-wallet-button"
      onClick={() => returnToHome()}
      >
        {"Return to Home"}
      </button>
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
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  label="Email"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="telegram"
                  label="Telegram"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="discord"
                  label="Discord"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="twitter"
                  label="Twitter"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="instagram"
                  label="Instagram"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="github"
                  label="GitHub"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="linktree"
                  label="Linktr.ee"
                  variant="filled"
                  fullWidth
                  className={classes.textField}
                />        
              </Grid>

            </Grid>
          </Card>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MintCard;