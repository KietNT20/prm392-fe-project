import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import AdoptPetScreen from './screens/AdoptPetScreen/AdoptPetScreen';
import DonationScreen from './screens/DonateScreen/DonateScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NewDetailScreen from './screens/New/NewDetailScreen';
import NewListingScreen from './screens/New/NewListingScreen';
import AddPetScreen from './screens/Pet/AddPetScreen';
import PetDetailScreen from './screens/Pet/PetDetailScreen';
import PetListingScreen from './screens/Pet/PetListingScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import LoginScreen from './screens/UserScreen/LoginScreen';
import RegisterScreen from './screens/UserScreen/RegisterScreen';
import { useLogout } from './hooks/useAuth';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ProfileScreen from './screens/UserScreen/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const { logout } = useLogout();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View className="mt-5 px-4">
        <TouchableOpacity
          className="bg-red-600 p-3 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// Drawer Navigator for authenticated users
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="AddPet" component={AddPetScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Donation" component={DonationScreen} />
      <Drawer.Screen name="Pet" component={PetListingScreen} />
      <Drawer.Screen name="New" component={NewListingScreen} />
      <Drawer.Screen
        name="NewDetail"
        component={NewDetailScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
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

// Main App Navigator with Authentication State
function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Adoption"
          component={AdoptPetScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
