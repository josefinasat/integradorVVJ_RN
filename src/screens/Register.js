import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../firebase/config';

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [register, setRegister] = useState(false);
    const [registerError, setRegisterError] = useState('');

    function validar() {
        if (email === "" || password === "" || username === "") {
            setRegisterError("Please complete all fields");
            return false;
        }
        return true;
    }

    function onSubmit() {
        if (!validar()) return;

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                return db.collection('users').add({
                    owner: auth.currentUser.email,
                    user: username,
                    email: email,
                    createdAt: Date.now(),
                });
            })
            .then(() => {
                setRegister(true);
                auth.signOut()
                    .then(() => {
                        props.navigation.navigate('Login');
                    });
            })
            .catch(error => {
                setRegisterError(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                    value={email} />

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Username'
                    onChangeText={text => setUsername(text)}
                    value={username} />

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password} />
                {registerError !== "" ? <Text style={styles.error}>{registerError}</Text> : null}
                <Pressable style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>


                <Pressable
                    onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.link} >Already have an account? Log In </Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f1116",
        paddingHorizontal: 22,
        justifyContent: "center",
    },

    form: {
        width: "100%",
        backgroundColor: "#1a1d24",
        padding: 24,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "#2a2e38",
    },

    title: {
        color: "#f5f5f5",
        fontSize: 38,
        fontWeight: "bold",
        marginBottom: 36,
        textAlign: "center",
    },

    input: {
        backgroundColor: "#232733",
        color: "#f5f5f5",
        borderRadius: 16,
        padding: 14,
        marginBottom: 18,
        fontSize: 15,
    },

    button: {
        backgroundColor: "#d7ff63",
        paddingVertical: 14,
        borderRadius: 18,
        marginTop: 12,
        marginBottom: 22,
    },

    buttonText: {
        color: "#0f1116",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },

    link: {
        color: "#b8bcc8",
        textAlign: "center",
        fontSize: 15,
        lineHeight: 21,
    },

    error: {
        color: "#ff7b7b",
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "bold",
    },
});


export default Register;