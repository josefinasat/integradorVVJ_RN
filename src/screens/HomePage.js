import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import PostCard from "../components/PostCard";

function HomePage(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("posts")
                    .orderBy("createdAt", "desc")
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
            } else {
                props.navigation.navigate("Login");
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>

            {
                loading ?
                    <ActivityIndicator size="large" />
                :
                    <FlatList
                        style={styles.flatlist}
                        data={posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => 
                            <PostCard 
                                post={item} 
                                navigation={props.navigation}
                            />
                        }
                    />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
});

export default HomePage;