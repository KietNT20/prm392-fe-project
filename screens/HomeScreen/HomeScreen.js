// import { useGetAllPets } from '@/hooks/Pet';
// import { Text } from '@rneui/themed';
// import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

// const HomeScreen = () => {
//   const { pets } = useGetAllPets();
//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <Image
//           style={styles.image}
//           source={require('./../../assets/images/Header_Information.png')}
//         />
//       </View>
//       <View className="py-10 px-4">
//         <View>
//           <Text h3>Giới thiệu</Text>
//           <Text className="mb-3">
//             Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng thông tin
//             khổng lồ và hoàn toàn miễn phí về vấn đề xung quanh động vật, đặc
//             biệt là thú cưng, cụ thể là vấn đề thú cưng bị bỏ rơi, các thực phẩm
//             dinh dưỡng dành cho thú cưng, cách chăm sóc và điều trị bệnh cho chó
//             mèo,... Tất cả những thông tin tại Hopeful Tails Trust được sưu tầm
//             và tham khảo từ nhiều nguồn khác nhau có chọn lọc, bên cạnh đó còn
//             là trải nghiệm thực tế của chúng tôi trong quá trình nuôi thúc cưng
//             để đem đến cho mọi người những thông tin chính xác và hữu ích nhất.
//           </Text>
//         </View>
//         <View className="overflow-hidden rounded-2xl mt-3">
//           <Image
//             className="object-cover w-96 h-72"
//             resizeMode="cover"
//             source={require('../../assets/images/cat-sleep.png')}
//           />
//         </View>
//       </View>
//       <View className="flex-1 px-4">
//         <Text h3>Blog and News</Text>
//         <View></View>
//       </View>
//     </ScrollView>
//   );
// };

// export default HomeScreen;

// const windowWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: windowWidth * 1,
//     height: windowWidth * 0.8 * (9 / 16),
//     resizeMode: 'cover',
//   },
// });

// import { useGetAllPets } from '@/hooks/Pet';
// import { Text } from '@rneui/themed';
// import { Image, ScrollView, View, Dimensions } from 'react-native';

// const HomeScreen = () => {
//   const { pets } = useGetAllPets();
//   const windowWidth = Dimensions.get('window').width;

//   return (
//     <ScrollView className="bg-gray-100">
//       {/* Header Image */}
//       <View className="w-full bg-indigo-600">
//         <Image
//           className="w-full h-48 object-cover"
//           source={require('../../assets/images/Header_Information.png')}
//         />
//       </View>

//       {/* Introduction Section */}
//       <View className="p-6 bg-white rounded-t-3xl shadow-lg -mt-6">
//         <Text h3 className="text-indigo-800 font-semibold mb-4">
//           Giới thiệu
//         </Text>
//         <Text className="text-gray-600 text-base mb-5 leading-relaxed">
//           Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng thông tin
//           khổng lồ và hoàn toàn miễn phí về vấn đề xung quanh động vật, đặc biệt
//           là thú cưng, cụ thể là vấn đề thú cưng bị bỏ rơi, các thực phẩm dinh
//           dưỡng dành cho thú cưng, cách chăm sóc và điều trị bệnh cho chó
//           mèo,... Tất cả những thông tin tại Hopeful Tails Trust được sưu tầm và
//           tham khảo từ nhiều nguồn khác nhau có chọn lọc, bên cạnh đó còn là
//           trải nghiệm thực tế của chúng tôi trong quá trình nuôi thúc cưng để
//           đem đến cho mọi người những thông tin chính xác và hữu ích nhất.
//         </Text>

//         {/* Image */}
//         <View className="overflow-hidden rounded-2xl shadow-md mb-6">
//           <Image
//             className="w-full h-72 object-cover"
//             resizeMode="cover"
//             source={require('../../assets/images/cat-sleep.png')}
//           />
//         </View>
//       </View>

//       {/* Blog and News Section */}
//       <View className="px-6 pt-6 pb-10 bg-white">
//         <Text h3 className="text-indigo-800 font-semibold mb-4">
//           Blog and News
//         </Text>

//         {/* Placeholder for Blog Content */}
//         <View className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-400 shadow-sm">
//           <Text className="text-gray-700">
//             Nội dung blog và tin tức sẽ được cập nhật sớm...
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default HomeScreen;

import { useGetAllPets } from '@/hooks/Pet';
import { Text } from '@rneui/themed';
import { Image, ScrollView, View } from 'react-native';

const HomeScreen = () => {
  const { pets } = useGetAllPets();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Image */}
      <View className="relative w-full h-64">
        <Image
          source={require('../../assets/images/Header_Information.png')}
          className="w-full h-full object-cover"
        />
        <View className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <Text className="absolute bottom-5 left-5 text-white font-bold text-3xl shadow-lg">
          Welcome to Hopeful Tails Trust
        </Text>
      </View>

      {/* Introduction Section */}
      <View className="bg-white px-6 py-8 -mt-8 rounded-t-3xl shadow-xl">
        <Text className="text-2xl font-bold text-indigo-800 mb-4">
          Giới thiệu
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed mb-6">
          PawFund được xây dựng dựa trên tiêu chí cổng thông tin khổng lồ và
          hoàn toàn miễn phí về vấn đề xung quanh động vật, đặc biệt là thú
          cưng, cụ thể là vấn đề thú cưng bị bỏ rơi, các thực phẩm dinh dưỡng
          dành cho thú cưng, cách chăm sóc và điều trị bệnh cho chó mèo,... Tất
          cả những thông tin tại Hopeful Tails Trust được sưu tầm và tham khảo
          từ nhiều nguồn khác nhau có chọn lọc, bên cạnh đó còn là trải nghiệm
          thực tế của chúng tôi trong quá trình nuôi thú cưng để đem đến cho mọi
          người những thông tin chính xác và hữu ích nhất.
        </Text>

        {/* Featured Image */}
        <View className="rounded-xl overflow-hidden shadow-lg mt-4">
          <Image
            source={require('../../assets/images/cat-sleep.png')}
            className="w-full h-64 object-cover"
          />
        </View>
      </View>

      {/* Blog and News Section */}
      <View className="px-6 py-8 bg-gray-50">
        <Text className="text-2xl font-bold text-indigo-800 mb-4">
          Blog and News
        </Text>

        {/* Horizontal Divider */}
        <View className="bg-gray-300 h-px my-4" />

        {/* Placeholder for Blog Cards */}
        <View className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center">
          <Text className="text-gray-500 text-lg">Coming Soon...</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
