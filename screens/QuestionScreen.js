import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuestionScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    question,
    answer,
    pointValue,
    categoryId,
    position,
    firstTeamName,
    secondTeamName,
    onAnswerSelected,
  } = route.params;

  const [showAnswer, setShowAnswer] = useState(false);
  const [showWhoAnswered, setShowWhoAnswered] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleWhoAnswered = () => {
    setShowWhoAnswered(true);
  };

  const handleTeamSelection = (selectedTeam) => {
    if (onAnswerSelected) {
      onAnswerSelected(categoryId, pointValue, selectedTeam, position);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderWrapper}>
        <Text style={styles.questionText}>{question}</Text>

        {showAnswer && <Text style={styles.answerText}>{answer}</Text>}

        {!showAnswer && <Button title="اظهر الاجابة" onPress={handleShowAnswer} color="#4CAF50" />}

        {showAnswer && !showWhoAnswered && (
          <Button title="مين جاوب" onPress={handleWhoAnswered} color="#2196F3" />
        )}

        {showWhoAnswered && (
          <View style={styles.teamOptions}>
            <Button
              title={firstTeamName}
              onPress={() => handleTeamSelection(firstTeamName)}
              color="#FF9800"
            />
            <Button
              title={secondTeamName}
              onPress={() => handleTeamSelection(secondTeamName)}
              color="#FF9800"
            />
            <Button
              title="ولا فريق"
              onPress={() => handleTeamSelection('ولا فريق')}
              color="#FF9800"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9', // Light background color
    padding: 20,
  },
  borderWrapper: {
    width: '90%',
    borderWidth: 3, // Add a bold border
    borderColor: '#4CAF50', // Green color for the border
    borderRadius: 15, // Rounded corners for the border
    backgroundColor: '#fff', // Solid white background inside the border
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  answerText: {
    fontSize: 20,
    color: '#388E3C', // A darker green for the answer text
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 10,
    backgroundColor: '#e8f5e9',
  },
  teamOptions: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginVertical: 10,
    width: '100%',
  },
});
