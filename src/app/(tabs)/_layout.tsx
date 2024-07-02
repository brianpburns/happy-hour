import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { usePubsContext } from 'src/state/pubs-context';
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
  // This gets around a bug with position not updating if the same pub is selected in the list view
  const { setLatitude } = usePubsContext();

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
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'List View',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list-ul" color={color} />,
        }}
        listeners={{
          tabPress: () => setLatitude(0),
        }}
      />
    </Tabs>
  );
}
