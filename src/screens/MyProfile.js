import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../firebase/config';
import { FlatList } from "react-native-web";

function MyProfile(props) {

    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentEmail = auth.currentUser.email;

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
            });
        if (users.length > 0) {
            setUserData(users[0].data);
        }
    });

    useEffect(() => {
        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setPosts(posts);
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
        <View>
            <Text>My Profile</Text>
            <View>
                <Text>{userData.name}</Text>
                <Text>{currentEmail}</Text>
            </View>

            <Text>My Posts</Text>
            {loading ? (<Text>Loading...</Text>) 
            : posts.length === 0 ? (<Text>No posts yet</Text>) : (
                <FlatList 
                data={posteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.data.description}</Text>
                        </View>
                    )}
                />
            )}
            <Pressable onPress={() => logout()}>
                <Text>Log Out</Text>
            </Pressable>
        </View>
    );

}