import { Link } from "expo-router";
import  { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    return (
        <ImageBackground
            source={require('../assets/images/fundo.jpeg')}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logotipo.png')}
                />
                <Text style={styles.title}>Cadastre-se</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nome"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="E-mail"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Senha"
                    secureTextEntry // Usado para ocultar o texto da senha
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Repetir Senha"
                    secureTextEntry // Usado para ocultar o texto da senha
                />
                <View style={styles.btncontainer}>
                    <Link href="/" style={styles.buttons}>
                        <Text style={styles.buttonsText}>Voltar</Text>
                    </Link>

                    <Link href="/login" style={styles.buttonsEntrar}>
                        <Text style={styles.buttonsText}>Cadastrar</Text>
                    </Link>

                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',

    }, overlay: {
        backgroundColor: 'rgba(32, 4, 4, 0.7)', // Sobreposição semitransparente
        padding: 20,
        borderRadius: 10,
        width: '80%', // Ajuste a largura para não ficar muito largo
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 18,
        color: "black",
        padding: 10,
        paddingHorizontal: 20,
        fontWeight: "bold",
        backgroundColor: "white",
        borderRadius: 15,
        height: 50,
        width: '100%',
        marginVertical: 10, // Margem vertical para separar melhor os campos
    },
    title: {
        fontSize: 40,
        color: "white", // Mudado para branco para contrastar com o fundo escuro
        fontWeight: "bold",
        marginBottom: 25, // Espaço abaixo do título
    },
    buttons: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        flex: 1,
    },
    buttonsEntrar: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        flex: 1,
    },
    buttonsText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        textAlign: 'center',
        alignItems: 'center',
    },

    btncontainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        textAlign: 'center',

    },
});
