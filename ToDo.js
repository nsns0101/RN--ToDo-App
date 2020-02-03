import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {
    state = {
        isEditing: false,           //수정중인지?
        isCompleted: false,         //수정끝인지?
    }
    render() {
        const { isCompleted, isEditing } = this.state;
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
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                            Hello I'm a To Do
                        </Text>
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
                            {/* 삭제 버튼*/}
                            <TouchableOpacity>
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

    _toggleComplete = () => {
        //_toggleComplete함수가 불리면 state의 isCompleted를 바꿈
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };

    _startEditing = () => {
        this.setState({
            isEditing: true
        })
    }

    _finishEditing = () => {
        this.setState({
            isEditing: false
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
        justifyContent: "space-between",
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

    }
});