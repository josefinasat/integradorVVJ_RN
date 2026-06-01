import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

function NewPost() {
    const [description, setDescription] = useState("");
    function onSubmit() {
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

    return (
        <View>
            <Text>Create post</Text>
            <TextInput
                placeholder="Write the description"
                onChangeText={(text) => setDescription(text)}
                value={description}
            />
            <Pressable onPress={() => onSubmit()}>
                <Text>Create post</Text>
            </Pressable>

            <Text>Entered description: {description}</Text>
        </View>
    );
}

export default NewPost;