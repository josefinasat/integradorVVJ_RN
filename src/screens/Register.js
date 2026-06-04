import React, { useState } from "react";
import {Text, View, TextInput, Pressable, StyleSheet} from "react-native";
import {db, auth} from '../firebase/config';

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [register, setRegister] = useState(false);
    const [registerError, setRegisterError] = useState('');

    function onSubmit() {
        console.log('Register', { email, username });
        
        auth.createUserWithEmailAndPassword(email, password)
            .then (response => {
                db.collection('users').add({
                    owner:auth.currentUser.email,
                    user: username,
                    email: email,
                    createdAt: Date.now(),
                })

                setRegister(true)
                if (props && props.navigation) props.navigation.navigate('Login');
            })
            .catch (error => {
                setRegisterError('Fallo en el registro')
            })
    }

    return (
        <View>
            <Text>Register</Text>
            <TextInput 
                keyboardType='email-address'
                placeholder='email...'
                onChangeText={ text => setEmail(text)}
                value={email} />

            <TextInput 
                keyboardType='default'
                placeholder='username...'
                onChangeText={ text => setUsername(text)}
                value={username} />

            <TextInput 
                keyboardType='default'
                placeholder='password...'
                secureTextEntry={true}
                onChangeText={ text => setPassword(text)}
                value={password}/>
            <Pressable  onPress={() => onSubmit()}>
                <Text>Register</Text>
            </Pressable>

        <Pressable
            onPress={() => props.navigation && props.navigation.navigate('Login')}>
            <Text>Already have an account? Log In </Text>
        </Pressable>
        </View>
    )
}


export default Register;