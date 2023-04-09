import * as React from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox,Image } from 'react-native';
import { Provider as PaperProvider, Card, List, Button, Avatar, IconButton,Appbar  } from 'react-native-paper';
import LoginGoogleScreen from './Login-google';
import LoginScreen from './Login';

function MainScreen({setIntro}) {

    const [showLogin, setShowLogin] = React.useState(false);
    const [showGoogleAut, setShowGoogleAut] = React.useState(false);

    function handleLoginPress(){
        setShowLogin(true);
    }

    function handleGoogleLoginPress() {
        setShowGoogleAut(true);
    }

    if (showGoogleAut) {
        return <LoginGoogleScreen />;
    }
    if (showLogin){
        return <LoginScreen />;
    }

    return (
        <View style={{
            flex: 1, 
            paddingTop: 150, 
            margin:20,
            alignItems: 'center'
        }}>


            <Image source={require("./assets/Login.png")}
                style={{ width: 300, height: 168}}
            />

            <Text style={{textAlign:'center', fontSize:25, marginTop:15, fontWeight:800}}>Caputal City Guide</Text>
            <Text style={{textAlign:'center', fontSize:15, marginTop:15, marginLeft:20, marginRight:20, fontWeight:400}}>We will introduce the capitals if each country so that you can get to know and educate yourself and you can go sightseeing
            </Text>
            <View style={{ width: 330, height: 300 }}>
                <Button style={{ textAlign: 'center', marginTop: 15, marginLeft: 20, marginRight: 20, fontWeight: 400 }} mode="contained" onPress={handleGoogleLoginPress}>Login with Google</Button>
                <Button style={{ textAlign: 'center', marginTop: 15, marginLeft: 20, marginRight: 20, fontWeight: 400 }} mode="contained" onPress={handleLoginPress}>Login with phone</Button>
            </View>
        </View>

        
        
    );
}

export default MainScreen;