import React, {memo, useState} from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { HStack, Text } from '@/src/components/ui';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

export const tabButtonStyle = tva({
  base: 'items-center pb-3 px-4 border-b-2 border-transparent',
  variants: {
    active: {
      true: 'border-primary-500',
    },
  },
});

export const tabTextStyle = tva({
  base: 'text-typography-950/50 text-xl',
  variants: {
    active: {
      true: 'text-typography-950',
    },
  },
});

interface Tab {
  value: string;
  label: string;
}

interface ScrollableTabsProps {
  tabs: Tab[];
  onTabChange: (selectedTab: string) => void;
}

type ITabButtonStyleProps = React.ComponentProps<typeof TouchableOpacity> &
  VariantProps<typeof tabButtonStyle>;

type ITabTextStyleProps = React.ComponentProps<typeof Text> &
  VariantProps<typeof tabTextStyle>;

const TabButton = ({ value, active, className, ...props }: ITabButtonStyleProps & { value: string }) => {
  return (
    <TouchableOpacity
      className={tabButtonStyle({ active, class: className })}
      key={value}
      {...props}
    />
  );
};

const TabText = ({ active, className, ...props }: ITabTextStyleProps) => {
  return (
    <Text
      className={tabTextStyle({ active, class: className })}
      {...props}
    />
  );
};

const ScrollableTabs = ({ tabs, onTabChange }: ScrollableTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.value);

  const handleTabChange = (tabValue: string) => {
    setSelectedTab(tabValue);
    onTabChange(tabValue);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      <HStack space="lg">
        {tabs.map((tab) => (
          <TabButton
            key={tab.value}
            value={tab.value}
            active={selectedTab === tab.value}
            onPress={() => handleTabChange(tab.value)}
          >
            <TabText active={selectedTab === tab.value}>
              {tab.label}
            </TabText>
          </TabButton>
        ))}
      </HStack>
    </ScrollView>
  );
};

export default memo(ScrollableTabs);
