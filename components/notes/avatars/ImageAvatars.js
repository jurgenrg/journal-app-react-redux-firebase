import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const ImageAvatars = () => {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src="images/avatar/1.png" />
      {/*<Avatar alt="Travis Howard" src="images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="images/avatar/3.jpg" />*/}
    </div>
  );
}
