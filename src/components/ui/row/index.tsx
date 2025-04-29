import React, { memo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface RowProps {
  children: React.ReactNode;
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number; // Space between items
  fullWidth?: boolean; // 👈 Added fullWidth prop
  style?: ViewStyle;
}

const Row: React.FC<RowProps> = memo(({
                                        children,
                                        justifyContent = 'flex-start',
                                        alignItems = 'center',
                                        gap = 10,
                                        fullWidth = false,
                                        style,
                                      }) => {
  return (
    <View
      style={[
        styles.row,
        {
          justifyContent,
          alignItems,
          gap,
          width: fullWidth ? '100%' : undefined, // 👈 Full width if enabled
        },
        style,
      ]}
    >
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Row;
