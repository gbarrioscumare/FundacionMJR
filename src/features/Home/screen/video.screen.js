import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Video from 'react-native-video';
import videoURL from '../../../videos/Videointroductorio-1.mp4';
import YoutubePlayer from 'react-native-youtube-iframe'

const Player=({navigation,route})=>{

    const {width,height} = Dimensions.get("screen")

    return(
        <View style={styles.mainPlayerView}>
            <View style={{height: height, backgroundColor:'#ffcc6c', alignItems:'center'}}>
                <YoutubePlayer
                height={250}
                width = {415}
                marginBottom={100}
                play={true}
                videoId={'2Gj_YzE1-pg'}
                />
                <Text style={styles.title2}>Nuestro objetivo</Text>
            </View>
        </View>
    )
}

export default Player;

const styles = StyleSheet.create({
    mainPlayerView:{
        flex:1,
        backgroundColor: "#ffcc6c"
    },
    title2:{
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
})