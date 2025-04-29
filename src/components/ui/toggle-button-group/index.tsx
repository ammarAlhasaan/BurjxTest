import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {HStack, Text} from '@/src/components/ui';
import type {VariantProps} from '@gluestack-ui/nativewind-utils';
import {tabButtonStyle, tabTextStyle} from './styles';


interface Tab {
  value: string;
  label: string;
}

interface ToggleButtonGroupProps {
  tabs: Tab[];
  onTabChange: (selectedTab: string) => void;
}

type ITabButtonStyleProps = React.ComponentProps<typeof TouchableOpacity> &
  VariantProps<typeof tabButtonStyle>;
type ITabTextStyleProps = React.ComponentProps<typeof Text> &
  VariantProps<typeof tabTextStyle>;

const TabButton = ({value, active, className, ...props}: ITabButtonStyleProps & { value: string }) => {
  return (
    <TouchableOpacity
      className={tabButtonStyle({active, class: className})}
      key={value}
      {...props}
    />
  );
};
const TabText = ({active, className, ...props}: ITabTextStyleProps) => {
  return (
    <Text
      className={tabTextStyle({active, class: className})}
      {...props}
    />
  );
};
const ToggleButtonGroup = ({tabs, onTabChange}: ToggleButtonGroupProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.value); // Default selected tab

  const handleTabChange = (tabValue: string) => {
    setSelectedTab(tabValue);
    onTabChange(tabValue); // Pass the selected tab value to parent
  };

  return (
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
  );
};

export default ToggleButtonGroup;
