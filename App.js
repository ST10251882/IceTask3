//Tiffany Yav - ST10251882
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function CounterScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [dispText, setDispText] = useState('');

  // Use the useEffect hook to set the display text when the count changes
  useEffect(() => {
   
    setDispText('Effect - The count is ' + count);
    
    const value = count.toString();
    // Save the value to AsyncStorage with the key 'counter'
    AsyncStorage.setItem('counter', value);
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.textDisp}>COUNTER + USEEFFECT</Text>

      <View style={styles.buttons}>
        <Button 
          title="Increment" 
          onPress={() => setCount(count + 1)} 
        />
      </View>

      <View style={styles.buttons}>
        <Button 
          title="Decrement" 
          onPress={() => setCount(count - 1)} 
        />
      </View>

      <Text style={styles.textDisp}>Count: {count}</Text>
      <Text style={styles.textDisp}>{dispText}</Text>

      <Button 
        title="Display Counter" 
        onPress={() => navigation.navigate('DisplayCounter')} 
      />
    </View>
  );
}

// Create a custom component for the display counter screen using a function declaration
function DisplayCounterScreen() {
  
  const [counter, setCounter] = useState(0);
  // Define a function to get the counter value from AsyncStorage
  const getCounter = async () => {
    // Get the value from AsyncStorage with the key 'counter'
    const value = await AsyncStorage.getItem('counter');
   
    const number = parseInt(value, 10);
    
    setCounter(number);
  };

  // Use the useEffect hook to call the getCounter function when the component mounts or updates
  useEffect(() => {
    getCounter();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Display Counter Screen</Text>
      <Text style={styles.text}>Counter: {counter}</Text>
    </View>
  );
}

// Create a native stack navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Counter">
        <Stack.Screen name="Counter" component={CounterScreen} />
        <Stack.Screen name="DisplayCounter" component={DisplayCounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Define some styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttons: {
    margin: 5,
    padding: 5,
  },
  textDisp: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    fontSize: 28,
    margin: 10,
  },
});

// Export the app component
export default App;
