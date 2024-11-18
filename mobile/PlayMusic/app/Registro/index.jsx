import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, useRouter } from 'expo-router'; 

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bday, setBday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter(); 

  const handleRegister = async () => {
    if (!name || !surname || !bday || !email || !password || !confirmPassword) {
      return alert("Todos os campos devem ser preenchidos");
    }

    const formData = { nome:name, sobrenome: surname, dataNascimento:bday, email:email, senha:password }; 
    try {
      const res = await fetch("http://localhost:8000/autenticacao/registro", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (res.status) {
        case 201:
          alert("Usuário criado");
          router.push('/Home');
          break;
        case 406:
          alert("Preencha todos os campos");
          break;
        case 418:
          alert("Email já cadastrado");
          break;
        default:
          alert("Erro ao se conectar com servidor");
          break;
      }
    } catch (error) {
      alert("Erro ao se conectar com o servidor");
    }
  };

  const autoBirthdayFormater = (text) => {
  
    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 8); 
    const day = formattedText.slice(0, 2);
    const month = formattedText.slice(2, 4);
    const year = formattedText.slice(4, 8);
  
    if (month && year) {
      return `${day}/${month}/${year}`; 
    }
    return formattedText; 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PlayMusic</Text>
      <Text style={styles.subtitle}>Digite seus dados</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#808080"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        placeholderTextColor="#808080"
        value={surname}
        onChangeText={(text) => setSurname(text)}
        autoCapitalize="words"
      />
      <TextInput
  style={styles.input}
  placeholder="Data de nascimento"
  placeholderTextColor="#808080"
  value={bday}
  onChangeText={(text) => setBday(autoBirthdayFormater(text))} 
  inputMode="numeric"
/>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        inputMode="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#808080"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#808080"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}> 
          <Link href="../" style={styles.register}><Text>Cancelar</Text></Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E0839", 
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#D3D3D3", 
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333333",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#5E3E99", 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#D3D3D3", 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#D3D3D3", 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  register: {
    fontWeight: "bold",
    color: "black",
  },
});

export default Register;
