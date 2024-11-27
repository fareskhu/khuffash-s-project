import { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Pressable, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './authActions';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const emailRegex = /^[A-Za-z][A-Za-z0-9_-]*@(gmail|yahoo|outlook|hotmail)\.(com|net|org)$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const signUpHandler = async () => {
    try {
      console.log('log1', email, password); // Logs input values before attempting signup
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save the username in AsyncStorage for persistent login

      // Dispatch login success action to update the Redux state
      dispatch(loginSuccess(username));

      console.log('log2'); // Logs after successful account creation
      navigation.navigate('Home', { username }); // Navigate to Home screen on success
    } catch (error) {
      console.log('Firebase signup error:', error); // Logs the complete error object
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('That email address is invalid!');
      } else {
        setEmailError('Something went wrong. Please try again.');
      }
    }
  };

  const validationHandler = () => {
    setEmailError('');
    setPasswordError('');
    setHasSubmitted(true);

    if (!email && !password) {
      setEmailError('You must enter an email.');
      setPasswordError('You must enter a password.');
    } else if (!emailRegex.test(email) && !passwordRegex.test(password)) {
      setEmailError('Email does not meet the requirements.');
      setPasswordError('Password does not meet the requirements.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Email does not meet the requirements.');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password does not meet the requirements.');
    } else {
      signUpHandler();
    }
  };

  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  const emailHandler = (text) => {
    setEmail(text);
    if (emailRegex.test(text)) {
      setEmailError('');
    }
    if (emailError === '' && !emailRegex.test(text)) {
      setEmailError('Email does not meet the requirements.');
    }
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
    if (passwordRegex.test(pass)) {
      setPasswordError('');
    }
    if (passwordError === '' && !passwordRegex.test(pass)) {
      setPasswordError('Password does not meet the requirements.');
    }
  };

  const showPasswordHandler = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Pressable style={styles.container} onPress={dismissKeyboardHandler}>
      <Text style={styles.headerText}>إنشاء حساب</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="اسم المستخدم"
          placeholderTextColor="#8c8c8c"
          onChangeText={setUsername}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#8c8c8c"
          onChangeText={emailHandler}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
        />
        {hasSubmitted && emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="كلمة المرور"
            placeholderTextColor="#8c8c8c"
            secureTextEntry={hidePassword}
            onChangeText={passwordHandler}
            value={password}
          />
          <Ionicons
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#8c8c8c"
            style={styles.eyeIcon}
            onPress={showPasswordHandler}
          />
        </View>
        {hasSubmitted && passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <Pressable style={styles.button} onPress={validationHandler}>
        <Text style={styles.buttonText}>تسجيل</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>هل لديك حساب ؟ تسجيل دخول</Text>
      </Pressable>
    </Pressable>
  );
};

export default SignUpScreen;

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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
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
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
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
    textAlign: 'center',
  },
  loginText: {
    color: '#4CAF50',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
