import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendImage = async ({image}) =>{
    try{
      const data ={
        "file":image,
        "uploud_preset":'ml_default'
      }
      const res = await fetch('/https://api.cloudnary.com/v1_1/dxs2elydl/upload',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(data)
      });
      const result = await res.json();
      setImage(result.url)
      setUserInfo({ ...userinfo, profile_image:result.url })
      await saveNewImageURLonBackend(result)
      console.log(result)
    }
    catch (e) {
      console.log(e)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get.users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });


      if (response.ok) {
        const userData = await response.json();
        setName(userData.name);
        setEmail(userData.email);
        setBio(userData.bio);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
      return;
    }


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);   
      handleSendImage(result.assets[0].uri)
    }
  };


  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas.');
  };


  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // enviar para backend.
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setIsModalVisible(false);
    } else {
      Alert.alert('Erro', 'As senhas não coincidem.');
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bloco}>
        <View style={styles.margem}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../../assets/images/avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            ) : (
              <Text style={styles.name}>{name}</Text>
            )}
            <Text style={styles.email}>{email}</Text>
          </View>


          <View style={styles.profileBody}>
            <Text style={styles.bioTitle}>Biografia</Text>
            {isEditing ? (
              <TextInput
                style={styles.bioInput}
                value={bio}
                onChangeText={(text) => setBio(text)}
                multiline
              />
            ) : (
              <Text style={styles.bio}>{bio}</Text>
            )}
          </View>


          <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)} style={styles.botao}>
            <Text style={styles.botaoText}>{isEditing ? 'Salvar' : 'Editar Perfil'}</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.botao}>
            <Text style={styles.botaoText}>Trocar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Trocar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={handleChangePassword} style={styles.botao}>
              <Text style={styles.botaoText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.botao}>
              <Text style={styles.botaoText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E004F',
    padding: 20,
    justifyContent: 'center',
  },
  margem:{
    margin:20
  },
  bloco:{
    backgroundColor: '#875B9B',
    margin:30,
    borderRadius: 20
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  nameInput: {
    width:'100%',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  profileBody: {
    marginVertical: 20,
  },
  bioTitle: {

    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  bioInput: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
    borderColor: '#cea2ff',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});









