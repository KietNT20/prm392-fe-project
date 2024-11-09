import { usePetDetail, useUpdatePet } from '@/hooks/Pet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dialog } from '@rneui/themed';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const PetDetailScreen = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editablePet, setEditablePet] = useState(pet);
  const [originalPet, setOriginalPet] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { profile } = useSelector((state) => state.userProfile);

  const navigation = useNavigation();
  const route = useRoute();
  const { petId, imageUrl } = route.params;
  const { pet } = usePetDetail(petId);
  const updatePetMutation = useUpdatePet();

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
    setShowDialog(true);
  };

  const handleConfirmDialog = () => {
    setShowDialog(false);
    navigation.navigate('Adoption', {
      petId: petId,
      petName: pet.name,
    });
  };

  const handleCancelDialog = () => {
    setShowDialog(false);
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
          <View
            className="absolute top-12 right-5 flex-row z-10"
            style={{
              display: profile?.role === 'admin' ? 'flex' : 'none',
            }}
          >
            <TouchableOpacity
              className=" bg-yellow-400 p-2 rounded-full shadow-md"
              onPress={toggleEditMode}
            >
              <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View className="relative mt-10">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64 rounded-xl mb-4 shadow-lg"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
        </View>

        {isEditMode ? (
          <View>
            {/* Edit Name */}
            <TextInput
              value={editablePet?.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Pet Name"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Breed */}
            <TextInput
              value={editablePet?.breed}
              onChangeText={(text) => handleInputChange('breed', text)}
              placeholder="Pet Breed"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Age */}
            <TextInput
              value={editablePet?.age?.toString()}
              onChangeText={(text) => handleInputChange('age', text)}
              placeholder="Pet Age"
              keyboardType="numeric"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Sex */}
            <TextInput
              value={editablePet?.sex}
              onChangeText={(text) => handleInputChange('sex', text)}
              placeholder="Pet Sex"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Species */}
            <TextInput
              value={editablePet?.species}
              onChangeText={(text) => handleInputChange('species', text)}
              placeholder="Pet Species"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Coat Color */}
            <TextInput
              value={editablePet?.coatColor}
              onChangeText={(text) => handleInputChange('coatColor', text)}
              placeholder="Coat Color"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Vaccination Status */}
            <TextInput
              value={editablePet?.vaccinated ? 'Yes' : 'No'}
              onChangeText={(text) =>
                handleInputChange('vaccinated', text === 'Yes')
              }
              placeholder="Vaccinated"
              className="bg-yellow-200 rounded-lg p-3 mb-4 text-lg shadow-sm"
            />

            {/* Edit Description */}
            <TextInput
              value={editablePet?.description}
              onChangeText={(text) => handleInputChange('description', text)}
              placeholder="Pet Description"
              multiline
              numberOfLines={4}
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

            <View className="">
              <View className="text-base text-gray-700 flex-row items-center">
                <Ionicons
                  style={{ marginRight: 2 }}
                  name="time-outline"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">Age: {pet?.age} years</Text>
              </View>

              <View className="text-base text-gray-700 flex-row items-center">
                <Ionicons
                  style={{ marginRight: 2 }}
                  name="male-female-outline"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">Sex: {pet?.sex}</Text>
              </View>

              <View className="text-base text-gray-700 flex-row items-center">
                <Ionicons
                  style={{ marginRight: 2 }}
                  name="paw-outline"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">Species: {pet?.species}</Text>
              </View>

              <View className="text-base text-gray-700 flex-row items-center">
                <MaterialIcons
                  style={{ marginRight: 2 }}
                  name="color-lens"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">Coat Color: {pet?.coatColor}</Text>
              </View>

              <View className="text-base text-gray-700 flex-row items-center">
                <Ionicons
                  style={{ marginRight: 2 }}
                  name="shield-checkmark-outline"
                  size={18}
                  color="#FF6D6D"
                />
                <Text className="ml-1">
                  Vaccinated: {pet?.vaccinated ? 'Yes' : 'No'}
                </Text>
              </View>
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

      <Dialog isVisible={showDialog} onBackdropPress={handleCancelDialog}>
        <Dialog.Title title="Confirm Logout" />
        <Text>Are you sure you want request adopt this pet?</Text>
        <Dialog.Actions>
          <Dialog.Button title="OK" onPress={() => handleConfirmDialog()} />
          <Dialog.Button title="Cancel" onPress={() => handleCancelDialog()} />
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};

export default PetDetailScreen;
