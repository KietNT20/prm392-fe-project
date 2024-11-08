import { Ionicons } from '@expo/vector-icons';
import { useLogin } from 'hooks/useAuth';
import { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useLogin();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }
    try {
      // console.log('Attempting login with:', { email, password });
      await login({
        identifier: email.trim(),
        password: password.trim(),
      });
    } catch (error) {
      console.error('Login handler error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/pngegg.png')}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-black/50 px-5 py-10 justify-center items-center">
          <Text className="text-2xl font-bold text-center mb-2 text-white">
            Welcome Back to PawFund!
          </Text>
          <Text className="text-base text-center mb-5 text-gray-300">
            Log in to continue helping pets in need
          </Text>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="mail-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 15 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 15 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />

          <Button
            title={isLoading ? 'Logging in...' : 'Log In'}
            onPress={handleLogin}
            disabled={isLoading}
            buttonStyle={{
              backgroundColor: '#6c63ff',
              borderRadius: 8,
              width: '100%',
              paddingVertical: 15,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
            containerStyle={{ width: '100%', marginBottom: 10 }}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-center text-indigo-500 mt-5 text-sm">
              Don't have an account? Register here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;
