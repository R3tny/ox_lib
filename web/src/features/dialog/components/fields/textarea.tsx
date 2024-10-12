import { Textarea, Box, Text } from '@mantine/core';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ITextarea } from '../../../../typings/dialog';
import React from 'react';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: ITextarea;
  index: number;
}

const TextareaField: React.FC<Props> = (props) => {
  return (
    <Box>
    <Text sx={{ fontSize: 20, fontWeight: 500 , fontFamily:'Maron Rose, sans-serif' }}>{props.row.label}</Text>
    <Textarea
      {...props.register}
      defaultValue={props.row.default}
      description={props.row.description}
      icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
      placeholder={props.row.placeholder}
      disabled={props.row.disabled}
      withAsterisk={props.row.required}
      autosize={props.row.autosize}
      minRows={props.row.min}
      maxRows={props.row.max}
    />
    </Box>
  );
};

export default TextareaField;
