import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

function PostCard(props) {
    function likePost() {
        db.collection("posts")
            .doc(props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            });
    }

    function dislikePost() {
        db.collection("posts")
            .doc(props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            });
    }

    return (
        <View style={styles.card}>
            <Text style={styles.user}>{props.post.data.owner}</Text>
            <Text style={styles.description}>{props.post.data.description}</Text>

            <Image style={styles.image} source={{ uri: props.post.data.image }} />

            <Text style={styles.likes}>Likes: {props.post.data.likes.length}</Text>

            {
                props.post.data.likes.includes(auth.currentUser.email) ?
                    <Pressable onPress={() => dislikePost()}>
                        <Text style={styles.like}>Dislike</Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => likePost()}>
                        <Text style={styles.like}>Like</Text>
                    </Pressable>
            }

            <Pressable onPress={() => props.navigation.navigate("Comments", { postId: props.post.id })}>
                <Text style={styles.comment}>Comment</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f5f5f0",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        width: "95%",

    },

    user: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 8,
        color: "#333",
    },

    description: {
        fontSize: 16,
        marginBottom: 10,
        color: "#4b4646ff",
    },

    image: {
        width: "100%",
        height: 200,
        marginBottom: 10,
    },

    likes: {
        fontSize: 14,
        marginBottom: 8,
        color: "#333",
    },

    like: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },

    comment: {
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        padding: 10,
        borderRadius: 20,
        fontWeight: "bold",
        marginTop: 5,
    },
});

export default PostCard;