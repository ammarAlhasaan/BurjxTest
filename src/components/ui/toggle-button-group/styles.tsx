import {tva} from '@gluestack-ui/nativewind-utils/tva/index';

export const tabButtonStyle = tva({
  base: 'items-center rounded-lg p-3',
  variants: {
    active: {
      true: 'bg-primary-500',
    },
  },
});

export const tabTextStyle = tva({
  base: '',
  variants: {
    active: {
      true: 'text-typography-0',
    },
  },
});
