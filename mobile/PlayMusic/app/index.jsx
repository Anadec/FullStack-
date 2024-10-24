import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Login com:', username, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
       
        <View style={styles.loginBox}>
          <Text style={styles.title}>PLAY MUSIC</Text>

          <Text style={styles.subtitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueci a senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.register}>Não possuo cadastro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E004F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20, 
  },
  loginBox: {
    width: '100%',
    backgroundColor: '#875B9B', 
    borderRadius: 20,
    padding: 20, 
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,  
    backgroundColor: '#D4D4D4',  
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#fff',
    fontSize: 12,  
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    width: '60%',  
    height: 40,    
    backgroundColor: '#D4D4D4',  
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16, 
  },
  register: {
    color: '#fff',
    fontSize: 12,  
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;