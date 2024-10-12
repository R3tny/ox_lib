import { Button, createStyles, Group, Modal, Stack, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useLocales } from '../../providers/LocaleProvider';
import remarkGfm from 'remark-gfm';
import type { AlertProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import bgdvd from '../../photo/context.png';
import bg from '../../photo/mask-news.png';
import bg2 from '../../photo/menu-shadow-left-mobile.png';
import bgg from '../../photo/bg2.png'
const useStyles = createStyles((theme) => ({
  contentStack: {
    color: theme.colors.dark[2],
  },
  divider: {
    position: 'absolute',
    top: -33,
    left: '0',
    width: '100%',
    height: 'auto',
    zIndex: 2,
  },
  header: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
    fontSize: '3.5vh',
    padding: 5,
    marginTop: 10,
    borderRadius: theme.radius.md,
    fontFamily: 'Maron Rose, sans-serif',
    textShadow: '2px 1px 1px rgba(0, 0, 0, 0.3)',
  },
  text: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: theme.radius.md,
  },
  img: {
    position: 'absolute',
    top: 0,
    left: '120vh',
    width: '120vh',
    objectFit: 'cover',
    opacity: 0.9,
    transition: '.5s all',
    animation: '$moveImage 5s ease-in-out infinite alternate',
  },
  img2: {
    position: 'absolute',
    bottom: '0vh',
    right: '120vh',
    width: '100vh',
    objectFit: 'cover',
    opacity: 0.9,
    transform: 'rotate(180deg)',
    transition: '.5s all',
    animation: '$moveImage2 5s ease-in-out infinite alternate',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderRadius: theme.radius.md,
    opacity: 0.9,
  },
  '@keyframes moveImage': {
    '0%': { transform: 'translateX(0) translateY(0)' },
    '100%': { transform: 'translateX(10px) translateY(10px)' },
  },
  '@keyframes moveImage2': {
    '0%': { transform: 'translateX(0) translateY(0)' },
    '100%': { transform: 'translateX(-10px) translateY(-10px)' },
  },
}));

const AlertDialog: React.FC = () => {
  const { locale } = useLocales();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [dialogData, setDialogData] = useState<AlertProps>({
    header: '',
    content: '',
  });

  const closeAlert = (button: string) => {
    setOpened(false);
    fetchNui('closeAlert', button);
  };

  useNuiEvent('sendAlert', (data: AlertProps) => {
    setDialogData(data);
    setOpened(true);
  });

  useNuiEvent('closeAlertDialog', () => {
    setOpened(false);
  });

  const playSound = () => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/league-of-legend-client-button.mp3');
    audio.play();
  };

  const handleMouseDown = () => {
    playSound();
  };
  return (
    <>
    <>
    {opened && (
      <>
    <img className={classes.img} src={bg} alt=""/>
    <img  src={bg2} alt=""/>
    <img className={classes.img2} src={bg} alt=""/>
    </>
    )}
      <Modal
        opened={opened}
        centered={dialogData.centered}
        size={dialogData.size || 'md'}
        overflow={dialogData.overflow ? 'inside' : 'outside'}
        closeOnEscape={true}
        closeOnClickOutside={false}
        onClose={() => {
          setOpened(false);
          closeAlert('cancel');
        }}
        radius={'md'}
        withCloseButton={false}
        overlayOpacity={0}
        transitionDuration={500}
        exitTransitionDuration={300}
        transition="fade"
      >
        <Stack className={classes.contentStack}>
        <img className={classes.bg} src={bgg} alt=""/>
        <img className={classes.divider}  src={bgdvd} alt=""/>
        <span className={classes.header}>{dialogData.header}</span>
        <div className={classes.text}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              ...MarkdownComponents,
              img: ({ ...props }) => <img style={{ maxWidth: '100%', maxHeight: '100%' }} {...props} />,
            }}
          >
            {dialogData.content}
          </ReactMarkdown>
          </div>
          <Group position="center" spacing={10}>
            {/* {dialogData.cancel && (
              <Button uppercase variant="default" onClick={() => closeAlert('cancel')} mr={3}>
                {dialogData.labels?.cancel || locale.ui.cancel || 'Annulla'}
              </Button>
            )} */}
            <Button
              uppercase
              style={{fontSize: 20, fontWeight: 500, fontFamily:'Maron Rose, sans-serif'}}
              variant={dialogData.cancel ? 'light' : 'default'}
              color={dialogData.cancel ? theme.primaryColor : undefined}
              onClick={() => closeAlert('confirm')}
              onMouseDown={handleMouseDown}
            >
              {dialogData.labels?.confirm || locale.ui.confirm || 'Conferma'}
            </Button>
          </Group>
        </Stack>
      </Modal>
      </>
    </>
  );
};

export default AlertDialog;
