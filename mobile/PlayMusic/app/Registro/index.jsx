import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Necessário para navegação

const Register = () => {
  const navigation = useNavigation(); // Usado para redirecionar

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bday, setBday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const handleRegister = async () => {
  //   if (!name || !surname || !bday || !email || !password || !confirmPassword) {
  //     return alert("Todos os campos devem ser preenchidos");
  //   }



  //   const formData = { name, surname, bday, email, password };
  //   try {
  //     const res = await fetch("http://localhost:8000/registro", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     switch (res.status) {
  //       case 201:
  //         alert("Usuário criado");
  //         break;
  //       case 406:
  //         alert("Preencha todos os campos");
  //         break;
  //       case 418:
  //         alert("Email já cadastrado");
  //         break;
  //       default:
  //         alert("Erro ao se conectar com servidor");
  //         break;
  //     }
  //   } catch (error) {
  //     alert("Erro ao se conectar com o servidor");
  //     return
  //   }
  // };

  const handleRegister = async () => {
    //verify if the data are valid
    if (!name || !surname || !bday || !bday || !email || !password) {
      return alert("Todos os campos devem ser preenchidos");
    }

    const formData = {nome:  name, sobrenome: surname, dataNascimento: bday, email: email, senha: password};

    //register with a fetch  reques
    try {
      const res = await fetch("http://localhost:8000/registro", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (response.status) {
        case 201:
          alert("Usuário criado");
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
    } catch (error) {}
  };

  const autoBirthdayFormater = (text) => {
    const cleanedText = text.replace(/\D/g, "");
    let formattedText = "";
    if (cleanedText.length > 0) {
      formattedText += cleanedText.substring(0, 2);
    }
    if (cleanedText.length >= 2) {
      formattedText += "/";
      formattedText += cleanedText.substring(2, 4);
    }
    if (cleanedText.length >= 4) {
      formattedText += "/";
      formattedText += cleanedText.substring(4, 8);
    }
    setBday(formattedText);
  };

  // Opção 1: Redirecionar para outra tela
  const handleCancelRedirect = () => {
navigation.goBack(); // Volta para a tela anterior
    // Ou, para redirecionar para uma tela específica, use:
    // navigation.navigate("HomeScreen"); // Substitua "HomeScreen" pelo nome da tela desejada    
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>PLAY MUSIC</Text>
      <Text style={styles.subtitle}>Digite seus dados para se cadastrar</Text>
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
        onChangeText={(text) => autoBirthdayFormater(text)}
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
        <TouchableOpacity style={styles.cancelButton} href={'../'}>
          <Text style={styles.buttonText}>Cancelar</Text>
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
    backgroundColor: "#2E004F",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#D4D4D4",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333333",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#875B9B",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  registerButton: {
    backgroundColor: "#875B9B",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Register;
