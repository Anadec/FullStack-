import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image } from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    if (!email || !password) {
      return alert("Todos os campos devem ser preenchidos");
    }

    const formData = { email, password };

    try {
      const res = fetch("localhost:8000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (res.status) {
        case 200:
          alert("Usuário autenticado com sucesso");
          break;
        case 406:
          alert("Preencha todos os campos");
          break;
        case 404:
          alert("Email não encontrado");
          break;
        case 400:
          alert("Senha incorreta");
          break;
        default:
          alert("Erro ao se conectar com servidor");
          break;
      }
    } catch (error) {
      alert("Erro ao se conectar com o servidor");
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.background, isDarkMode && styles.darkBackground]}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>PLAY MUSIC</Text>
        <View style={styles.loginBox}>
          <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>Login</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Usuário"
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Senha"
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={[styles.forgotPassword, isDarkMode && styles.darkAccent]} onPress={handleForgotPassword}>
            Esqueci a senha
          </Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Acessar</Text>
          </TouchableOpacity>
          <Link href="Registro" style={[styles.registerLink, isDarkMode && styles.darkAccent]}>
            Não possuo cadastro
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E004F',
  },
  background: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#875B9B',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  loginBox: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#875B9B',
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
    fontSize: 12,
    color: '#fff',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  loginButton: {
    width: '50%',
    backgroundColor: '#D4D4D4',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
  },
  registerLink: {
    fontSize: 12,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  darkAccent: {
    color: '#00ff99',
  },
  darkInput: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#333',
  },
});

export default Login;
