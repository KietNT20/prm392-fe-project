import storageMethod from "@/utils/storageMethod";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const _onLogout = async () => {
    try {
      console.log("Logging out...");
      // Xóa token trước
      await storageMethod.remove();
      // Lấy navigation root từ props và điều hướng
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("./../../assets/images/Header_Information.png")}
        />
      </View>
      <View className="py-10 px-4">
        <View>
          <Text className="font-bold text-lg mb-3">Giới thiệu</Text>
          <Text className="mb-3">
            Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng thông tin
            khổng lồ và hoàn toàn miễn phí về vấn đề xung quanh động vật, đặc
            biệt là thú cưng, cụ thể là vấn đề thú cưng bị bỏ rơi, các thực phẩm
            dinh dưỡng dành cho thú cưng, cách chăm sóc và điều trị bệnh cho chó
            mèo,... Tất cả những thông tin tại Hopeful Tails Trust được sưu tầm
            và tham khảo từ nhiều nguồn khác nhau có chọn lọc, bên cạnh đó còn
            là trải nghiệm thực tế của chúng tôi trong quá trình nuôi thúc cưng
            để đem đến cho mọi người những thông tin chính xác và hữu ích nhất.
          </Text>
          <Button onPress={_onLogout} size="md">
            Medium
          </Button>
        </View>
        <View className="overflow-hidden rounded-2xl mt-3">
          <Image
            className="object-cover w-96 h-72"
            resizeMode="cover"
            source={require("../../assets/images/cat-sleep.png")}
          />
        </View>
      </View>
      <View>
        <Text>Blog and News</Text>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: windowWidth * 1,
    height: windowWidth * 0.8 * (9 / 16),
    resizeMode: "cover",
  },
});
