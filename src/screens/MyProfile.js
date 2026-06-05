import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../firebase/config';

function MyProfile(props) {

    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentEmail = auth.currentUser.email;

    useEffect(() => {
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({ 
                        id: doc.id, 
                        data: doc.data() });
                });
            }
        )
    })

}