import { Button, Card, Text } from '@rneui/themed';

const CardComponent = ({ data, onPress }) => {
  const { image, name, description, age, healthStatus, quantity } = data;
  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{ padding: 0 }}
        source={{
          uri: image.url,
        }}
      />
      <Text style={{ marginBottom: 3 }}>Age: {age}</Text>
      <Text style={{ marginBottom: 3 }}>Health Status: {healthStatus}</Text>
      <Text style={{ marginBottom: 3 }}>Quantity: {quantity}</Text>
      <Text style={{ marginBottom: 10 }}>Description</Text>
      <Text style={{ marginBottom: 10 }}>{description}</Text>
      <Button
        onPress={onPress}
        type='clear'
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="View details"
      />
    </Card>
  );
};

export default CardComponent;
