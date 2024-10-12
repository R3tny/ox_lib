import { Box, Checkbox,Text } from '@mantine/core';
import { ICheckbox } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const CheckboxField: React.FC<Props> = (props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text sx={{ fontSize: 20, fontWeight: 500 , fontFamily:'Maron Rose, sans-serif' }}>{props.row.label}</Text>
    <Checkbox
      {...props.register}
      style={{fontFamily: 'Maron Rose, sans-serif'}}
      sx={{ display: 'flex' }}
      required={props.row.required}
      defaultChecked={props.row.checked}
      disabled={props.row.disabled}
    />
        </Box>
  );
};

export default CheckboxField;
