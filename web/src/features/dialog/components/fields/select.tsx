import { MultiSelect, Select,Box,Text } from '@mantine/core';
import { ISelect } from '../../../../typings';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: ISelect;
  index: number;
  control: Control<FormValues>;
}

const SelectField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required },
  });

  return (
    <>
      {props.row.type === 'select' ? (
        <Box>
        <Text sx={{ fontSize: 20, fontWeight: 500 , fontFamily:'Maron Rose, sans-serif' }}>{props.row.label}</Text>
        <Select
        style={{fontFamily: 'Maron Rose, sans-serif'}}
          data={props.row.options}
          value={controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          onChange={controller.field.onChange}
          disabled={props.row.disabled}
          label={props.row.label}
          description={props.row.description}
          withAsterisk={props.row.required}
          clearable={props.row.clearable}
          searchable={props.row.searchable}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          dropdownPosition="flip"  // Adjusted position
          withinPortal  // Render dropdown within portal
        />
       </Box>
      ) : (
        <>
                <Box>
                <Text sx={{ fontSize: 20, fontWeight: 500 , fontFamily:'Maron Rose, sans-serif' }}>{props.row.label}</Text>
          {props.row.type === 'multi-select' && (
            <MultiSelect
            style={{fontFamily: 'Maron Rose, sans-serif'}}
              data={props.row.options}
              value={controller.field.value}
              name={controller.field.name}
              ref={controller.field.ref}
              onBlur={controller.field.onBlur}
              onChange={controller.field.onChange}
              disabled={props.row.disabled}
              description={props.row.description}
              withAsterisk={props.row.required}
              clearable={props.row.clearable}
              searchable={props.row.searchable}
              maxSelectedValues={props.row.maxSelectedValues}
              icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
              dropdownPosition="flip"  // Adjusted position
              withinPortal  // Render dropdown within portal
            />
          )}
          </Box>
        </>
      )}
    </>
  );
};

export default SelectField;
