import * as React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const TabTwoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Log</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        title="Record my meal"
        color="#841584"
        onPress={() => Alert.alert('Picture captured! Calorie information will be added :)')
          // adding stuff
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabTwoScreen;