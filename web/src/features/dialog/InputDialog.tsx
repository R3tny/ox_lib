import { Button, Group, Modal, Stack, useMantineTheme, ScrollArea, createStyles, Text } from '@mantine/core';
import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useLocales } from '../../providers/LocaleProvider';
import { fetchNui } from '../../utils/fetchNui';
import type { InputProps } from '../../typings';
import { OptionValue } from '../../typings';
import InputField from './components/fields/input';
import CheckboxField from './components/fields/checkbox';
import SelectField from './components/fields/select';
import NumberField from './components/fields/number';
import SliderField from './components/fields/slider';
import { useFieldArray, useForm } from 'react-hook-form';
import ColorField from './components/fields/color';
import DateField from './components/fields/date';
import TextareaField from './components/fields/textarea';
import TimeField from './components/fields/time';
import dayjs from 'dayjs';
import bg from '../../photo/mask-news.png';
import bg2 from '../../photo/menu-shadow-left-mobile.png';
import bgdvd from '../../photo/context.png';
import bgg from '../../photo/bg2.png'

export type FormValues = {
  test: {
    value: any;
  }[];
};
const useStyles = createStyles((theme) => ({
  
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
  divider: {
    position: 'absolute',
    top: -20,
    left: '0',
    width: '100%',
    height: 'auto',
    zIndex: 2,
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
  header: {
    fontFamily: 'Maron Rose, sans-serif',
    textShadow: '2px 1px 1px rgba(0, 0, 0, 0.3)',
  },
}));

const InputDialog: React.FC = () => {
  const [fields, setFields] = React.useState<InputProps>({
    heading: '',
    rows: [{ type: 'input', label: '' }],
  });
  const [visible, setVisible] = React.useState(false);
  const { locale } = useLocales();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const form = useForm<{ test: { value: any }[] }>({});
  const fieldForm = useFieldArray({
    control: form.control,
    name: 'test',
  });
  const playSound = () => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/league-of-legend-client-button.mp3');
    audio.play();
  };

  const handleMouseDown = () => {
    playSound();
  };

  useNuiEvent<InputProps>('openDialog', (data) => {
    setFields(data);
    setVisible(true);
    data.rows.forEach((row, index) => {
      fieldForm.insert(
        index,
        {
          value:
            row.type !== 'checkbox'
              ? row.type === 'date' || row.type === 'date-range' || row.type === 'time'
                ? // Set date to current one if default is set to true
                  row.default === true
                  ? new Date().getTime()
                  : Array.isArray(row.default)
                  ? row.default.map((date) => new Date(date).getTime())
                  : row.default && new Date(row.default).getTime()
                : row.default
              : row.checked,
        }
      );
      // Backwards compat with new Select data type
      if (row.type === 'select' || row.type === 'multi-select') {
        row.options = row.options.map((option) =>
          !option.label ? { ...option, label: option.value } : option
        ) as Array<OptionValue>;
      }
    });
  });

  useNuiEvent('closeInputDialog', async () => await handleClose(true));

  const handleClose = async (dontPost?: boolean) => {
    setVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 200));
    form.reset();
    fieldForm.remove();
    if (dontPost) return;
    fetchNui('inputData');
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setVisible(false);
    const values: any[] = [];
    for (let i = 0; i < fields.rows.length; i++) {
      const row = fields.rows[i];

      if ((row.type === 'date' || row.type === 'date-range') && row.returnString) {
        if (!data.test[i]) continue;
        data.test[i].value = dayjs(data.test[i].value).format(row.format || 'DD/MM/YYYY');
      }
    }
    Object.values(data.test).forEach((obj: { value: any }) => values.push(obj.value));
    await new Promise((resolve) => setTimeout(resolve, 200));
    form.reset();
    fieldForm.remove();
    fetchNui('inputData', values);
  });

  return (
    <>
     {visible && (
      <>
    <img className={classes.img} src={bg} alt=""/>
    <img  src={bg2} alt=""/>
    <img className={classes.img2} src={bg} alt=""/>
    </>
    )}
      <Modal
        opened={visible}
        onClose={handleClose}
        radius={'md'}
        centered
        closeOnEscape={fields.options?.allowCancel !== false}
        closeOnClickOutside={false}
        size="sm"
        styles={{
          title: {
            textAlign: 'center',
            width: '100%',
            fontSize: 24,
          },
        }}
        withCloseButton={false}
        overlayOpacity={0.0}
        transitionDuration={500}
        transition="fade"
        exitTransitionDuration={300}
      >
<Text className={classes.header} align='center' size={50}>{fields.heading}</Text>
<img className={classes.bg} src={bgg} alt=""/>
  <img className={classes.divider}  src={bgdvd} alt=""/>
   <ScrollArea.Autosize
  maxHeight={'70vh'}
  scrollbarSize={8}
  placeholder="Your placeholder text"
  onPointerEnterCapture={() => {/* handler code */}}
  onPointerLeaveCapture={() => {/* handler code */}}
>
          <form onSubmit={onSubmit} style={{ padding: 30}}>
            <Stack>
              {fieldForm.fields.map((item, index) => {
                const row = fields.rows[index];
                return (
                  <React.Fragment key={item.id}>
                    {row.type === 'input' && (
                      <InputField
                        register={form.register(`test.${index}.value`, { required: row.required })}
                        row={row}
                        index={index}
                      />
                    )}
                    {row.type === 'checkbox' && (
                      <CheckboxField
                        register={form.register(`test.${index}.value`, { required: row.required })}
                        row={row}
                        index={index}
                      />
                    )}
                    {(row.type === 'select' || row.type === 'multi-select') && (
                      <SelectField row={row} index={index} control={form.control} />
                    )}
                    {row.type === 'number' && <NumberField control={form.control} row={row} index={index} />}
                    {row.type === 'slider' && <SliderField control={form.control} row={row} index={index} />}
                    {row.type === 'color' && <ColorField control={form.control} row={row} index={index} />}
                    {row.type === 'time' && <TimeField control={form.control} row={row} index={index} />}
                    {row.type === 'date' || row.type === 'date-range' ? (
                      <DateField control={form.control} row={row} index={index} />
                    ) : null}
                    {row.type === 'textarea' && (
                      <TextareaField
                        register={form.register(`test.${index}.value`, { required: row.required })}
                        row={row}
                        index={index}
                      />
                    )}
                  </React.Fragment>
                );
              })}
              <Group position="center" spacing={10}>
                {/* <Button
                  uppercase
                  variant="default"
                  onClick={() => handleClose()}
                  mr={3}
                  disabled={fields.options?.allowCancel === false}
                >
                  {locale.ui.cancel}
                </Button> */}
                <Button onMouseDown={handleMouseDown} uppercase variant="light" type="submit" style={{fontSize: 20, fontWeight: 500, fontFamily:'Maron Rose, sans-serif'}}>
                {locale.ui.confirm || 'Conferma'}
                </Button>
              </Group>
            </Stack>
          </form>
        </ScrollArea.Autosize>
      </Modal>
    </>
  );
};
export default InputDialog;

