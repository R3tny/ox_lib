import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import bgg from '../../photo/bg2.png';
import bgdvd from '../../photo/context.png';

const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    top: '50vh',
    left: '50%',
    transform: "translate(-50%, -50%)",
    marginLeft: params.position === 'left-center' ? '10px' : params.position === 'right-center' ? '-10px' : 0,
    alignItems: params.position === 'top-center' ? 'baseline' : params.position === 'bottom-center' ? 'flex-end' : 'center',
    justifyContent: params.position === 'right-center' ? 'flex-end' : params.position === 'left-center' ? 'flex-start' : 'center',
    zIndex: 10000,
  },
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '220px',
    height: 'fit-content',
    borderRadius: theme.radius.xl,
    background: `url(${bgg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    "::before": {
      content: '""',
      position: 'absolute',
      top: '5px',
      left: '5px',
      height: '5px',
      borderRadius: theme.radius.md,
      boxShadow: '0 0 10px #43b8a5, 0 0 20px #43b8a5',
    },
    p: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 500,
      color: 'white',
      fontSize: '15px',
      height: '40px',
      borderRadius: theme.radius.md,
      textShadow: '0 0 1px #50bcaf40, 0 0 1px gold, 0 0 5px gold, 0 0 520px gold',
      fontFamily: 'Maron Rose, sans-serif',
    },
  },
  divider: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    zIndex: 2,
    top: -12,
  },
  controlcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    background: `url(${bgg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: theme.radius.xl,
  },
  control: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '15px',
    border: '.1vh solid wheat',
    borderRadius: theme.radius.xl,
    textShadow: '0 0 10px #50bcaf40, 0 0 10px gold, 0 0 10px gold, 0 0 520px gold',
    fontFamily: 'Maron Rose, sans-serif',
  },
}));

const TextUI: React.FC<{ data: TextUiProps; visible: boolean; onHidden: () => void }> = ({ data, visible, onHidden }) => {
  const { classes } = useStyles({ position: data.position });

  React.useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onHidden, 300); // Delay to match the fade-out animation duration
      return () => clearTimeout(timer);
    }
  }, [visible, onHidden]);

  return (
    <Box className={classes.wrapper}>
      <ScaleFade visible={visible}>
        <Flex direction={'row'} align={'center'} gap={5}>
          {data.control && (
            <div className={classes.controlcontainer}>
              <span className={classes.control}>{data.control}</span>
            </div>
          )}
          <Box style={data.style} className={classes.container}>
            <img className={classes.divider} src={bgdvd} alt="" />
            <Group spacing={12}>
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>
            </Group>
          </Box>
        </Flex>
      </ScaleFade>
    </Box>
  );
};

const TextUIContainer: React.FC = () => {
  const [textUis, setTextUis] = React.useState<{ id: number; data: TextUiProps; visible: boolean }[]>([]);

  useNuiEvent<TextUiProps>('textUi', (newData) => {
    if (!newData.position) newData.position = 'right-center';

    setTextUis((current) => [
      ...current,
      { id: Date.now(), data: newData, visible: true },
    ]);
  });

  useNuiEvent('textUiHide', (id?: number) => {
    if (id !== undefined) {
      // Nascondi solo il TextUI con l'ID specificato
      setTextUis((current) =>
        current.map((ui) => (ui.id === id ? { ...ui, visible: false } : ui))
      );
    } else {
      // Nascondi tutti i TextUI se l'ID non è specificato
      setTextUis((current) => current.map((ui) => ({ ...ui, visible: false })));
    }
  });

  // Clean up hidden notifications after the fade-out animation
  const handleHidden = (id: number) => {
    setTextUis((current) => current.filter((ui) => ui.id !== id));
  };

  return (
    <Flex direction={'column'} gap={15}>
      {textUis.map(({ id, data, visible }) => (
        <TextUI key={id} data={data} visible={visible} onHidden={() => handleHidden(id)} />
      ))}
    </Flex>
  );
};

export default TextUIContainer;
