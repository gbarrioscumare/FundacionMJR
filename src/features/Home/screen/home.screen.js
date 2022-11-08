import React, {Component , useState, useEffect} from "react";
import { Container } from 'native-base';
import * as firebase from "firebase";
import { View, 
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native"
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "firebase/auth";
import "firebase/firestore";
import VideoPlayer from 'react-native-video-controls'

import Video from '../../../videos/Videointroductorio-1.mp4'
import Logo from '../../../../assets/logo.png'
import Player from './video.screen'

const Home = ({navigation}) => {

    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const [user, setUser] = useState(null) // This user
    const [users, setUsers] = useState([]) // Other Users

    useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])

    useEffect(() => {
        if (user)
            firestore().collection("users").where("role", "==", (user?.role === "Usuario" ? "Administrador" : "Usuario"))
                .onSnapshot(users => {
                    if (!users.empty) {
                        const USERS = []

                        users.forEach(user => {
                            USERS.push(user.data())
                        })

                        setUsers(USERS)
                    }
                })
    }, [user])

    return(
        <View style={styles.container} >
            <Text style={styles.title}>BIENVENIDO A LA APLICACION MJR</Text>
            <Text style={styles.subtitle}>Hacer click en la imagen para ver el video introductorio</Text>
            <TouchableOpacity style={styles.coverButton} onPress={() => navigation.navigate('Player')}>
            <Image 
            style={styles.stretch}
            source={require('../../../../assets/Arbol.png')} />
            </TouchableOpacity>
            <Text style={styles.title2}>¿Quienes Somos?</Text>
        </View>
    );
}
export default Home;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignItems:'center',
        backgroundColor: "#ffcc6c",
        height: "100%"
      },
      stretch: {
        width: "90%",
        height: 200,
        resizeMode: 'stretch',
        alignItems:'center',
        position: "relative",
        marginTop: 0,
        borderRadius:10
        
      },
      coverButton:{
        width:'90%',
        height: 200,
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginTop:25,
        borderRadius:10,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    title2:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:20,
    },
})