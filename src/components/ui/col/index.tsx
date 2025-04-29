import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';

interface ColProps {
  children: React.ReactNode;
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number; // Space between items
  style?: ViewStyle;
}

const Col: React.FC<ColProps> = memo(({ children, justifyContent = 'flex-start', alignItems = 'center', gap = 10, style }) => {
  const colStyle: ViewStyle = {
    flexDirection: 'column',
    justifyContent,
    alignItems,
    gap,
  };

  return (
    <View style={[colStyle, style]}>
      {children}
    </View>
  );
});

export default Col;
