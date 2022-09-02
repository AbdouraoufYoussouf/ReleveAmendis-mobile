import { AntDesign, FontAwesome5, Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, BackHandler } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { AddDataToStore } from "../../services/AddDataTotore";
import { logout } from "../../services/redux/userSlice";


export default function ModalUserOption() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector((state) => state.user.value);
    //const [role, setRole] = useState("Admin")
    const [role, setRole] = useState(user.role)

    function toggleModal() {
        if (!modalVisible) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    };
  
    const goto = (route) => {
        navigation.navigate(route);
        setModalVisible(false);
    }
    const exit = () => {
        BackHandler.exitApp()
    }

    const logoutHandler = () => {
        dispatch(logout());
        goto('login');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesome5 name="user-cog" size={28} color="white"
                    style={{ marginRight: 6 }}
                />
            </TouchableOpacity>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.madalContainer}>

                    <Pressable onPress={() => setModalVisible(true)}
                        style={styles.modalContent}>

                        <TouchableOpacity style={styles.contText}
                            onPress={() => logoutHandler()}>
                            <AntDesign style={{ margin: 3 }} name="logout" size={22} color="white" />
                            <Text style={{ fontSize: 20, color: 'tomato' }}>Deconnexion</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contText}
                            onPress={exit}>
                            <Ionicons style={{ margin: 3 }} name="exit-outline" size={24} color="white" />
                            <Text style={{ fontSize: 20, color: 'red' }}>Quitter</Text>
                        </TouchableOpacity>
                   
                    </Pressable>

                </Pressable>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({

    madalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        width: '43%',
        position: 'absolute',
        top: 39,
        backgroundColor: '#36382F',
        paddingLeft:5,
        paddingVertical:5,
        borderBottomLeftRadius: 20,
    },
    contText: {
        marginVertical: 2,
        display: "flex",
        flexDirection: 'row',
        height: 30
    },

});
