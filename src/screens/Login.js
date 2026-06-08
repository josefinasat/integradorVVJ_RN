import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate("HomeMenu");
            }
        });
    }, []);

    function onSubmit() {
        if (email === "" || password === "") {
            setError("Please complete all fields");
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then(response => {
                    props.navigation.navigate("HomeMenu");
                })
                .catch(error => {
                    setError("Invalid email or password");
                });
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />

                {error !== "" ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Pressable onPress={() => props.navigation.navigate("Register")}>
                    <Text style={styles.link}>Don’t have an account? Sign up</Text>
                </Pressable>
            </View>
        </View>
    );
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
})

export default Login;
