import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

function NewPost() {
    const [description, setDescription] = useState("");
    function onSubmit() {
        if (description !== "") {
            db.collection("posts").add({
                owner: auth.currentUser.email,
                description: description,
                createdAt: Date.now(),
                likes: [],
                image: "",
            })
                .then(() => {
                    console.log("Post created");
                    setDescription("");
                })
                .catch((e) => console.log(e));
    }
}

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Create post</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Write the description"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                />
                <Pressable style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Create post</Text>
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
        width: "35%",
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
});
export default NewPost;