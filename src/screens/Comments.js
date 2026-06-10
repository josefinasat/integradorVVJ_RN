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
                    createdAt: Date.now(),
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
                <Text style={styles.back}>Back to Home</Text>
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
        backgroundColor: "#0f1116",
        paddingHorizontal: 22,
        paddingTop: 25,
    },

    backButton: {
        alignSelf: "flex-start",
        marginBottom: 20,
    },

    back: {
        color: "#d7ff63",
        borderWidth: 1,
        borderColor: "#d7ff63",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 18,
        fontWeight: "bold",
    },

    title: {
        color: "#f5f5f5",
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 24,
    },

    input: {
        backgroundColor: "#232733",
        color: "#f5f5f5",
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
        fontSize: 15,
    },

    button: {
        backgroundColor: "#d7ff63",
        paddingVertical: 14,
        borderRadius: 18,
        marginBottom: 24,
    },

    buttonText: {
        color: "#0f1116",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },

    commentCard: {
        backgroundColor: "#1a1d24",
        padding: 16,
        borderRadius: 20,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#2a2e38",
    },

    owner: {
        color: "#f5f5f5",
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 8,
    },

    commentText: {
        color: "#b8bcc8",
        fontSize: 15,
        lineHeight: 21,
    },
});
export default Comments;