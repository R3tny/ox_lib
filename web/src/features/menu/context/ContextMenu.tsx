import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { Box, createStyles, Divider, Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ContextMenuProps } from '../../../typings';
import ContextButton from './components/ContextButton';
import { fetchNui } from '../../../utils/fetchNui';
import ReactMarkdown from 'react-markdown';
import HeaderButton from './components/HeaderButton';
import ScaleFade from '../../../transitions/ScaleFade';
import SlideTransition from '../../../transitions/SlideTransition';
import MarkdownComponents from '../../../config/MarkdownComponents';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg from '../../../photo/mask-news.png';
import bg2 from '../../../photo/menu-shadow-left-mobile.png';
import bgdvd from '../../../photo/context.png'
import bgg from '../../../photo/bg2.png'
import bgg2 from '../../../photo/darken-mask.png'
import { url } from 'inspector';
const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const useStyles = createStyles((theme) => ({
  img: {
    position: 'absolute',
    top: '-39vh',
    left: '120vh',
    width: '120vh',
    objectFit: 'cover',
    zIndex: -1,
    opacity: 0.9,
  },
  img2: {
    position: 'absolute',
    bottom: '0vh',
    right: '120vh',
    width: '100vh',
    objectFit: 'cover',
    zIndex: -1,
    opacity: 0.9,
    transform: 'rotate(180deg)',
  },
  background: {
    width: '100%',
    height: '100vh',
    opacity: 0.2,
    
  },
  divider: {
    position: 'relative',
    top: '0',
    left: '0',
    width: '100%',
    height:'auto',
    marginBottom: -50,
    zIndex: 2,
    
  },
  container: {
    position: 'absolute',
    top: '15%',
    right: '20%',
    width: 350,
    height: 580,
    fontSize: 20,
    fontWeight: 400,
    filter: 'drop-shadow(0px 0px 5px black)',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    gap: 6,
     padding: 10,
     
  },
  titleContainer: {
    borderRadius: 6,
    flex: '1 70%',
    textTransform: 'uppercase',
    
  },
  titleText: {
    color: '#fff',
    textShadow: '2px 1px 1px rgba(0, 0, 0, 0.3)',
    padding: 6,
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Maron Rose, sans-serif',
  },
  titleDesc: {
    color: '#fff',
    textShadow: '2px 1px 1px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 300,
    marginTop: -35,
    padding: 10,
    fontFamily: 'Maron Rose, sans-serif',
  },
  buttonsContainer: {
    height: 560,
    overflowY: 'scroll',
    background: `url(${bgg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: 15,
    borderRadius: 6,
    
  },
  buttonsFlexWrapper: {
    gap: 5,
  },
}));

const DelayedRender = ({ children, delay }: any) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return render ? children : null;
};

const ContextMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    title: '',
    description: '',
    backgroundColor: '',
    background: false,
    menu:'',
    options: { '': { description: '', metadata: [] } },
  });

  const closeContext = () => {
    if (contextMenu.canClose === false) return;
    setVisible(false);
    fetchNui('closeContext');
  };

  // Hides the context menu on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeContext();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  useNuiEvent('hideContext', () => setVisible(false));

  useNuiEvent<ContextMenuProps>('showContext', async (data) => {
    if (visible) {
      setVisible(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setContextMenu(data);
    setVisible(true);
  });

  return (
    <>
    <SlideTransition  visible={visible} position="right">
      <img className={classes.img} src={bg} alt=""/>
      <img  src={bg2} alt=""/>
      <img className={classes.img2} src={bg} alt=""/>
      <Box
        className={classes.background}
        opacity={contextMenu.background == true ? 0.6 : 0}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0) 50%, ${contextMenu.backgroundColor} 100%)`,
        }}
      />
    </SlideTransition>
      <Box className={classes.container}>
      <ScaleFade visible={visible}>
        <img className={classes.divider}  src={bgdvd} alt=""/>
        <Box className={classes.buttonsContainer}>
          <Stack className={classes.buttonsFlexWrapper}>
            {Object.entries(contextMenu.options).map((option, index) => (
              <>
                <ContextButton option={option} />
              </>
            ))}
          </Stack>
        </Box>

        <Flex className={classes.header} >
          {contextMenu.menu && (
            <HeaderButton icon="chevron-left" iconSize={16} handleClick={() => openMenu(contextMenu.menu)} />
          )}
          <Box className={classes.titleContainer}>
            <Text className={classes.titleText}>
              <ReactMarkdown components={MarkdownComponents}>{contextMenu.title}</ReactMarkdown>
            </Text>
            <Text className={classes.titleDesc}>
              <ReactMarkdown components={MarkdownComponents}>{contextMenu.description}</ReactMarkdown>
            </Text>
          </Box>
          <HeaderButton
            icon= "xmark"
            canClose={contextMenu.canClose}
            
            iconSize={20}
            handleClick={closeContext}
          />
        </Flex>
      </ScaleFade>
      </Box>
    </>
  );
};

export default ContextMenu;
