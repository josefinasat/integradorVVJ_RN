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

export default Login;
