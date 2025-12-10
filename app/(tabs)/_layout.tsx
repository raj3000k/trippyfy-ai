import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
   <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor:'black', tabBarInactiveTintColor:'#808080'}}>
    <Tabs.Screen name='MyTrip' options={{
      tabBarIcon:({color})=><>
        <Ionicons name="location" size={24} color={color} />
         </>,
         tabBarLabel: 'My trips'
    }}/>
    <Tabs.Screen name='Profile' options={{
      tabBarIcon:({color})=><>
        <Ionicons name="people-circle" size={24} color={color} />
         </>,
         tabBarLabel: 'Profile'
    }}/>
   </Tabs>
  )
}