import { Link, router, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ImageBackground, Image, Pressable, Alert } from "react-native";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const validarEmail = (email: string) => {
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = (event: any) => {
        event.preventDefault();
        
       
        setEmailError('');
        setSenhaError('');
        
        let isValid = true;
        
     
        if (!email) {
            setEmailError('O campo de email é obrigatório');
            isValid = false;
        } else if (!validarEmail(email)) {
            setEmailError('Email inválido. Digite um email correto');
            isValid = false;
        }
        
        
        if (!senha) {
            setSenhaError('O campo de senha é obrigatório');
            isValid = false;
        } else if (senha.length < 6) {
            setSenhaError('A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }
        
       
        if (isValid) {
            router.replace('/pedidos');
        }
    };
    
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
                <Text style={styles.title}>Login</Text>
                
                <TextInput 
                    style={styles.textInput} 
                    placeholder="email"
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        setEmail(text);
                        if (emailError) setEmailError('');
                    }}
                    value={email}
                />
                {emailError ? <Text style={styles.textSaida}>{emailError}</Text> : null}

                <TextInput
                    style={styles.textInput}
                    placeholder="senha"
                    keyboardType="default"
                    secureTextEntry
                    onChangeText={(text) => {
                        setSenha(text);
                        if (senhaError) setSenhaError('');
                    }}
                    value={senha}
                />
                {senhaError ? <Text style={styles.textSaida}>{senhaError}</Text> : null}

                <View style={styles.btncontainer}>
                    <Link href="/cadastro" style={styles.buttons}>
                        <Text style={styles.buttonsText}>Cadastrar</Text>
                    </Link>

                    <Pressable style={styles.buttons} onPress={handleLogin}>
                        <Text style={styles.buttonsText}>Entrar</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable style={styles.botaoSair}>
                <Link href="/(tabs)">
                    <Text style={{ color: 'white' }}>Sair</Text>
                </Link>
            </Pressable>
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
    },
    overlay: {
        backgroundColor: 'rgba(32, 4, 4, 0.7)', 
        padding: 20,
        borderRadius: 10,
        width: '80%',
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
        marginVertical: 10,
    },
    textSaida: {
        fontSize: 14,
        color: "red",
        marginTop: -5,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 40,
        color: "white",
        fontWeight: "bold",
        marginBottom: 25,
    },
    buttons: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        flex: 1,
        alignItems: 'center', 
    },
    buttonsText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        textAlign: 'center',
    },
    btncontainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        justifyContent: 'center', 
    },
    botaoSair: {
        backgroundColor: "red",
        fontSize: 18,
        borderRadius: 10,
        marginVertical: 20,
        padding: 15,
        textAlign: 'center',
    },
});