import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href="../Perfil"><Ionicons name="person-circle-outline" size={24} color="#FFFFFF" /></Link>
        <TextInput style={styles.searchBar} placeholder="Pesquisar..." placeholderTextColor="#AFAFAF" />
        <Ionicons name="home-outline" size={20} color="#FFFFFF" />
      </View>

      <Text style={styles.sectionTitle}>Você pode gostar:</Text>
      <View style={styles.grid}>
        {[
          'https://i.scdn.co/image/ab67616d0000b27308ef9009b0273f096846003d',
          'https://i.scdn.co/image/ab67616d0000b273c847c97de21b491fc0daf8b5',
          'https://i.scdn.co/image/ab67616d0000b273ebce9f114ad43531779ebaf1',
        ].map((imageUri, index) => (
          <View key={index} style={styles.squareCard}>
          <Link key={index} href="../Player" >
            <Image style={styles.squareCard} source={{ uri: imageUri }} />
          </Link>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Artistas populares:</Text>
      <View style={styles.grid}>
        {[
          'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO2sUkRq-default.jpg',
          'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO0FsQXS-default.jpg',
          'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO1vscg0-default.jpg',
        ].map((imageUri, index) => (
          <Image key={index} style={styles.circleCard} source={{ uri: imageUri }} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    padding: 15,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    height: 35,
    backgroundColor: '#6A0DAD',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    color: '#FFFFFF',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  squareCard: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  circleCard: {
    width: '28%',
    aspectRatio: 1,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default HomeScreen;