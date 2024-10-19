import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/UserScreen/LoginScreen';
import RegisterScreen from './screens/UserScreen/RegisterScreen';

import SplashScreen from 'screens/SplashScreen/SplashScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import DonationScreen from 'screens/DonateScreen/DonateScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventsScreen from 'screens/EventsScreen/EventsScreen';
import EventDetail from 'screens/EventDetail/EventDetail';
import PetListingsScreen from 'screens/Pet/PetList';
import PetDetailScreen from 'screens/Pet/PetDetail';

const Stack = createStackNavigator();
// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }} // Hide header for splash screen
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen} // Add HomeScreen to the navigator
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Donation"
            component={DonationScreen} // Add HomeScreen to the navigator
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Events"
            component={EventsScreen} // Add HomeScreen to the navigator
          />
          <Stack.Screen name="PetListings" component={PetListingsScreen} />
          <Stack.Screen name="PetDetail" component={PetDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
