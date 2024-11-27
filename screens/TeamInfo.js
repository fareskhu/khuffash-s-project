import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';

const windowHeight = Dimensions.get('window').height;

const TeamInfo = ({ selectedCategories, onStartGame }) => {
  const [gameName, setGameName] = useState('');
  const [firstTeamName, setFirstTeamName] = useState('');
  const [secondTeamName, setSecondTeamName] = useState('');
  const [gameNameError, setGameNameError] = useState('');
  const [teamNameError, setTeamNameError] = useState('');

  const handleStartGame = () => {
    setGameNameError('');
    setTeamNameError('');

    if (!gameName) {
      setGameNameError('يجب عليك تعبئة اسم اللعبة');
    }
    if (!firstTeamName || !secondTeamName) {
      setTeamNameError('يجب عليك تعبئة اسم الفريق');
    }

    if (gameName && firstTeamName && secondTeamName) {
      onStartGame(gameName, firstTeamName, secondTeamName);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {selectedCategories && (
        <View style={styles.categoriesContainer}>{/* Your categories content */}</View>
      )}
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === 'ios' ? 180 : 200}
        extraHeight={120}
        enableResetScrollToCoords={false}
        contentContainerStyle={[
          styles.scrollContainer,
          { marginTop: selectedCategories ? 100 : 0 },
        ]}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>حدد معلومات الفريق</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>اسم اللعبة</Text>
              <TextInput
                style={[styles.input, gameNameError && styles.inputError]}
                placeholder="ادخل اسم اللعبة"
                placeholderTextColor="#8c8c8c"
                value={gameName}
                onChangeText={setGameName}
              />
              {gameNameError ? <Text style={styles.errorText}>{gameNameError}</Text> : null}
            </View>

            <View style={styles.teamInputsContainer}>
              <View style={styles.teamInputWrapper}>
                <Text style={styles.label}>الفريق الأول</Text>
                <TextInput
                  style={[styles.input, styles.teamInput, teamNameError && styles.inputError]}
                  placeholder="ادخل اسم الفريق"
                  placeholderTextColor="#8c8c8c"
                  value={firstTeamName}
                  onChangeText={setFirstTeamName}
                />
              </View>
              <View style={styles.teamInputWrapper}>
                <Text style={styles.label}>الفريق الثاني</Text>
                <TextInput
                  style={[styles.input, styles.teamInput, teamNameError && styles.inputError]}
                  placeholder="ادخل اسم الفريق"
                  placeholderTextColor="#8c8c8c"
                  value={secondTeamName}
                  onChangeText={setSecondTeamName}
                />
              </View>
            </View>
            {teamNameError ? <Text style={styles.errorText}>{teamNameError}</Text> : null}

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleStartGame}>
              <Text style={styles.buttonText}>ابدأ اللعب</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  categoriesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#F5F5F5',
    height: 100, // Adjust based on your categories height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: windowHeight,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
    textAlign: 'right',
  },
  inputError: {
    borderColor: '#FF5252',
    borderWidth: 1.5,
  },
  teamInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  teamInputWrapper: {
    width: '48%',
  },
  teamInput: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#1B5E20',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
  },
});

export default TeamInfo;
