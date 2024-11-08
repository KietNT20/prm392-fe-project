import { useCreateAdoptionRequest } from '@/hooks/AdoptionRequest';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Button, Card, Input } from '@rneui/themed';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const AdoptPetScreen = () => {
  const [formData, setFormData] = useState({
    cccd: '',
    name: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    cccd: '',
    name: '',
    phoneNumber: '',
    address: '',
  });

  const { createAdoptionReq } = useCreateAdoptionRequest();
  const route = useRoute();
  const { profile } = useSelector((state) => state.userProfile);
  // console.log('User Profile:', profile);
  const { petId } = route.params;
  // console.log('Pet ID:', petId);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      cccd: '',
      name: '',
      phoneNumber: '',
      address: '',
    };

    // Validate CCCD (12 digits)
    if (!formData.cccd) {
      newErrors.cccd = 'IC is required';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.cccd)) {
      newErrors.cccd = 'IC must be exactly 12 digits';
      isValid = false;
    }

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate Phone Number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
      isValid = false;
    }

    // Validate Address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // console.log('Form submitted:', formData);
      // Add your submission logic here
      createAdoptionReq({
        petId: petId,
        userId: profile.id,
        name: formData.name,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        cccd: formData.cccd,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Pet Adoption Application</Card.Title>
        <Input
          placeholder="IC Number"
          leftIcon={<Ionicons name="card" size={24} color="#86939e" />}
          value={formData.cccd}
          onChangeText={(text) => setFormData({ ...formData, cccd: text })}
          keyboardType="numeric"
          maxLength={12}
          errorMessage={errors.cccd}
          errorStyle={styles.errorText}
        />

        <Input
          placeholder="Full Name"
          leftIcon={<Ionicons name="person" size={24} color="#86939e" />}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          errorMessage={errors.name}
          errorStyle={styles.errorText}
        />

        <Input
          placeholder="Phone Number"
          leftIcon={<Ionicons name="call" size={24} color="#86939e" />}
          value={formData.phoneNumber}
          onChangeText={(text) =>
            setFormData({ ...formData, phoneNumber: text })
          }
          keyboardType="phone-pad"
          maxLength={10}
          errorMessage={errors.phoneNumber}
          errorStyle={styles.errorText}
        />

        <Input
          placeholder="Address"
          leftIcon={<Ionicons name="home" size={24} color="#86939e" />}
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          multiline
          numberOfLines={3}
          errorMessage={errors.address}
          errorStyle={styles.errorText}
        />

        <Button
          title="Submit Application"
          onPress={handleSubmit}
          color="#6c63ff"
          raised
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: '#6c63ff',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default AdoptPetScreen;
