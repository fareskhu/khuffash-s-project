import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const categories = [
  { name: 'معلومات عامة', image: require('../assets/generalInfo.png') },
  { name: 'اغاني', image: require('../assets/songs.png') },
  { name: 'رقم اللاعب', image: require('../assets/playerNumber.png') },
  { name: 'كرة القدم', image: require('../assets/football.png') },
  { name: 'اعلام', image: require('../assets/flags.png') },
  { name: 'أمثال و ألغاز', image: require('../assets/example.png') },
  { name: 'عواصم دول', image: require('../assets/capitals.png') },
  { name: 'جغرافيا', image: require('../assets/geographic.png') },
  { name: 'منتجات', image: require('../assets/montajat.png') },
  { name: 'Friends', image: require('../assets/friends.png') },
  { name: 'Prison Break', image: require('../assets/prisonBreak.png') },
  { name: 'la casa de papel', image: require('../assets/moneyHeist.png') },
  { name: 'Game of Thrones', image: require('../assets/gameOfThrones.png') },
  { name: 'شعارات اندية', image: require('../assets/footballLogos.png') },
  { name: 'Video Games', image: require('../assets/videoGames.png') },
  { name: 'باب الحارة', image: require('../assets/babAlHara.png') },
  { name: 'سبيستون', image: require('../assets/spacetoon.png') },
  { name: 'طفولة لاعب', image: require('../assets/youngPlayers.png') },
  { name: 'برشلونة', image: require('../assets/barcelona.png') },
  { name: 'ريال مدريد', image: require('../assets/realMadrid.png') },
  { name: 'دوري الأبطال', image: require('../assets/ucl.png') },
  { name: 'كأس العالم', image: require('../assets/worldCup.png') },
];

const Categories = () => {
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={categories}
      numColumns={3} // Set number of columns to 3
      keyExtractor={(item) => item.name}
      renderItem={renderCategoryItem}
      contentContainerStyle={styles.categoryList}
      scrollEnabled={false} // Disable internal scrolling, so the ScrollView in GameCreationScreen handles scrolling
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    margin: 10,
    width: 100, // Adjust width to fit 3 columns comfortably
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: 70, // Increase image size
    height: 70,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16, // Increase text size
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
