import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DonationScreen from './screens/DonateScreen/DonateScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddPetScreen from './screens/Pet/AddPetScreen';
import PetDetailScreen from './screens/Pet/PetDetailScreen';
import PetListingScreen from './screens/Pet/PetListingScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import LoginScreen from './screens/UserScreen/LoginScreen';
import RegisterScreen from './screens/UserScreen/RegisterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="AddPet" component={AddPetScreen} />
      <Drawer.Screen name="Donation" component={DonationScreen} />
      <Drawer.Screen name="Pet" component={PetListingScreen} />
      <Drawer.Screen
        name="PetDetail"
        component={PetDetailScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
