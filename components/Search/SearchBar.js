import { useState } from 'react';
import {
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PetSearchBar({ onSearch }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle search with filtered params
  const handleSearch = () => {
    const params = { name, breed, species, age, vaccinated, healthStatus };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v),
    );
    onSearch(filteredParams); // Pass only non-empty parameters
    setModalVisible(false); // Close modal after search
  };

  return (
    <View style={styles.container}>
      {/* Main Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search by name..."
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Advanced Filters Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.filterButton}
      >
        <Icon name="options" size={20} color="gray" />
      </TouchableOpacity>

      {/* Modal for Advanced Filters */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Search by breed..."
              value={breed}
              onChangeText={setBreed}
              style={styles.input}
            />
            <TextInput
              placeholder="Search by species..."
              value={species}
              onChangeText={setSpecies}
              style={styles.input}
            />
            <TextInput
              placeholder="Search by age..."
              value={age}
              onChangeText={setAge}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Search by vaccination status..."
              value={vaccinated}
              onChangeText={setVaccinated}
              style={styles.input}
            />
            <TextInput
              placeholder="Search by health status..."
              value={healthStatus}
              onChangeText={setHealthStatus}
              style={styles.input}
            />

            {/* Buttons for Apply Filters and Close Modal */}
            <Button title="Apply Filters" onPress={handleSearch} />
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f3f4f6' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
  },
  filterButton: { alignSelf: 'flex-end', padding: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
