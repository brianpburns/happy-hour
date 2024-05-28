import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Map View',
          tabBarIcon: ({ color }) => <TabBarIcon name='map' color={color} />,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'List View',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='list-ul' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
