import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useFilterPubs } from 'src/features/shared/hooks/use-filter-pubs';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../useColorScheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const filterPubs = useFilterPubs();

  const tabPressListener = {
    tabPress: () => {
      filterPubs('all');
    },
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map View',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
        listeners={tabPressListener}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'List View',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list-ul" color={color} />,
        }}
        listeners={tabPressListener}
      />
    </Tabs>
  );
}
