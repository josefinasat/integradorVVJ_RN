import React from "react";
import {Text, View, Image, Pressable, StyleSheet} from "react-native";
import {auth, db} from "../firebase/config";
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

            <Image style={styles.image} source={{uri:props.post.data.image}}/>

            <Text>Likes: {props-post.data.likes.length}</Text>

            {
                props.post.data.likes.includes(auth.currentUser.email) ?
                    <Pressable onPress={() => dislikePost()}>
                        <Text style={styles.like}>Like</Text>
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
comment: {
        fontSize: 20,
    },
})

export default PostCard;