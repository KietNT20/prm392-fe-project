import { useGetAllPets } from '@/hooks/Pet';
import { Text } from '@rneui/themed';
import { Image, ScrollView, View } from 'react-native';

const HomeScreen = () => {
  const { pets } = useGetAllPets();

  return (
    // <ScrollView className="flex-1 bg-gray-100">
    //   {/* Header Image */}
    //   <View className="relative w-full h-48 md:h-64">
    //     <Image
    //       source={require('../../assets/images/Header_Information.png')}
    //       className="w-full h-full object-cover"
    //     />
    //     <View className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    //     <Text className="absolute bottom-5 left-5 text-white font-bold text-3xl shadow-lg">
    //       Welcome to Hopeful Tails Trust
    //     </Text>
    //   </View>

    //   {/* Introduction Section */}
    //   <View className="bg-white px-4 md:px-6 py-6 md:py-8 -mt-6 md:-mt-8 rounded-t-2xl md:rounded-t-3xl shadow-xl">
    //     <Text className="text-4xl font-extrabold text-indigo-900 mb-4 tracking-wide ">
    //       Giới thiệu
    //     </Text>
    //     <Text className="text-gray-700 text-base leading-relaxed mb-5 ">
    //       Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng thông tin
    //       khổng lồ và hoàn toàn miễn phí về vấn đề xung quanh động vật, đặc biệt
    //       là thú cưng, cụ thể là vấn đề thú cưng bị bỏ rơi, các thực phẩm dinh
    //       dưỡng dành cho thú cưng, cách chăm sóc và điều trị bệnh cho chó
    //       mèo,... Tất cả những thông tin tại Hopeful Tails Trust được sưu tầm và
    //       tham khảo từ nhiều nguồn khác nhau có chọn lọc, bên cạnh đó còn là
    //       trải nghiệm thực tế của chúng tôi trong quá trình nuôi thú cưng để đem
    //       đến cho mọi người những thông tin chính xác và hữu ích nhất.
    //     </Text>

    //     {/* Featured Image */}
    //     <View className="rounded-xl overflow-hidden shadow-lg mt-4">
    //       <Image
    //         source={require('../../assets/images/cat-sleep.png')}
    //         className="w-full h-64 object-cover"
    //       />
    //     </View>
    //   </View>

    //   {/* Blog and News Section */}
    //   <View className="px-6 py-8 bg-gray-50">
    //     <Text className="text-2xl font-bold text-indigo-800 mb-4">
    //       Blog and News
    //     </Text>

    //     {/* Horizontal Divider */}
    //     <View className="bg-gray-300 h-px my-4" />

    //     {/* Placeholder for Blog Cards */}
    //     <View className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center">
    //       <Text className="text-gray-500 text-lg">Coming Soon...</Text>
    //     </View>
    //   </View>
    // </ScrollView>

    // <ScrollView className="flex-1 bg-gradient-to-b from-gray-100 via-white to-gray-50">
    //   {/* Header Image */}
    //   <View className="relative w-full h-48 md:h-64 shadow-lg">
    //     <Image
    //       source={require('../../assets/images/Header_Information.png')}
    //       className="w-full h-full object-cover rounded-b-3xl"
    //     />
    //     <View className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-b-3xl" />
    //     <Text className="absolute bottom-6 left-6 text-white font-extrabold text-3xl md:text-4xl shadow-lg tracking-wide">
    //       Welcome to Hopeful Tails Trust
    //     </Text>
    //   </View>

    //   {/* Introduction Section */}
    //   <View className="bg-white px-5 md:px-8 py-8 md:py-10 -mt-6 md:-mt-8 rounded-t-3xl shadow-2xl border-t border-gray-200">
    //     <Text className="text-4xl font-extrabold text-indigo-900 mb-4 tracking-wide text-center">
    //       Giới thiệu
    //     </Text>
    //     <Text className="text-gray-700 text-base md:text-lg leading-relaxed mb-5 text-justify">
    //       Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng thông tin
    //       khổng lồ và hoàn toàn miễn phí về vấn đề xung quanh động vật, đặc biệt
    //       là thú cưng, cụ thể là vấn đề thú cưng bị bỏ rơi, các thực phẩm dinh
    //       dưỡng dành cho thú cưng, cách chăm sóc và điều trị bệnh cho chó mèo,
    //       và nhiều hơn thế nữa. Tất cả những thông tin tại Hopeful Tails Trust
    //       được sưu tầm và tham khảo từ nhiều nguồn khác nhau có chọn lọc, cùng
    //       với kinh nghiệm thực tế của chúng tôi để cung cấp thông tin chính xác
    //       và hữu ích nhất cho mọi người.
    //     </Text>

    //     {/* Featured Image */}
    //     <View className="rounded-xl overflow-hidden shadow-lg mt-6">
    //       <Image
    //         source={require('../../assets/images/cat-sleep.png')}
    //         className="w-full h-64 object-cover"
    //       />
    //     </View>
    //   </View>

    //   {/* Blog and News Section */}
    //   <View className="px-6 py-8 bg-gradient-to-b from-gray-50 to-gray-100">
    //     <Text className="text-3xl font-semibold text-indigo-800 mb-6 tracking-wide text-center">
    //       Blog and News
    //     </Text>

    //     {/* Horizontal Divider */}
    //     <View className="bg-gray-300 h-px my-6" />

    //     {/* Placeholder for Blog Cards */}
    //     <View className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center border border-gray-200">
    //       <Text className="text-gray-500 text-lg">Coming Soon...</Text>
    //     </View>
    //   </View>
    // </ScrollView>

    <ScrollView className="flex-1 bg-gradient-to-b from-gray-100 via-white to-gray-50">
      {/* Header Image */}
      <View className="relative h-64">
        <Image
          source={require('../../assets/images/Header_Information.png')}
          className="w-full h-full"
        />
        <View className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-b-3xl" />
        <Text className="absolute bottom-6 left-6 text-white font-extrabold text-3xl md:text-4xl shadow-lg tracking-wide">
          Welcome to Hopeful Tails Trust
        </Text>
      </View>

      {/* Introduction Section */}
      <View className="bg-white px-5 md:px-8 py-10 md:py-12 -mt-6 md:-mt-8 rounded-t-3xl shadow-2xl border-t border-gray-200">
        <Text className="text-5xl md:text-6xl font-black text-indigo-900 mb-6 tracking-wide text-center uppercase">
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
        <View className="rounded-xl overflow-hidden shadow-lg mt-6">
          <Image
            source={require('../../assets/images/cat-sleep.png')}
            className="w-full h-64 object-cover"
          />
        </View>
      </View>

      {/* Blog and News Section */}
      <View className="px-6 py-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <Text className="text-3xl font-semibold text-indigo-800 mb-6 tracking-wide text-center">
          Blog and News
        </Text>

        {/* Horizontal Divider */}
        <View className="bg-gray-300 h-px my-6" />

        {/* Placeholder for Blog Cards */}
        <View className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center border border-gray-200">
          <Text className="text-gray-500 text-lg">Coming Soon...</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
