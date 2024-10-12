import React, { useEffect } from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFadeLazy from '../../transitions/ScaleFadeLazy';
import type { ProgressbarProps } from '../../typings';
import SlideUp from '../../transitions/SlideUp';
import bgg from '../../photo/bg2.png'
import bgdvd from '../../photo/context.png'
import bg from '../../photo/mask-news.png';
import bg2 from '../../photo/menu-shadow-left-mobile.png';
const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    height: '100vh',
    background: `radial-gradient(ellipse at bottom, ${theme.colors[theme.primaryColor][theme.fn.primaryShade()]} 0%, transparent 20%)`,
  },
  container: {
    width: 350,
    height: 10,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    transition: 'all 1.5s transform ease',

  },
  container1:{
    width: '100%',
    height: '100%',
    padding: 20,
    background: `url(${bgg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: theme.radius.sm,
    boxShadow: `0px 100vh 200vh 100vh black`,
  },  
  divider: {
    position: 'absolute',
    width: '100%',
    height:'100%',
    top: -42,
    left: 0,

  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '100%',
    backgroundColor: 'wheat',
  },
  labelWrapper: {
    position: 'fixed',
    display: 'flex',
    width: 350,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    bottom: 0,
    maxWidth: 350,
    padding: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 22,
    color: "#fff",
    textShadow: `0px 0px 5px wheat`,
  fontFamily:'Maron Rose, sans-serif'
  },
  img: {
    position: 'absolute',
    top: -150,
    left: -350,
    transform: 'rotate(180deg)',
    objectFit: 'cover',
    zIndex: -1,
    opacity: 0.7,
  },

}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.myinstants.com/media/sounds/stranger-things-clock-sound.mp3');
  }, []);

  useNuiEvent('progressCancel', () => {
    setVisible(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio in caso di cancellazione
    }
  });

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);

    if (audioRef.current) {
      const timeout = setTimeout(() => {
        // audioRef.current?.play();
      }, data.duration - 8000);

      return () => clearTimeout(timeout); // Cleanup timeout se il componente si smonta
    }
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <SlideUp visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <div className={classes.container1}>
            <Box className={classes.container}>
              <img className={classes.img} src={bg} alt="" />
              <Box
                className={classes.bar}
                onAnimationEnd={() => setVisible(false)}
                sx={{
                  animation: 'progress-bar linear',
                  animationDuration: `${duration}ms`,
                }}
              >
                <Box className={classes.labelWrapper}>
                  <img className={classes.divider} src={bgdvd} alt="" />
                  <Text className={classes.label}>{label}</Text>
                </Box>
              </Box>
            </Box>
          </div>
        </SlideUp>
      </Box>
    </>
  );
};

export default Progressbar;
