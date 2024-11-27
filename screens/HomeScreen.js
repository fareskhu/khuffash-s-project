import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import PurchasePackages from './PurchasePackages';

const HomeScreen = () => {
  const [selectedText, setSelectedText] = useState('الرئيسية');
  const navigation = useNavigation();
  const route = useRoute();
  const username = useSelector((state) => state.auth.user);
  const displayName = username ? username : 'انشئ حساب';

  useEffect(() => {
    if (route.params?.selectedOption) {
      setSelectedText(route.params.selectedOption);
    }
  }, [route.params]);

  const handlePress = (text) => {
    setSelectedText(text);
    if (text === 'العب') {
      goToGameCreation();
    }
  };

  const goToGameCreation = () => {
    navigation.navigate('GameCreationScreen');
  };

  const handleAccountPress = () => {
    if (username) {
      // Navigate to LogoutScreen if the user is logged in
      navigation.navigate('Logout');
    } else {
      // Navigate to SignUpScreen if the user is not logged in
      navigation.navigate('SignUp');
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.createAccount} onPress={handleAccountPress}>
          <Text style={styles.createAccountText}>{displayName}</Text>
        </Pressable>
        {['العب', 'العابي السابقة', 'الرئيسية'].map((text, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(text)}
            style={[styles.navTextContainer, selectedText === text && styles.selectedNav]}>
            <Text style={[styles.navText, selectedText === text && styles.selectedNavText]}>
              {text}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#4CAF50', '#81C784']} style={styles.linearGradient}>
          <Text style={styles.logoText}>🎮 أفضل لعبة مع الأصدقاء</Text>
          <Text style={styles.taglineText}>اختر ٦ فئات أنت وأصدقائك وجاوب إذا قدها</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.actionButton, styles.createGameButton]}
              onPress={goToGameCreation}>
              <Text style={styles.buttonText}>أنشئ لعبة</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.browseGamesButton]}>
              <Text style={styles.buttonText}>تصفح الألعاب</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.descriptionContainer}>
        <Image
          source={require('../assets/characterIsThinking.png')}
          style={styles.characterImage}
          resizeMode="contain"
        />
        <Text style={styles.descriptionTitle}>شو فكرة اللعبة ؟</Text>
        <Text style={styles.descriptionText}>
          لعبة جماعية لجميع الأعمار والأجناس، كل فريق يختار ٣ فئات ولكل فئة ٦ أسئلة متعددة الصعوبة
          حسب النقاط، والشاطر يكسب :)
        </Text>
      </View>
      <View style={styles.newGameContainer}>
        <Pressable style={styles.newGameButton} onPress={goToGameCreation}>
          <Text style={styles.newGameButtonText}>انشاء لعبة</Text>
        </Pressable>
      </View>
      {/* Add the PurchasePackages component here */}
      <PurchasePackages />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingTop: 50,
  },
  createAccount: {
    position: 'absolute',
    left: 15,
  },
  createAccountText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    paddingTop: 32,
  },
  navTextContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
  selectedNav: {
    backgroundColor: '#333',
  },
  selectedNavText: {
    color: 'white',
  },
  linearGradient: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
  },
  taglineText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  createGameButton: {
    backgroundColor: '#4CAF50',
  },
  browseGamesButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  newGameContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  newGameButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  newGameButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
