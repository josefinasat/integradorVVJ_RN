import React, {useState, useEffect} from "react";
import {Text, View, TextInput, Pressable, StyleSheet} from "react-native";
import {auth} from "../firebase/config";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate("Home");
            }
        });
    }, []);

    function onSubmit () {
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                props.navigation.navigate("Home");
            })
            .catch(error => {
                setError(error.message);
    
            });
    }

    return (
        <View style={styles.container}>
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
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {error !== "" ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate("Register")}>
                <Text style={styles.link}>I don't have an account. Sign up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default Login;
