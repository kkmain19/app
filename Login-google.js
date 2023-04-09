import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image, ImageBackground, TouchableOpacity } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import Header from "./Header";
import { Provider as PaperProvider, Card, List, Button, Avatar, IconButton, Appbar } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import MainScreen from "./MainMenu";
import EditProfile from "./EditProfile";

const backgroundImage = require('./assets/Login.png');

const firebaseConfig = {
  apiKey: "AIzaSyDxYvxHuPIIbVPcDJRXsUlllNd13IT2HZ8",
  authDomain: "mobile-capital-city.firebaseapp.com",
  databaseURL: "https://mobile-capital-city-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobile-capital-city",
  storageBucket: "mobile-capital-city.appspot.com",
  messagingSenderId: "1060413453223",
  appId: "1:1060413453223:web:1342198613b2f52529bc82",
  measurementId: "G-HH20W1523Y"
};


LogBox.ignoreAllLogs(true);

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) { }

function dbListener(path, setData) {
    const tb = ref(getDatabase(), path);
    onValue(tb, (snapshot) => {
        setData(snapshot.val());
    })
}

function renderCapital(item, index, setItem) {
    var icon = <Image style={{ width: 30, height: 20 }} source={{ uri: `https://flagpedia.net/data/flags/h80/${item.code}.webp` }} />
    var desc =
        <View>

            <Card.Content>

                <Image style={{ width: 220, height: 100 }} source={{ uri: `${item.image}` }} />


                <Text >{"เมืองหลวง " + item.capital}</Text>

            </Card.Content>

        </View>;

    return <Card style={{ margin: 15, marginTop: -5 }}><List.Item
        onPress={() => setItem(item)}
        title={"    ประเทศ " + item.name}
        description={desc}
        left={(props => icon)}
        style={{ marginLeft: 20, marginTop: 10 }}
    >

    </List.Item></Card>
}


function Detail(props) {
    var icon = <Image style={{ width: 60, height: 40 }} source={{ uri: `https://flagpedia.net/data/flags/h80/${props.item.code}.webp` }} />

    return <PaperProvider>
        <Appbar.BackAction onPress={() => { props.setItem(null) }} />
        <View >


            <Card>

                <Card.Content>

                    {/* <Avatar.Image size={90} source={{ uri: `https://flagpedia.net/data/flags/h80/${props.item.code}.webp` }} /> */}
                    <Card.Title
                        title={"     ชื่อประเทศ: " + props.item.name}
                        subtitle={"      เมืองหลวง: " + props.item.capital}
                        left={(props) => icon}
                    />
                    <Card.Title title={"ประวัติ: "} />
                    <Card.Cover source={{ uri: `${props.item.image}` }} />
                    <Text></Text>
                    <Text variant="bodyMedium">{props.item.history}</Text>
                </Card.Content>
            </Card>

        </View>
    </PaperProvider>
};

function Loading() {
    return <View><Text>Loading</Text></View>
}


export default function LoginGoogleScreen() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [capital, setCapital] = React.useState([]);
    const [citem, setCitem] = React.useState(null);
    const [showEdit,setshowEdit]= React.useState(false);
    const [user1, setUser1] = React.useState([]);

    React.useEffect(() => {
        var auth = getAuth();
        auth.onAuthStateChanged(function (us) {
            setUser(us);
        });
        dbListener("/capital", setCapital);
        dbListener("/users", setUser1);
    }, []);


    GoogleSignin.configure({
        webClientId: '1060413453223-f7mau0b7n33uret747p1mv3enbi4u12j.apps.googleusercontent.com',
    });

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential)
        user.user_sign_in.then((user) => {
            console.log(user);
        })
            .catch((error) => {
                console.log(error);
            })


    }
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
        } catch (error) {
            console.error(error);
        }
    }
    const [showHome, setShowHome] = React.useState(false);

    function handleAboutPress() {
        setShowHome(true);
    }

    if (showHome) {
        return <MainScreen />;
    }
    const signOutandShowHome = () => {
        signOut();
        handleAboutPress();
    }

    if (initializing) return null;

    if (!user) {

        return (
            <View style={styles.container}>
                {/* <ImageBackground source={backgroundImage} style={styles.backgroundImage}> */}
                <ImageBackground style={styles.backgroundImage}>

                    <Image style={{ width: 200, height: 200 }} source={require("./assets/Capital_Round.png")} />
                    <GoogleSigninButton
                        style={{ width: 300, height: 50, margin: 50 }}
                        onPress={onGoogleButtonPress}
                    />
                    <View >
                        <Button
                            style={{
                                textAlign: 'center',
                                width: 300,
                                margin: 50,
                                marginLeft: 20,
                                marginRight: 20,
                                fontWeight: 400
                            }}
                            mode="elevated"
                            onPress={handleAboutPress}
                        >Back To Main Menu</Button>
                    </View>

                    <Header />
                </ImageBackground>
            </View>
        )
    }
    if (capital.length == 0) {
        return <Loading />;
    }


    if (citem != null) {
        return <Detail item={citem} setItem={setCitem} />;
    }
    function pressbuttonshowEdit(){
        setshowEdit(true);
    }
    if (showEdit){
        return <EditProfile/>
    }
    return (
        <PaperProvider>
            <View>
                <Card>
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 30 }}>
                            <TouchableOpacity onPress={pressbuttonshowEdit}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50,marginTop: 10, borderRadius: 100, borderColor: 'black', borderWidth: 1, marginLeft: 10 }} source={{ uri: user.photoURL }} />

                                </View>
                            </TouchableOpacity>
                            <Text style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' , marginTop: 15 ,margin:10 }}>{`${user1?.[user.displayName].name||user.displayName}`}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' , marginTop: 10 }}>
                                <Button icon="logout" onPress={signOut}>
                                    Sign Out
                                </Button>
                            </View>
                        </View>

                    </Card.Content>
                </Card>
            </View>

            <ScrollView>


                <View style={styles.container}>

                    <Card>
                        <Card.Cover source={require("./assets/cover-capital.png")} />
                        <Card.Title
                            title="เมืองหลวงของแต่ละประเทศ"
                            style={{ marginTop: 20 }}
                        />

                        <Card.Content>
                            <FlatList data={capital} renderItem={({ item, index }) => renderCapital(item, index, setCitem)}> </FlatList>
                        </Card.Content>
                    </Card>
                    <StatusBar style="auto" />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="rgba(200,0,0,0.4)" style="light" barStyle="light-content" />
        </PaperProvider>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});