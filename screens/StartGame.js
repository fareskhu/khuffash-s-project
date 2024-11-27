import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { questionData } from './questionData';

const StartGame = ({ route }) => {
  const navigation = useNavigation();
  const { selectedCategories = [], gameName, firstTeamName, secondTeamName } = route.params;

  const [currentTeam, setCurrentTeam] = useState(firstTeamName);
  const [disabledPoints, setDisabledPoints] = useState([]);

  const points = [200, 400, 600];

  useEffect(() => {
    const changeToLandscape = async () => {
      try {
        console.log('Locking orientation to landscape');
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (error) {
        console.error('Failed to lock orientation:', error);
      }
    };
    changeToLandscape();

    return () => {
      console.log('Unlocking orientation');
      ScreenOrientation.unlockAsync(); // Unlock orientation when leaving the screen
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.gameNameText}>{gameName}</Text>,
      headerRight: () => <Text style={styles.teamNameText}>{`دور فريق: ${currentTeam}`}</Text>,
    });
  }, [navigation, gameName, currentTeam]);

  const handleAnswerSelected = (categoryId, pointValue, selectedTeam, position) => {
    setDisabledPoints((prev) => [...prev, { categoryId, pointValue, position }]);
    setCurrentTeam((prevTeam) => (prevTeam === firstTeamName ? secondTeamName : firstTeamName));
  };

  const handlePress = (categoryId, pointValue, position) => {
    if (
      disabledPoints.some(
        (item) =>
          item.categoryId === categoryId &&
          item.pointValue === pointValue &&
          item.position === position
      )
    ) {
      return;
    }

    const category = selectedCategories.find((cat) => cat.id === categoryId)?.name;

    if (
      !questionData[category] ||
      !questionData[category][pointValue] ||
      questionData[category][pointValue].length === 0
    ) {
      Alert.alert('غير متوفر', 'الأسئلة غير متوفرة حاليًا لهذه الفئة', [
        { text: 'حسناً', style: 'default' },
      ]);
      return;
    }

    const questions = questionData[category][pointValue];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    navigation.navigate('Question', {
      question: randomQuestion.question,
      answer: randomQuestion.answer,
      pointValue,
      categoryId,
      position,
      firstTeamName,
      secondTeamName,
      onAnswerSelected: handleAnswerSelected,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedCategories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.categoryWrapper}>
            <View style={styles.pointsContainer}>
              {points.map((point, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.pointPill,
                    disabledPoints.some(
                      (dp) =>
                        dp.categoryId === item.id &&
                        dp.pointValue === point &&
                        dp.position === 'left'
                    ) && styles.disabledPill,
                  ]}
                  onPress={() => handlePress(item.id, point, 'left')}>
                  <Text style={styles.pointText}>{point}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.categoryContainer}>
              <Image source={item.image} style={styles.categoryImage} />
              <View style={styles.categoryNameOverlay}>
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            </View>

            <View style={styles.pointsContainer}>
              {points.map((point, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.pointPill,
                    disabledPoints.some(
                      (dp) =>
                        dp.categoryId === item.id &&
                        dp.pointValue === point &&
                        dp.position === 'right'
                    ) && styles.disabledPill,
                  ]}
                  onPress={() => handlePress(item.id, point, 'right')}>
                  <Text style={styles.pointText}>{point}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noCategoriesText}>No categories selected</Text>}
      />
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  disabledPill: {
    opacity: 0.3,
  },
  listContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  teamNameText: {
    fontSize: 16,
    color: '#333',
    paddingRight: 10,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryImage: {
    width: 120,
    height: 130,
    borderRadius: 15,
  },
  categoryNameOverlay: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  pointsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointPill: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 3,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  pointText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  noCategoriesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
