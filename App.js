import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from './screens/UserScreen/LoginScreen';
import RegisterScreen from './screens/UserScreen/RegisterScreen';
import DonationScreen from './screens/DonateScreen/DonateScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import PetListingScreen from './screens/Pet/PetListingScreen';
import PetDetailScreen from './screens/Pet/PetDetailScreen';
import AddPetScreen from './screens/Pet/AddPetScreen';

import { useNavigation } from '@react-navigation/native';
import storageMethod from './utils/storageMethod';

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function LogoutScreen() {
  const navigation = useNavigation();

  React.useEffect(() => {
    // Clear token and navigate to Login screen
    storageMethod.remove('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Splash">
          <Drawer.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }, // Hide SplashScreen from Drawer
            }}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }, // Hide LoginScreen from Drawer
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }, // Hide RegisterScreen from Drawer
            }}
          />
          <Drawer.Screen name="AddPet" component={AddPetScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Donation" component={DonationScreen} />
          <Drawer.Screen name="Pet" component={PetListingScreen} />
          <Drawer.Screen
            name="PetDetail"
            component={PetDetailScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }, // Hide PetDetailScreen from Drawer
            }}
          />
          {/* Add the Logout option */}
          <Drawer.Screen
            name="Logout"
            component={LogoutScreen}
            options={{
              headerShown: false,
              drawerLabel: 'Logout',
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
