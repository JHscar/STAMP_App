import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

function Item({ item, navigate, data }) {
  return (
    <View style={styles.listItem}>
      <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text>{item.position}</Text>
        <Text>평점</Text>
      </View>
      <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }} onPress={() => navigate('Mission_View', { data })}>
        <Text style={{ color: "green" }}>상세정보</Text>
      </TouchableOpacity>
    </View>
  );
}


export default class MissionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
        [
          {
            coordinate: {
              latitude: 37.550214,
              longitude: 127.127516,
            },
            name: "미션명1",
            email: "miyah.myles@gmail.com",
            position: "Data Entry Clerk",
            photo: "https://i.imgur.com/sNam9iJ.jpg"
          },
          {
            coordinate: {
              latitude: 37.538807,
              longitude: 127.123453,
            },
            name: "미션명2",
            email: "june.cha@gmail.com",
            position: "Sales Manager",
            photo: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          {
            coordinate: {
              latitude: 37.515688,
              longitude: 127.09856,
            },
            name: "미션명3",
            email: "iida.niskanen@gmail.com",
            position: "Sales Manager",
            photo: "https://randomuser.me/api/portraits/women/68.jpg"
          },
          {
            coordinate: {
              latitude: 37.498154,
              longitude: 127.027648,
            },
            name: "미션명4",
            email: "renee.sims@gmail.com",
            position: "Medical Assistant",
            photo: "https://randomuser.me/api/portraits/women\/65.jpg"
          },
          {
            coordinate: {
              latitude: 37.598154,
              longitude: 127.07648,
            },
            name: "미션명5",
            email: "jonathan.nu\u00f1ez@gmail.com",
            position: "Clerical",
            photo: "https://randomuser.me/api/portraits/men/43.jpg"
          },
          {
            coordinate: {
              latitude: 37.398154,
              longitude: 127.05648,
            },
            name: "미션명6",
            email: "sasha.ho@gmail.com",
            position: "Administrative Assistant",
            photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
          },
          {
            coordinate: {
              latitude: 37.598154,
              longitude: 127.017648,
            },
            name: "미션명7",
            email: "abdullah.hadley@gmail.com",
            position: "Marketing",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
          },
          {
            coordinate: {
              latitude: 37.398154,
              longitude: 127.017648,
            },
            name: "미션명8",
            email: "thomas.stock@gmail.com",
            position: "Product Designer",
            photo: "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
          },
          {
            coordinate: {
              latitude: 37.398154,
              longitude: 127.07648,
            },
            name: "미션명9",
            email: "veeti.seppanen@gmail.com",
            position: "Product Designer",
            photo: "https://randomuser.me/api/portraits/men/97.jpg"
          },
          {
            coordinate: {
              latitude: 37.598154,
              longitude: 127.04648,
            },
            name: "미션명10",
            email: "bonnie.riley@gmail.com",
            position: "Marketing",
            photo: "https://randomuser.me/api/portraits/women/26.jpg"
          }
        ]
    }
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          renderItem={({ item }) => <Item item={item} navigate={navigate} data={this.state.data} />}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
}

// MissionList.navigationOptions = {
//   header: null,
// };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  }
});