import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DonationScreen from 'screens/DonateScreen/DonateScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import SplashScreen from 'screens/SplashScreen/SplashScreen';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Splash">
          <Drawer.Screen name="Splash" component={SplashScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen
            name="Home"
            component={HomeScreen} // Add HomeScreen to the navigator
          />
          <Drawer.Screen
            name="Donation"
            component={DonationScreen} // Add HomeScreen to the navigator
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );s
}
