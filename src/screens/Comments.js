import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

function Comments(props) {
    const [campo, setCampo] = useState("");
    const [comments, setComments] = useState([]);

    const postId = props.route.params.postId;

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
                let commentsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }));
                setComments(commentsData);
            });
    }, []);

    function addComment() {
        if (campo !== "") {
            db.collection("posts")
                .doc(postId)
                .collection("comments")
                .add({
                    text: campo,
                    owner: auth.currentUser.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    setCampo("");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => props.navigation.goBack()}>
                <Text style={styles.back}>Back to post</Text>
            </Pressable>
            <Text style={styles.title}>Comments</Text>

            <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={campo}
                onChangeText={text => setCampo(text)}
            />

            <Pressable style={styles.button} onPress={() => addComment()}>
                <Text style={styles.buttonText}>Comment</Text>
            </Pressable>

            <FlatList
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentCard}>
                        <Text style={styles.owner}>{item.data.owner}</Text>
                        <Text style={styles.commentText}>{item.data.text}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9b9e9e",
        padding: 35,
        alignItems: "center",
    },

    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 30,
        width: 400,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        color: "white",
        padding: 8,
        marginBottom: 25,
        width: 400,
    },

    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 25,
        marginBottom: 25,
        width: 400,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    owner: {
        color: "#333",
        fontWeight: "bold",
        marginBottom: 8,
    },
    back: {
        color: "white",
        backgroundColor: "black",
        padding: 8,
        borderRadius: 25,
        fontWeight: "bold",
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 25,
    },
    commentCard: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: 400,
    },
    commentText: {
        color: "#333",
        fontSize: 16,
    },
});
export default Comments;