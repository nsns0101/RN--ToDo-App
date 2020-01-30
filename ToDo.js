import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {
    state = {
        isEditing: false,           //수정중인지?
        isCompleted: false,         //수정끝인지?
    }
    render() {
        const { isCompleted } = this.state;
        return (

            <View style={styles.container}>
                {/* 클릭할 수 있는 태그   (onPress는 클릭하였을 경우) */}
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[
                        styles.radio,
                        // 라디오버튼이 클릭되면 styles.completeRadio 스타일을 먹임
                        isCompleted ? styles.completedRadio : styles.uncompletedRadio
                    ]} />
                </TouchableOpacity>
                <Text style={styles.text}>Hello I'm a To Do</Text>
            </View>
        );
    }

    _toggleComplete = () => {
        //_toggleComplete함수가 불리면 state의 isCompleted를 바꿈
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
}
const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    radio: {
        width: 26,
        height: 26,         // 원을 그릴거라 가로세로가 같아야 함
        borderRadius: 13,   // 원을 그릴거라 가로세로의 반이여야 함
        // backgroundColor: "white",
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20,
    },
    completedRadio: {
        borderColor: "#bbb"
    },
    uncompletedRadio: {
        borderColor: "#F23657"
    },
});