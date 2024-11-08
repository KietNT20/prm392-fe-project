// RootNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { useAuthContext } from './context/AuthContext';
import AdoptPetScreen from './screens/AdoptPetScreen/AdoptPetScreen';
import CartDetailScreen from './screens/CartScreen/CartDetailScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import DonateScreen from './screens/DonateScreen/DonateScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NewDetailScreen from './screens/New/NewDetailScreen';
import NewListingScreen from './screens/New/NewListingScreen';
import AddPetScreen from './screens/Pet/AddPetScreen';
import PetDetailScreen from './screens/Pet/PetDetailScreen';
import PetListingScreen from './screens/Pet/PetListingScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import LoginScreen from './screens/UserScreen/LoginScreen';
import ProfileScreen from './screens/UserScreen/ProfileScreen';
import RegisterScreen from './screens/UserScreen/RegisterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator for authenticated users
function DrawerNavigator() {
  const { profile } = useSelector((state) => state.userProfile);

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen
        name="Donation"
        component={DonateScreen}
        options={{
          drawerItemStyle: {
            display: profile?.role === 'user' ? 'flex' : 'none',
          },
        }}
      />
      <Drawer.Screen name="Pet" component={PetListingScreen} />
      <Drawer.Screen name="New" component={NewListingScreen} />
      <Drawer.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{
          drawerItemStyle: {
            display: profile?.role === 'admin' ? 'flex' : 'none',
          },
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          drawerItemStyle: {
            display: profile?.role === 'admin' ? 'flex' : 'none',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

// Main App Navigator with Authentication State
function RootNavigator() {
  const { userToken } = useAuthContext();
  const { profile } = useSelector((state) => state.userProfile);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={SplashScreen} />
        {userToken ? (
          <>
            <Stack.Screen
              name="App"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Adoption"
              component={AdoptPetScreen}
              options={{ headerShown: true, title: 'Adopt Pet' }}
            />
            <Stack.Screen
              name="CartDetailScreen"
              component={CartDetailScreen}
              options={{
                headerShown: false,
                drawerItemStyle: {
                  display: profile?.role === 'user' ? 'flex' : 'none',
                },
              }}
            />
            <Stack.Screen
              name="NewDetail"
              component={NewDetailScreen}
              options={{
                headerShown: false,
                drawerItemStyle: {
                  display: profile?.role === 'user' ? 'flex' : 'none',
                },
              }}
            />
            <Stack.Screen
              name="PetDetail"
              component={PetDetailScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
