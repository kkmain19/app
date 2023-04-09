import * as React from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image, Button } from 'react-native';
import { Provider as PaperProvider, Card, List, Avatar, IconButton, Appbar, TextInput } from 'react-native-paper';
import LoginGoogleScreen from './Login-google';
import LoginScreen from './Login';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import auth from '@react-native-firebase/auth';

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

function EditProfile() {

    const [showLogin, setShowLogin] = React.useState(false);
    const [showGoogleAut, setShowGoogleAut] = React.useState(false);
    const [name, setName] = React.useState("");
    const usergoogle = auth().currentUser;
    const [user, setUser] = React.useState('');


    React.useEffect(() => {
        var auth = getAuth();
        auth.onAuthStateChanged(function (us) {
            setUser(us);
        });
        dbListener("/users", setUser);
    }, []);


    const ondatabase = () => {
        console.log("click")
        const db = getDatabase();
        if (usergoogle) {
            set(ref(db, 'users/' + usergoogle.displayName), {
                name: name,
            });
            setName('');

        }
    }

    function handleLoginPress() {
        setShowLogin(true);
    }

    function handleGoogleLoginPress() {
        setShowGoogleAut(true);
    }

    if (showGoogleAut) {
        return <LoginGoogleScreen />;
    }
    if (showLogin) {
        return <LoginScreen />;
    }



    return (
        <View style={{
            flex: 1,
            paddingTop: 10,
            margin: 20,
            alignItems: 'center'
        }}>


            <Image source={require("./assets/Login.png")}
                style={{ width: 300, height: 168 }}
            />

            <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 15, fontWeight: 800 }}>Edit Profile</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17, borderRadius: 15, backgroundColor: '#fff', padding: 20, width: 310, marginBottom: 40 }}
                placeholder="Enter your edit name"
                autoCompleteType="name"
                keyboardType="name-phone-pad"
                textContentType="familyName"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Button title="Save" onPress={() => ondatabase()} />
            <Button title="Back" onPress={handleGoogleLoginPress} />
            <View style={{ width: 330, height: 300 }}>
            </View>
        </View>



    );
}

export default EditProfile;