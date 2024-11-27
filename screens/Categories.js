import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TeamInfo from './TeamInfo';

const categories = [
  { id: 1, name: 'معلومات عامة', image: require('../assets/generalInfo.png') },
  { id: 2, name: 'اغاني', image: require('../assets/songs.png') },
  { id: 3, name: 'رقم اللاعب', image: require('../assets/playerNumber.png') },
  { id: 4, name: 'كرة القدم', image: require('../assets/football.png') },
  { id: 5, name: 'اعلام', image: require('../assets/flags.png') },
  { id: 6, name: 'أمثال و ألغاز', image: require('../assets/example.png') },
  { id: 7, name: 'عواصم دول', image: require('../assets/capitals.png') },
  { id: 8, name: 'جغرافيا', image: require('../assets/geographic.png') },
  { id: 9, name: 'منتجات', image: require('../assets/montajat.png') },
  { id: 10, name: 'Friends', image: require('../assets/friends.png') },
  { id: 11, name: 'Prison Break', image: require('../assets/prisonBreak.png') },
  { id: 12, name: 'la casa de papel', image: require('../assets/moneyHeist.png') },
  { id: 13, name: 'Game of Thrones', image: require('../assets/gameOfThrones.png') },
  { id: 14, name: 'شعارات اندية', image: require('../assets/footballLogos.png') },
  { id: 15, name: 'Video Games', image: require('../assets/videoGames.png') },
  { id: 16, name: 'باب الحارة', image: require('../assets/babAlHara.png') },
  { id: 17, name: 'سبيستون', image: require('../assets/spacetoon.png') },
  { id: 18, name: 'طفولة لاعب', image: require('../assets/youngPlayers.png') },
  { id: 19, name: 'برشلونة', image: require('../assets/barcelona.png') },
  { id: 20, name: 'ريال مدريد', image: require('../assets/realMadrid.png') },
  { id: 21, name: 'دوري الأبطال', image: require('../assets/ucl.png') },
  { id: 22, name: 'كأس العالم', image: require('../assets/worldCup.png') },
  { id: 23, name: 'ليفربول', image: require('../assets/liverpool.png') },
];

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigation = useNavigation();

  const handleCategoryPress = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((categoryId) => categoryId !== id));
    } else if (selectedCategories.length < 6) {
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  const isSelected = (id) => selectedCategories.includes(id);
  const isSelectable = selectedCategories.length < 6;

  const navigateToStartGame = (gameName, firstTeamName, secondTeamName) => {
    if (selectedCategories.length === 6) {
      const selectedCategoryData = categories.filter((category) =>
        selectedCategories.includes(category.id)
      );
      navigation.navigate('StartGame', {
        selectedCategories: selectedCategoryData,
        gameName,
        firstTeamName,
        secondTeamName,
      });
    }
  };

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              isSelectable || isSelected(item.id) ? handleCategoryPress(item.id) : null
            }
            style={[
              styles.categoryContainer,
              isSelected(item.id) && styles.selectedCategory,
              !isSelectable && !isSelected(item.id) && styles.unselectableCategory,
            ]}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        )}
      />
      {selectedCategories.length === 6 && (
        <TeamInfo selectedCategories={selectedCategories} onStartGame={navigateToStartGame} />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  selectedCategory: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  unselectableCategory: {
    opacity: 0.5,
  },
  categoryImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
