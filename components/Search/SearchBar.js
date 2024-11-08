import { useGetAllPets } from '@/hooks/Pet';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PetSearchBar({ onSearch }) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch pets based on the search term
  const { pets, isLoading } = useGetAllPets(name ? { name } : {});

  const handleSelectPet = (petId, imageUrl) => {
    navigation.navigate('PetDetail', {
      petId: petId,
      imageUrl: imageUrl,
    });
    setName('');
  };

  const resetAdvancedFilters = () => {
    setBreed('');
    setSpecies('');
    setAge('');
    setVaccinated('');
    setHealthStatus('');
  };

  const handleSearch = (param, value) => {
    const queryParams = { [param]: value };
    if (value) onSearch(queryParams);
    setModalVisible(false);
    resetAdvancedFilters();
  };

  const handleMainSearch = () => {
    onSearch(name ? { name } : {});
  };

  const clearMainSearch = () => {
    setName('');
    onSearch({});
  };

  const getImageUrl = (item) => {
    if (item.image && item.image.url) {
      return item.image.url;
    }
    if (item.image_id) {
      return `https://res.cloudinary.com/do9g6j7jw/image/upload/v1729306538/${item.image_id}.jpg`;
    }
    return 'https://via.placeholder.com/150';
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#e0e7ff' }}>
      {/* Main Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 8,
          marginBottom: 8,
          borderColor: '#4f46e5', // Indigo border
          borderWidth: 1,
        }}
      >
        <TextInput
          style={{ flex: 1, padding: 8, color: '#4f46e5' }} // Indigo text
          placeholder="Search by name..."
          placeholderTextColor="#a5b4fc"
          value={name}
          onChangeText={setName}
        />
        {name ? (
          <TouchableOpacity onPress={clearMainSearch}>
            <Icon name="close-circle" size={20} color="#4f46e5" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleMainSearch}>
          <Icon name="search" size={20} color="#4f46e5" />
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="small" color="#4f46e5" />}

      {name && (
        <FlatList
          data={pets}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectPet(item._id, getImageUrl(item))}
              style={{
                padding: 8,
                backgroundColor: '#eef2ff',
                borderBottomWidth: 1,
                borderBottomColor: '#c7d2fe',
              }}
            >
              <Text style={{ fontSize: 16, color: '#3730a3' }}>
                {item.name}
              </Text>
              <Text style={{ color: '#4f46e5' }}>{item.breed}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !isLoading &&
            name && (
              <Text
                style={{ textAlign: 'center', marginTop: 16, color: '#4f46e5' }}
              >
                No pets found.
              </Text>
            )
          }
        />
      )}

      {/* Advanced Filters Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ alignSelf: 'flex-end', padding: 4 }}
      >
        <Icon name="options" size={20} color="#4f46e5" />
      </TouchableOpacity>

      {/* Modal for Advanced Filters */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#e0e7ff',
              padding: 16,
              borderRadius: 8,
              borderColor: '#4f46e5',
              borderWidth: 1,
            }}
          >
            {[
              {
                placeholder: 'Search by breed...',
                value: breed,
                setValue: setBreed,
                param: 'breed',
              },
              {
                placeholder: 'Search by species...',
                value: species,
                setValue: setSpecies,
                param: 'species',
              },
              {
                placeholder: 'Search by age...',
                value: age,
                setValue: setAge,
                param: 'age',
                keyboardType: 'numeric',
              },
              {
                placeholder: 'Search by vaccination status...',
                value: vaccinated,
                setValue: setVaccinated,
                param: 'vaccinated',
              },
              {
                placeholder: 'Search by health status...',
                value: healthStatus,
                setValue: setHealthStatus,
                param: 'healthStatus',
              },
            ].map(
              (
                { placeholder, value, setValue, param, keyboardType },
                index,
              ) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#a5b4fc"
                    value={value}
                    onChangeText={setValue}
                    style={{
                      flex: 1,
                      padding: 8,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      borderColor: '#4f46e5',
                      borderWidth: 1,
                      color: '#4f46e5',
                      marginRight: 8,
                    }}
                    keyboardType={keyboardType}
                  />
                  <TouchableOpacity onPress={() => handleSearch(param, value)}>
                    <Icon name="search" size={20} color="#4f46e5" />
                  </TouchableOpacity>
                </View>
              ),
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 8,
                padding: 8,
                backgroundColor: '#4f46e5',
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
