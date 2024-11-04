import { useState } from 'react';
import { TextInput, TouchableOpacity, View, Modal, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PetSearchBar({ onSearch }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Trigger search and close modal
  const handleSearch = (param, value) => {
    const queryParams = { [param]: value };
    if (value) onSearch(queryParams);
    setModalVisible(false);
    resetAdvancedFilters();
  };

  // Reset advanced filters when modal closes
  const resetAdvancedFilters = () => {
    setBreed('');
    setSpecies('');
    setAge('');
    setVaccinated('');
    setHealthStatus('');
  };

  // Show full list if no input provided
  const handleMainSearch = () => {
    onSearch(name ? { name } : {});
  };

  // Clear the main search input
  const clearMainSearch = () => {
    setName('');
    onSearch({});
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#f3f4f6' }}>
      {/* Main Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 8,
          marginBottom: 8,
        }}
      >
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="Search by name..."
          value={name}
          onChangeText={setName}
        />
        {name ? (
          <TouchableOpacity onPress={clearMainSearch}>
            <Icon name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleMainSearch}>
          <Icon name="search" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Advanced Filters Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ alignSelf: 'flex-end', padding: 4 }}
      >
        <Icon name="options" size={20} color="gray" />
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
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 8,
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
                    value={value}
                    onChangeText={setValue}
                    style={{
                      flex: 1,
                      padding: 8,
                      backgroundColor: 'white',
                      borderRadius: 8,
                    }}
                    keyboardType={keyboardType}
                  />
                  <TouchableOpacity onPress={() => handleSearch(param, value)}>
                    <Icon name="search" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              ),
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 8,
                padding: 8,
                backgroundColor: 'red',
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
