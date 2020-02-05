import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types"



const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {
    //생성자 (초기값)
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            toDoValue: props.text
        }
        // console.log(props);
    }
    static propTypes = {
        text: PropTypes.string.isRequired,           //받은 데이터 중 text가 문자형식인지를 판단
        isCompleted: PropTypes.bool.isRequired,      //받은 데이터 중 isCompleted가 bool형식인지를 판단
        deleteToDo: PropTypes.func.isRequired,           //받은 데이터 중 deleteToDo가 함수인지를 판단
        id: PropTypes.string.isRequired,             //받은 데이터 중 id가 문자형식인지를 판단
        completeToDo: PropTypes.func.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
    }

    state = {
        isEditing: false,           //수정중인지
        toDoValue: "",
    }
    render() {
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props;        //App.js에서 넘어온 값
        // console.log(this.props);        //받은 데이터 (안드로이드로 따지면 인텐트로 넘겨준 값?)
        return (
            <View style={styles.container}>

                <View style={styles.column}>
                    {/* 클릭 라디오버튼 */}
                    <TouchableOpacity onPress={this._toggleComplete}>
                        {/* 스타일을 2개 먹이기 위해선 배열로 줘야 함 */}
                        <View style={[
                            styles.radio,
                            // 라디오버튼이 클릭되면 styles.completeRadio 스타일을 먹임
                            isCompleted ? styles.completedRadio : styles.uncompletedRadio
                        ]} />
                    </TouchableOpacity>

                    {/* 클릭 텍스트 */}
                    <TouchableOpacity>
                        {/* 편집상태일 때는 텍스트를 다시 쓸 수 있게*/}
                        {isEditing ?
                            //편집상태일 때
                            (<TextInput
                                style={[
                                    styles.input,
                                    styles.text,
                                    isCompleted ? styles.completedText : styles.uncompletedText
                                ]}
                                value={toDoValue}           //편집전 텍스트
                                multiline={true}            //여러줄 가능하게
                                onChangeText={this._controllInput}  //텍스트 입력시 바뀔 수 있도록
                                returnKeyType={"done"}
                                onBlur={this._finishEditing} //blur로 다른 곳 클릭하면 편집 끝날 수 있도록
                            />
                            )
                            :
                            //편집 상태가 아닐 때
                            (<Text
                                style={[
                                    styles.text,
                                    isCompleted ? styles.completedText : styles.uncompletedText
                                ]}
                            >
                                {text}
                            </Text>
                            )
                        }
                    </TouchableOpacity>

                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        {/* 편집완료 버튼 */}
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={styles.actions}>
                            {/* 편집하기 버튼 */}
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            {/* 삭제 버튼*/}{/* function안에 deleteToDo함수를 넣어야 함 */}
                            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        );
    }

    //라디오버튼에 대한 토글값
    _toggleComplete = () => {
        // console.log(this.props);
        const { isCompleted, completeToDo, uncompleteToDo, id } = this.props;
        if (isCompleted) {
            console.log("언컴플 함수실행");
            uncompleteToDo(id);
        }
        else {
            console.log("컴플 함수실행");
            completeToDo(id);
        }
    };
    //편집 시작
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            // toDoValue: text
        });
    };
    //편집 끝
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    //텍스트 입력할 수 있도록
    _controllInput = (text) => {
        this.setState({
            toDoValue: text
        })
    }
}


const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    radio: {        //라디오 버튼
        width: 26,
        height: 26,         // 원을 그릴거라 가로세로가 같아야 함
        borderRadius: 13,   // 원을 그릴거라 가로세로의 반이여야 함
        // backgroundColor: "white",
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20,
        // flexDirection: "row",
    },
    completedRadio: {           //할일 완료시의 버튼(클릭했을 경우)
        borderColor: "#bbb",
    },
    uncompletedRadio: {         //할일 미완료시의 버튼(클릭하지 않았을 경우)
        borderColor: "#F23657",

    },
    completedText: {            //할일 완료시의 텍스트
        color: "#bbb",
        textDecorationLine: "line-through",
    },
    uncompletedText: {
        color: "black"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        width: width / 2,
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    actionText: {

    },
    input: {
        marginVertical: 20,
        width: width / 2,
        paddingBottom: 5,

    }
});