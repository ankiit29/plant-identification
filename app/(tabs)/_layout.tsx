import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#2d6a4f',
        tabBarInactiveTintColor: '#666666',
        headerStyle: {
          backgroundColor: '#2d6a4f',
        },
        headerTintColor: '#ffffff',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Identify',
          headerTitle: 'Plant Identification',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          headerTitle: 'Plant Library',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          headerTitle: 'Distribution Map',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}