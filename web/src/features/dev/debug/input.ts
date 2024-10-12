import { debugData } from '../../../utils/debugData';
import type { InputProps } from '../../../typings';

export const debugInput = () => {
  debugData<InputProps>([
    {
      action: 'openDialog',
      data: {
        heading: 'Police locker',
        rows: [
          {
            type: 'input',
            label: 'Locker number',
            placeholder: '420',
            description: 'Description that tells you what this input field does',
          },
          {
            type: 'time',
            format: '12',
            label: 'Locker Time',
            description: 'Description that tells you what this input field does',
          },
          {
            type: 'date',
            format: '12',
            label: 'Locker Time',
            description: 'Description that tells you what this input field does',
          },
          {
            type: 'color',
            label: 'Locker Time',
            description: 'Description that tells you what this input field does',
          },
          { type: 'checkbox', label: 'Some checkbox' },
          { type: 'input', label: 'Locker PIN', password: true, icon: 'lock' },
          { type: 'checkbox', label: 'Some other checkbox', checked: true },
          {
            type: 'select',
            label: 'Locker type',
            options: [
              { value: 'option1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ],
          },
          {
            type: 'multi-select',
            label: 'des type',
            options: [
              { value: 'option1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
              { value: 'option4', label: 'Option 4' },
              { value: 'option5', label: 'Option 5' },
              { value: 'option6', label: 'Option 6' },
            ],
          },
          {
            type: 'slider',
            label: 'Locker number',
            min: 0,
            max: 100,

          },
          {
            type: 'number',
            label: 'Number counter',
            default: 12,
            min: 3,
            max: 10,
            icon: 'receipt',
          },
          {
            type: 'number',
            label: 'Price',
            default: 6.5,
            min: 0,
            max: 10,
            icon: 'receipt',
          },
          {
            type: 'slider',
            label: 'Slide bar',
            min: 10,
            max: 50,
            step: 2,
          },
        ],
      },
    },
  ]);
};
