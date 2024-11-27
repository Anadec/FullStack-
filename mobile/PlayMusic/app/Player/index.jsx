import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';  // Importe o componente Image
import { Link } from 'expo-router'; 
import Ionicons from '@expo/vector-icons/Ionicons'; 

const PlayerScreen = () => {
  return (
    <View style={styles.container}>
    
      <View style={styles.topBar}>
        
        <Link href="../Perfil">
          <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
        </Link>

        <TextInput 
          style={styles.searchBar} 
          placeholder="Pesquisar..." 
          placeholderTextColor="#AFAFAF" 
        />

        <View style={styles.home}>
          <Link href={"../Home"}>
            <Ionicons name="home-outline" size={20} color="#FFFFFF" style={styles.home} />
          </Link>
        </View>
      </View>

      {/* Área Principal - Substituindo o retângulo cinza por uma imagem */}
      <View style={styles.mainArea}>
        {/* Imagem no lugar do retângulo cinza */}
        <Image 
          source={{ uri: 'https://i.scdn.co/image/ab67616d0000b27308ef9009b0273f096846003d' }} // Substitua o link pela URL da sua imagem
          style={styles.mediaBox}
        />
        <Text style={styles.songName}>Borboletas - Victor & Leo</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle} />
          <View style={styles.progressBar} />
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity>
          <Text style={[styles.controlText, styles.simpleButton]}>◀</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.playButton}>
            <Text style={[styles.controlText, styles.middleTriangle]}>▶</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.controlText, styles.simpleButton]}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082', 
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    backgroundColor: '#D8BFD8', 
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#000',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  mainArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  mediaBox: {
    width: 200, 
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  songName: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', 
    marginTop: 10,
  },
  progressCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF', 
    borderRadius: 5,
    marginRight: 5,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    marginBottom: 20,
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF', 
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleButton: {
    fontSize: 22, 
    backgroundColor: 'transparent', 
    color: '#FFF', 
  },
  middleTriangle: {
    color: '#4B0082', 
  },
  controlText: {
    fontSize: 22,
    color: '#FFF', 
  },
});

export default PlayerScreen;