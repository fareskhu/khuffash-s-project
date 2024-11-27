import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';

const { width } = Dimensions.get('window');

const packages = [
  { id: 1, name: 'لعبة واحدة', price: '2.5 JOD', games: 1, color: '#FFCCCB' },
  { id: 2, name: 'لعبتان', price: '4 JOD', games: 2, color: '#ADD8E6' },
  { id: 3, name: '5 العاب', price: '8 JOD', games: 5, color: '#90EE90' },
  { id: 4, name: '10 العاب', price: '10 JOD', games: 10, color: '#FFD700' },
];

const PurchasePackages = () => {
  const handlePurchase = async (packageId) => {
    // Implement the in-app purchase logic here
    const packageToPurchase = packages.find((pkg) => pkg.id === packageId);
    if (packageToPurchase) {
      // Call the purchase function from expo-in-app-purchases
      const { responseCode } = await InAppPurchases.purchaseItemAsync(packageToPurchase.id);
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        alert('تم الشراء بنجاح!');
      } else {
        alert('فشل الشراء. حاول مرة أخرى.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر حزمة الشراء</Text>
      <View style={styles.cardsContainer}>
        {packages.map((pkg) => (
          <View key={pkg.id} style={[styles.packageCard, { backgroundColor: pkg.color }]}>
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.gamesCount}>{pkg.games} لعبة</Text>
            <Text style={styles.packagePrice}>{pkg.price}</Text>
            <Pressable style={styles.purchaseButton} onPress={() => handlePurchase(pkg.id)}>
              <Text style={styles.buttonText}>اشتري الآن</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  packageCard: {
    width: width / 2 - 30, // Two cards per row with some margin
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gamesCount: {
    fontSize: 16,
    marginBottom: 10,
  },
  packagePrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 10,
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PurchasePackages;
