import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// funçao convert
const converterTemperatura = (celsius) => {
  const fahrenheit = (celsius * 9/5) + 32;
  const kelvin = parseFloat(celsius) + 273.15;
  return { fahrenheit, kelvin };
}

// Tela principal
function HomeScreen({ navigation }) {
  const [celsius, setCelsius] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 40 }}>Calculadora De Temperaturas:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Temperatura em °C"
        value={celsius}
        onChangeText={setCelsius}
      />
      <Button
        title="Converter"
        onPress={() => navigation.navigate('Resultados', { celsius })}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Tela resultados
function DetailsScreen({ route }) {
  const { celsius } = route.params;
  const { fahrenheit, kelvin } = converterTemperatura(celsius);

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 20 }}>Celsius: {celsius}°C</Text>
      <Text style={{ color: "white", fontSize: 20 }}>Fahrenheit: {fahrenheit.toFixed(2)}°F</Text>
      <Text style={{ color: "white", fontSize: 20 }}>Kelvin: {kelvin.toFixed(2)}K</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Principal" component={HomeScreen} />
        <Stack.Screen name="Resultados" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#483D8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { 
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '30%',
  }
});
