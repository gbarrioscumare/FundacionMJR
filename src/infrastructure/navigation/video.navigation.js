import React, {Component} from "react";
import { Container } from 'native-base';
import { View, 
    Text,
    Button,
    StyleSheet
} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import VideoPlayer from 'react-native-video-controls'
import Video from '../../../videos/Video introductorio-1.mp4'