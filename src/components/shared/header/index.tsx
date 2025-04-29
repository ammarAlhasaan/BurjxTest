import React, {memo, ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackArrow, Row, Text} from '@/src/components/ui';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface HeaderProps {
  title: ReactNode;
  leftAction?: {
    icon: ReactNode;
    onPress: () => void;
  };
  rightAction?: {
    icon: ReactNode;
    onPress: () => void;
  };
  showBack?: boolean;
}

const HeaderActionButton = ({onPress, children}: { onPress: () => void, children: React.ReactNode }) => {
  return (
    <TouchableOpacity
      className="rounded-full bg-white/10 w-[48px] h-[48px] items-center justify-center"
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
const Header = ({title, leftAction, rightAction, showBack}: HeaderProps) => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[{paddingTop: safeAreaInsets.top}]} className="bg-transparent px-2">
      <Row justifyContent="space-between" alignItems="center" fullWidth>
        <View className="w-[48px] h-[48px]">
          {showBack ? (
            <HeaderActionButton
              onPress={() => navigation.goBack()}
            >
              <BackArrow/>
            </HeaderActionButton>
          ) : leftAction ? (
            <HeaderActionButton
              onPress={leftAction.onPress}
            >
              {leftAction.icon}
            </HeaderActionButton>
          ) : null}
        </View>

        <View className="flex-1 items-center">
          {typeof title === 'string' ? <Text>{title}</Text> : title}
        </View>

        <View className="w-[48px]">
          {rightAction && (
            <HeaderActionButton
              onPress={rightAction.onPress}
            >
              {rightAction.icon}
            </HeaderActionButton>
          )}
        </View>
      </Row>
    </View>
  );
};


const arePropsEqual = (prevProps: HeaderProps, nextProps: HeaderProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.showBack === nextProps.showBack &&
    JSON.stringify(prevProps.leftAction) === JSON.stringify(nextProps.leftAction) &&
    JSON.stringify(prevProps.rightAction) === JSON.stringify(nextProps.rightAction)
  );
};

export default memo(Header, arePropsEqual);
