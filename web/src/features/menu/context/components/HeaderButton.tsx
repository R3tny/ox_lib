import React from 'react';
import { Button, createStyles } from '@mantine/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  icon: IconProp;
  canClose?: boolean;
  iconSize: number;
  handleClick: () => void;
}

const useStyles = createStyles((theme, params: { canClose?: boolean }) => ({
  button: {
    borderRadius: 4,
    alignSelf: 'center',
    height: '35px',
    width: '35px',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 2,
    opacity: 0.5,
    '&:hover': {
      opacity: 0.8,
    },
    '&:active': {
      opacity: 1,
    }
  },
  root: {
    border: 'none',
  },
  label: {
    color: params.canClose === false ? theme.colors.dark[2] : theme.colors[theme.primaryColor][theme.fn.primaryShade()],
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  const playSound = () => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/league-of-legend-client-button.mp3');
    audio.play();
  };

  const handleMouseDown = () => {
    playSound();
  };

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ label: classes.label, root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      <LibIcon icon={icon} fontSize={iconSize} fixedWidth />
    </Button>
  );
};

export default HeaderButton;
