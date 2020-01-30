import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { render } from 'react-dom';
import ToDo from "./ToDo"

const { width, height } = Dimensions.get("window"); //현재 휴대폰의 가로 세로를 가져옴

export default class App extends React.Component {
  state = {
    newToDo: "",
  };
  render() {
    const { newToDo } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>ToDo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.inputText}
            placeholder={"New To Do"}
            placeholderTextColor={"#999"}
            value={newToDo}
            onChangeText={this._crontollNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}   //글 자동 수정
          />

          {/* 스크롤 뷰 (ToDo파일에 style전달) */}
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }

  _crontollNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "100",          //글의 두께
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,          // 가로 크기
    borderTopLeftRadius: 10,    //왼쪽 상단의 테두리 모양
    borderTopRightRadius: 10,    //오른쪽 상단의 테두리 모양
    ...Platform.select({
      ios: {      // ios인 경우
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: -1
        }
      },
      android: {    // android인 경우
        elevation: 3
      }
    }),
  },
  inputText: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
  },
  toDos: {
    alignItems: "center"
  }
});
