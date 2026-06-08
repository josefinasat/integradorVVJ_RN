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
        backgroundColor: "#9b9e9e",
        padding: 35,
        justifyContent: "center",
    },

    form: {
        width: "30%",
        alignSelf: "center",
    },

    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 40,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        color: "white",
        marginBottom: 25,
        padding: 8,
    },

    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 25,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },

    link: {
        color: "white",
        textAlign: "center",
    },

    error: {
        color: "white",
        textAlign: "center",
        marginBottom: 10,
    },
});


export default Register;