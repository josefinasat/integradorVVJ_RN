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
                        <Text>{item.data.text}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default Comments;