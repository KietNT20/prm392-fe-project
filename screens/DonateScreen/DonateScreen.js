import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Animated,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

const DonateScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [buttonScale] = useState(new Animated.Value(1));

  const handleDonate = () => {
    Alert.alert('Thank you!', `You have donated $${amount} to help the pets!`);
    setAmount('');
  };

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    handleDonate();
  };

  return (
    <ImageBackground
      source={require('../../assets/pngegg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 15,
            padding: 20,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: '#666666',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Donate to PawFund
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#666666',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Your contribution makes a world of difference!
          </Text>

          <Input
            placeholder="Enter donation amount"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#888888"
            keyboardType="numeric"
            inputStyle={{ color: '#888888', fontSize: 18 }}
            leftIcon={
              <Ionicons
                name="cash-outline"
                size={24}
                color="#888888"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 20, width: '100%' }}
            inputContainerStyle={{
              backgroundColor: '#2E2E2E',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderColor: '#FFF',
              borderWidth: 1,
            }}
          />

          <Animated.View
            style={{ transform: [{ scale: buttonScale }], width: '100%' }}
          >
            <Button
              title="Donate Now"
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              buttonStyle={{
                backgroundColor: '#6c63ff',
                borderRadius: 10,
                paddingVertical: 14,
                borderColor: '#FFF',
                borderWidth: 1,
              }}
              titleStyle={{ fontWeight: '700', fontSize: 18, color: '#FFF' }}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DonateScreen;
