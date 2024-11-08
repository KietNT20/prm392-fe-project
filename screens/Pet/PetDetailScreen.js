import { useAddCartPet } from '@/hooks/CartPet';
import { usePetDetail, useUpdatePet } from '@/hooks/Pet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PetDetailScreen = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editablePet, setEditablePet] = useState(pet);
  const [originalPet, setOriginalPet] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { petId, imageUrl } = route.params;
  const { pet } = usePetDetail(petId);
  const updatePetMutation = useUpdatePet();

  const { addCartPet } = useAddCartPet();

  useEffect(() => {
    if (pet) {
      setEditablePet(pet);
      setOriginalPet(pet);
    }
  }, [pet]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (key, value) => {
    setEditablePet({ ...editablePet, [key]: value });
  };

  const handleRequestAdoption = () => {
    Alert.alert('Adoption process started');
    navigation.navigate('Adoption');
  };

  const handleCancel = () => {
    setEditablePet(originalPet);
    setIsEditMode(false);
  };

  const handleSave = () => {
    updatePetMutation.mutate(
      {
        id: petId,
        updatedPetData: editablePet,
      },
      {
        onSuccess: (response) => {
          if (response && response.pet) {
            const updatedPet = response.pet;
            setEditablePet(updatedPet);
            setIsEditMode(false);
            Alert.alert('Success', 'Pet details updated successfully.');
          } else {
            Alert.alert('Error', 'Pet update response is missing data.');
          }
        },
        onError: (err) => {
          Alert.alert('Error', `Failed to update pet details: ${err.message}`);
        },
      },
    );
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-peach-100 to-yellow-50">
      <View className="flex-1 p-6 m-4 bg-slate-300/90 rounded-3xl shadow-xl border border-yellow-100">
        <TouchableOpacity
          className="absolute top-12 left-5 z-10 rounded-full bg-yellow-200 p-2 shadow-md"
          onPress={() => navigation.navigate('Pet')}
        >
          <Ionicons name="arrow-back" size={24} color="#FF6D6D" />
        </TouchableOpacity>

        {isEditMode ? (
          <View className="absolute top-12 right-5 flex-row space-x-3 z-10">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-green-500 p-2 rounded-full shadow-md"
            >
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              className="bg-red-500 p-2 rounded-full shadow-md"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{ zIndex: 50 }}
            className="absolute top-11 right-5 bg-red-500 p-2 rounded-full shadow-lg"
            onPress={toggleEditMode}
          >
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        )}

        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64 rounded-xl mb-4 shadow-lg"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
        </View>

        {isEditMode ? (
          <View>
            <TextInput
              value={editablePet?.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Pet Name"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />
          </View>
        ) : (
          <View className="bg-white/80 p-5 rounded-xl shadow-lg mb-5">
            <Text className="text-3xl font-bold text-pink-700 mb-3 text-center">
              {pet?.name}
            </Text>

            <View className="flex-row items-center space-x-2 mb-2 justify-center">
              <MaterialIcons name="pets" size={22} color="#FF6D6D" />
              <Text className="text-lg text-gray-800 font-medium">
                {pet?.breed}
              </Text>
            </View>

            <View className="space-y-2">
              <Text className="text-base text-gray-700 flex-row items-center">
                <Ionicons name="time-outline" size={18} color="#FF6D6D" />
                <Text className="ml-1">Age: {pet?.age} years</Text>
              </Text>

              <Text className="text-base text-gray-700 flex-row items-center">
                <Ionicons
                  name="male-female-outline"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">Sex: {pet?.sex}</Text>
              </Text>

              <Text className="text-base text-gray-700 flex-row items-center">
                <Ionicons name="paw-outline" size={18} color="#FF6D6D" />
                <Text className="ml-1">Species: {pet?.species}</Text>
              </Text>

              <Text className="text-base text-gray-700 flex-row items-center">
                <MaterialIcons name="color-lens" size={18} color="#FF6D6D" />
                <Text className="ml-1">Coat Color: {pet?.coatColor}</Text>
              </Text>

              <Text className="text-base text-gray-700 flex-row items-center">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">
                  Vaccinated: {pet?.vaccinated ? 'Yes' : 'No'}
                </Text>
              </Text>
            </View>

            <Text className="text-base text-gray-800 italic bg-blue-50/60 p-4 mt-4 rounded-lg shadow-sm">
              {pet?.description || 'No description available for this pet.'}
            </Text>
          </View>
        )}

        <View className="mt-5">
          <TouchableOpacity
            onPress={handleRequestAdoption}
            className="bg-pink-500 rounded-full py-3 shadow-md hover:bg-pink-400 transition-all duration-300"
          >
            <Text className="text-center text-white font-bold text-lg">
              <Ionicons name="heart" size={18} color="white" /> Start Adoption
              Process
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('Donation')}
            className="bg-yellow-500 rounded-full py-3 shadow-md hover:bg-yellow-400 transition-all duration-300 mt-3"
          >
            <Text className="text-center text-white font-bold text-lg">
              <Ionicons name="cash-outline" size={18} color="white" /> Donate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PetDetailScreen;
