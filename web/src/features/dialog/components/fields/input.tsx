import { Box, createStyles, PasswordInput, TextInput,Text } from '@mantine/core';
import React from 'react';
import { IInput } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: IInput;
  index: number;
}

const useStyles = createStyles((theme) => ({
  eyeIcon: {
    color: theme.colors.dark[2],
  },
}));

const InputField: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  return (
    <>
      {!props.row.password ? (
        <Box>
         <Text sx={{ fontSize: 20, fontWeight: 500 , fontFamily:'Maron Rose, sans-serif' }}>{props.row.label}</Text>
        <TextInput
          {...props.register}
          style={{fontFamily: 'Maron Rose, sans-serif'}}
          variant='filled'
          radius={'md'}
          defaultValue={props.row.default}
          description={props.row.description}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
        />
      </Box>
      ) : (
        <Box>
    <Text sx={{ fontSize: 20, fontWeight: 500 , fontFamily:'Maron Rose, sans-serif' }}>{props.row.label}</Text>
        <PasswordInput
          {...props.register}
          style={{fontFamily: 'Maron Rose, sans-serif'}}
          defaultValue={props.row.default}
          description={props.row.description}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          visibilityToggleIcon={({ reveal, size }) => (
            <LibIcon
              icon={reveal ? 'eye-slash' : 'eye'}
              fontSize={size}
              cursor="pointer"
              className={classes.eyeIcon}
              fixedWidth
            />
          )}
        />
        </Box>
      )}
    </>
  );
};

export default InputField;
