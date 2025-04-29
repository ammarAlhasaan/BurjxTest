import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const BackArrowComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M5.646 10.646a.5.5 0 0 0 0 .708l3.182 3.182a.5.5 0 1 0 .708-.708L6.707 11l2.829-2.828a.5.5 0 1 0-.708-.708l-3.182 3.182ZM16 11.5a.5.5 0 0 0 0-1v1Zm-10 0h10v-1H6v1Z"
    />
  </Svg>
);
const BackArrow = memo(BackArrowComponent);
export default BackArrow;
