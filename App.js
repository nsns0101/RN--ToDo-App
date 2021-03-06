import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import { render } from 'react-dom';
import ToDo from "./ToDo";
import { AppLoading } from "expo";  //앱의 로딩 상태를 확인
import uuidv1 from "uuid/v1";     //uuid version1 (소프트웨어 난수)


const { width, height } = Dimensions.get("window"); //현재 휴대폰의 가로 세로를 가져옴

export default class App extends React.Component {

  state = {
    newToDo: "",
    loadedToDos: false,   //앱을 열 경우 전에 쓴 ToDo List들이 보이게 로드
    toDos: {}    //ToDoList
  };

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state
    // console.log(toDos); //모든 ToDo

    //앱 로딩이 안되어 있으면
    if (!loadedToDos) {
      // console.log("");
      console.log("aa");
      return <AppLoading />;
    }

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
            onSubmitEditing={this._addToDo}
          />

          {/* 스크롤 뷰 (ToDo파일에 style전달) */}
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* toDos객체(ToDoList) 개수만큼 반복(key와 값들) */}
            {Object.values(toDos).map(toDo => ( //revserse는 반대로 정렬
              <ToDo
                key={toDo.id}
                updateToDo={this._updateToDo}             //텍스트 편집시 적용되는 함수
                deleteToDo={this._deleteToDo}             //텍스트 삭제시 적용되는 함수
                completeToDo={this._completeToDo}         //라디오버튼 클릭시 적용되는 함수
                uncompleteToDo={this._uncompleteToDo}     //라디오버튼 한번 더 클릭시 적용되는 함수
                {...toDo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _crontollNewToDo = (text) => {
    this.setState({
      newToDo: text
    });
  };

  // 로딩상태를 전달
  _loadToDos = async () => {
    try {

      // console.log(AsyncStorage);
      const toDos = await AsyncStorage.getItem("toDos");
      // console.log(JSON.parse(toDos));
      this.setState({
        loadedToDos: true,
        toDos: JSON.parse(toDos),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //ToDoList 추가
  _addToDo = () => {
    const { newToDo } = this.state;   //현재 입력창에 적어진 글
    //입력창에 무엇인가 써있다면 추가하게
    if (newToDo !== "") {
      this.setState(prevState => {
        // console.log(prevState);      //현재 State의 값
        const ID = uuidv1();  //난수의 id를 생성
        //추가할 ToDo
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            cretedAt: Date.now()     //생성 시간
          }
        };
        //ToDoList 새로고침
        const newState = {
          ...prevState,
          newToDo: "",            //입력창을 비워줌
          toDos: {
            ...prevState.toDos,   //원래 가지고 있는 ToDo들
            ...newToDoObject,     //새로 추가하는 ToDo     왜 ...을 쓰지? 하나지 않나?
          }
        }
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    };
  };

  //ToDoList 삭제
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  //라디오 버튼 누르기 전
  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      // console.log(prevState);
      const newState = {
        ...prevState,     //현재 State의 값(로딩했는지 값은 비웠는지?)
        //newState.toDos
        toDos: {
          ...prevState.toDos, //현재 State.toDos의 값
          //newState.toDos[id]
          [id]: {
            ...prevState.toDos[id], //현재 State.toDos의 id값
            isCompleted: false
          }
        }
      }
      // console.log(...newState);
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  //라디오버튼 누른 후
  _completeToDo = (id) => {
    this.setState(prevState => {
      // console.log(prevState);
      const newState = {
        ...prevState,       //현재 State의 값(로딩했는지 값은 비웠는지?)
        //newState.toDos
        toDos: {
          ...prevState.toDos, //현재 State.toDos의 값
          //newState.toDos[id]
          [id]: {
            ...prevState.toDos[id], //현재 State.toDos의 id값
            isCompleted: true       //라디오버튼 누르기 완료
          }
        }
      }
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };


  //텍스트 편집
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,   //현재 State의 값(로딩했는지 값은 비웠는지?)
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text,
          }
        }
      };
      // console.log(newState);
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  //서버에 저장
  _saveToDos = (newToDos) => {
    //AsyncStorage메서드가 string으로만 저장하기 때문에 객체 => 스트링 변환
    // console.log(JSON.stringify(newToDos));
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos))
  }

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
