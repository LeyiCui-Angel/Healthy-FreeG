import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Constants from 'expo-constants';

import { DATA } from '../data/FGList';

export default function App() {
  const [listData, setListData] = useState(DATA);
  let row: Array<any> = [];
  let prevOpenedRow;

  /**
   *
   */
  const renderItem = ({ item, index }, onClick) => {
    //
    const closeRow = (index) => {
      console.log('closerow');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: 'center',
            justifyContent: 'center',
            width: 150,
          }}>
          <Button color="red" onPress={onClick} title="THROW AWAY"></Button>
        </View>
      );
    };

    const renderLeftActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: 'center',
            justifyContent: 'center',
            width: 150,
          }}>
          <Button color="green" onPress={onClick} title="CONSUME"></Button>
        </View>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, onClick)
        }
        renderLeftActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, onClick)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        rightOpenValue={-200}>
        <View
          style={{
            margin: 4,
            borderColor: 'grey',
            borderWidth: 1,
            padding: 9,
            backgroundColor: 'white',
          }}>
          <Text>{item.title}</Text>
        </View>
      </Swipeable>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log('Pressed', v);
            deleteItem(v);
            Alert.alert('Remember that you can give out free food to earn credits!')
          })
        }
        keyExtractor={(item) => item.id}></FlatList>
      <Button
        title="Add food"
        color="#841584"
        onPress={() => Alert.alert('Receipt received! Food will be added :)')
          // adding stuff
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
function renderLeftActions(progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation, onClick: any): React.ReactNode {
  throw new Error('Function not implemented.');
}

