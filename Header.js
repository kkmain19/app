import { View, Text } from 'react-native'
import React from 'react';

const Header = () => {
    return (
        <View style={{marginLeft:70, marginTop:30, marginRight:60}}>
            <Text style={{fontWeight:'normal', fontSize:16}}>
            You can log in with Google Auth on our application, 
            which has requested permission to access data in your account, 
            such as your name and profile picture.
            </Text>
        </View>
    )
}

export default Header