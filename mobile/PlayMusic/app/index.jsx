import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router'; 

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const formData = { email: username, senha: password };

    try {
      const response = await fetch("http://localhost:8000/autenticacao/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      switch (response.status) {
        case 200:
          const data = await response.json();
          alert(data.msg); 
          router.push('/Home');
          break;
        case 404:
          alert('Este usuário não está cadastrado.');
          break;
        case 403:
          alert('Senha incorreta.');
          break;
        case 406:
          alert('Todos os campos devem ser preenchidos.');
          break;
        default:
          alert('Erro ao se conectar com o servidor.');
          break;
      }
    } catch (error) {
      alert('Erro ao se conectar com o servidor.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>PlayMusic</Text>

          <Text style={styles.subtitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu Email"
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
            <Link href="/Registro" style={styles.register}>
              <Text>Não possui uma conta? Cadastre-se</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D003E', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%', 
    alignItems: 'center',
  },
  loginBox: {
    width: '100%',
    backgroundColor: '#5E3E99', 
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24, 
    color: '#FFFFFF', 
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E6E1E5', 
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  forgotPassword: {
    color: '#FFFFFF', 
    fontSize: 14,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    width: '80%', 
    height: 50, 
    backgroundColor: '#E6E1E5', 
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  register: {
    color: '#FFFFFF', 
    fontSize: 14,
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});

export default LoginScreen;
