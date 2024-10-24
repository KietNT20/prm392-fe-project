import { Text } from 'react-native';

const CardComponent = ({ image_id }) => {
  return (
    <Card>
      <Card.Title>HELLO WORLD</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{ padding: 0 }}
        source={{
          uri: { image_id },
        }}
      />
      <Text style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure
        than actual design.
      </Text>
      <Button
        icon={
          <Icon name="code" color="#ffffff" iconStyle={{ marginRight: 10 }} />
        }
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
  );
};

export default CardComponent;
