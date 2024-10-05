import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PATH } from 'constant/path';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={PATH.HOME} component={HomeStackScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
