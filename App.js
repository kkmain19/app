import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image,TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button, Avatar, IconButton, Appbar } from 'react-native-paper';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'expo-dev-client'
import MainScreen from './MainMenu';
import LoginPhone from './Login';
import ItemCardContainer from './ItemCardContainer';
import EditProfile from './EditProfile';
import EditProfileNum from './EditProfileNum';




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

  return <SafeAreaProvider>
    <Appbar.BackAction onPress={() => { props.setItem(null) }} />
    <View>


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
  </SafeAreaProvider>
};


function Loading() {
  return <View><Text>Loading</Text></View>
}



export default function App() {
  const [capital, setCapital] = React.useState([]);
  const [user, setUser] = React.useState(null);
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

  function pressbuttonshowEdit(){
    setshowEdit(true);
}

  if (capital.length == 0) {
    return <Loading />;
  }

  if (citem != null) {
    return <Detail item={citem} setItem={setCitem} />;
  }

  if (user == null) {
    return <MainScreen />;
  }
  if (showEdit){
    return <EditProfileNum/>
}

  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5,marginBottom:5 }}>
        <TouchableOpacity onPress={pressbuttonshowEdit}>
            <View style={{ alignItems: 'center' }}>
              <Image style={{ width: 50, height: 50,marginTop: 0, borderRadius: 100, borderColor: 'black', borderWidth: 1, marginLeft: 10 }} source={require("./assets/profile.png")} />

              </View>
              </TouchableOpacity>
              <Text style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' , marginTop: 15 ,margin:10 }}>{`${user1?.[user.phoneNumber]?.name||user?.phoneNumber}`}</Text>
        </View>

        
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
      <View>
        <Button icon="logout" onPress={() => getAuth().signOut()}>
          Sign Out
        </Button>
      </View>
      <StatusBar backgroundColor="rgba(200,0,0,0.4)" style="light" barStyle="light-content" />
    </PaperProvider>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
