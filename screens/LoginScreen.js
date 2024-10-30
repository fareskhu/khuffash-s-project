import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const loginHandler = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>تسجيل الدخول</Text>

      <TextInput
        style={styles.input}
        placeholder="البريد الالكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={loginHandler}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
});
