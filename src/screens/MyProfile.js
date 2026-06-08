import React, { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import { db, auth } from '../firebase/config';


function MyProfile(props) {

    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let users = [];

                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                if (users.length > 0) {
                    setUserData(users[0].data);
                }
            });
    }, []);
    useEffect(() => {
        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let postsArray = [];
                docs.forEach(doc => {
                    if (doc.data().description !== "") {
                        postsArray.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    }
                });
                setPosts(postsArray);
                setLoading(false);
            });
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>
            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Username: </Text>
                    <Text style={styles.infoTitle}>{userData !== null ? userData.user : ""}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Email: </Text>
                    <Text style={styles.infoTitle}>{auth.currentUser.email}</Text>
                </View>
            </View>

            <Text style={styles.subtitle}>My Posts</Text>
            {loading ? (<Text style={styles.text}>Loading...</Text>)
                : posts.length === 0 ? (<Text style={styles.text}>No posts yet</Text>) : (
                    <FlatList
                        data={posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.post}>
                                <Text style={styles.postText}>{item.data.description}</Text>
                            </View>
                        )}
                    />
                )}
            <Pressable style={styles.button} onPress={() => logout()}>
                <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
        </View>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9b9e9e",
        padding: 24,
    },
    title: {
        color: "#f5f5f0",
        fontSize: 26,
        fontWeight: "600",
        marginBottom: 24,
        marginTop: 10,
    },
    infoContainer: {
        marginBottom: 10,
    },

    infoBox: {
        backgroundColor: "#f5f5f0",
        padding: 14,
        borderRadius: 10,
        marginBottom: 8,
        width: "100%", 
        borderWidth: 1,
        borderColor: "#ebebeb",
    },

    infoText: {
        color: "#9c9c98ff",
        fontSize: 13,
    },

    infoTitle: {
        color: "#4b4646ff",
        fontSize: 20,
    },

    subtitle: {
        color: "#f5f5f0",
        fontSize: 26,
        marginTop: 30,
        marginBottom: 20,
        fontWeight: "600",
    },

    text: {
        color: "#333",
        fontSize: 16,
        marginBottom: 10,
    },

    post: {
        backgroundColor: "#f5f5f0",
        padding: 14,
        borderRadius: 10,
        marginBottom: 8,
        width: "100%", 
        borderWidth: 1,
        borderColor: "#ebebeb",
    },
    postText: {
        color: "#4b4646ff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 25,
        marginTop: 25,
        width: "30%",
        alignSelf: "center",

    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default MyProfile;