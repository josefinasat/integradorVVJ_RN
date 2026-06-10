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
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 28,
        textAlign: "center",
    },

    input: {
        backgroundColor: "#232733",
        color: "#f5f5f5",
        borderRadius: 18,
        padding: 14,
        marginBottom: 20,
        fontSize: 15,
        height: 130,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: "#d7ff63",
        paddingVertical: 14,
        borderRadius: 18,
        marginTop: 8,
    },

    buttonText: {
        color: "#0f1116",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default NewPost;