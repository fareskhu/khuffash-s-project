import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Categories from './Categories';
import { useSelector } from 'react-redux'; // Import this to access the username from the Redux store

const GameCreationScreen = () => {
  const [selectedText, setSelectedText] = useState('العب');
  const navigation = useNavigation();
  const route = useRoute();
  const username = useSelector((state) => state.auth.user); // Access the username from the Redux store

  const handlePress = (text) => {
    setSelectedText(text);
    if (text === 'الرئيسية') {
      navigation.navigate('Home', { selectedOption: 'الرئيسية', username });
    }
  };

  const signUpHandler = () => {
    navigation.navigate('SignUp');
  };

  return (
    <FlatList
      data={[]} // No data is needed; we are using this for layout
      ListHeaderComponent={
        <View>
          {/* Header Section */}
          <View style={styles.header}>
            <Pressable style={styles.createAccount} onPress={signUpHandler}>
              <Text style={styles.createAccountText}>{username || 'انشئ حساب'}</Text>
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

          {/* Linear Gradient Section */}
          <LinearGradient colors={['#4CAF50', '#81C784']} style={styles.linearGradient}>
            <Text style={styles.logoText}>🎮 إنشاء لعبة جديدة</Text>
            <Text style={styles.taglineText}>
              لإنشاء لعبة جديدة على كل فريق اختيار ٣ فئات وبعدها اضغط على ابدأ اللعب
            </Text>
          </LinearGradient>

          {/* Category Selection Title */}
          <View style={styles.categorySelectionContainer}>
            <Text style={styles.categorySelectionText}>اختر الفئات</Text>
          </View>
        </View>
      }
      ListFooterComponent={<Categories />} // The Categories component will be rendered below the header
    />
  );
};

export default GameCreationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 20, // Add bottom padding to prevent cutoff
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
    padding: 30,
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
  categorySelectionContainer: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categorySelectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
});
