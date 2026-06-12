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
                    postsArray.push({
                        id: doc.id,
                        data: doc.data()
                    });
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
        backgroundColor: "#0f1116",
        paddingHorizontal: 22,
        paddingTop: 28,
    },

    title: {
        color: "#f5f5f5",
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 24,
    },

    infoContainer: {
        marginBottom: 22,
    },

    infoBox: {
        backgroundColor: "#1a1d24",
        padding: 18,
        borderRadius: 22,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#2a2e38",
    },

    infoText: {
        color: "#b8bcc8",
        fontSize: 14,
        marginBottom: 6,
    },

    infoTitle: {
        color: "#f5f5f5",
        fontSize: 20,
        fontWeight: "bold",
    },

    subtitle: {
        color: "#f5f5f5",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
    },

    text: {
        color: "#b8bcc8",
        fontSize: 16,
        marginBottom: 18,
    },

    post: {
        backgroundColor: "#1a1d24",
        padding: 16,
        borderRadius: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#2a2e38",
    },

    postText: {
        color: "#b8bcc8",
        fontSize: 15,
        lineHeight: 21,
    },

    button: {
        backgroundColor: "#d7ff63",
        paddingVertical: 14,
        borderRadius: 18,
        marginTop: 10,
        marginBottom: 18,
    },

    buttonText: {
        color: "#0f1116",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default MyProfile;