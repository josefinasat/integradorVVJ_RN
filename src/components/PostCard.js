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
        backgroundColor: "#1a1d24",
        padding: 16,
        borderRadius: 24,
        marginBottom: 16,
        width: "100%",
        borderWidth: 1,
        borderColor: "#2a2e38",
    },

    user: {
        color: "#f5f5f5",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 8,
    },

    description: {
        color: "#b8bcc8",
        fontSize: 15,
        marginBottom: 14,
        lineHeight: 21,
    },

    image: {
        width: "100%",
        height: 220,
        borderRadius: 18,
        marginBottom: 14,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    likes: {
        color: "#d9dde7",
        fontSize: 14,
    },

    likeButton: {
        backgroundColor: "#232733",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
    },

    like: {
        color: "#d7ff63",
        fontSize: 14,
        fontWeight: "bold",
    },

    commentButton: {
        backgroundColor: "transparent",
        paddingVertical: 12,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#d7ff63",
        marginTop: 4,
    },

    comment: {
        color: "#d7ff63",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default PostCard;