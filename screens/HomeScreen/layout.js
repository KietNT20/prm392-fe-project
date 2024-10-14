import { ImageBackground, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        className="flex-1"
        source={require('./../../assets/images/Header_Information.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default HomeScreen;
