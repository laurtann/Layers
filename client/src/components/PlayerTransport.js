import React, { useState } from "react";
import Emitter from "../EventEmitter";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { LinearProgress, useMediaQuery } from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import FastRewindIcon from '@material-ui/icons/FastRewind';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 65,
    background: "#1a1a1a;",
    zIndex: 10,
    color: "rgb(244, 240, 234)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 3,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  transport: {
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
    fontSize: 50,
    color: "var(--white)"
  },
  progressBar: {
    height: 6,
    color: "white",
    width: "100%",
  },
  desktop: {
    color: "red"
  }
}));

export default function PlayerTransport({ hasLoaded }) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const [playing, setPlay] = useState(false);
  const handlePlayPause = () => {
    if (hasLoaded) {
      setPlay(!playing);
      Emitter.emit('clickPlayPause', "");
    }
  };
  const handleRewind = () => {
    if (hasLoaded) {
      Emitter.emit('clickRewind', setPlay(playing));
    }
  };

  return (
    <div>
      {!hasLoaded && <LinearProgress className={classes.progressBar} />}
      {
        hasLoaded && (<div className={classes.transport}>
          <IconButton onClick={handleRewind} aria-label="Rewind">
            <FastRewindIcon className={classes.icon} />
          </IconButton>

          <IconButton className={classes.icon} aria-label="Play/Pause" onClick={handlePlayPause}>
            {playing ? <Pause className={classes.icon} /> : <PlayArrow className={classes.icon} />}
          </IconButton>
        </div>)
      }
    </div >
  );
};

