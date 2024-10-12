import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        control: 'E',
        text: 'Accedi all\'inventario',
        position: 'right-center',
        icon: 'door-open',
      },
    },
    {
      action: 'textUi',
      data: {
        control: 'Z',
        text: 'Prega il signor Karuz',
        position: 'right-center',
        icon: 'door-open',
      },
    },
  ]);
};
