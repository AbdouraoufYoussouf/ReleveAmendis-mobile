import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Text, View, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native'

export default function MyDialog({ content, modalVisible, setModalVisible, type }) {

    return (
        <View style={{ position: 'relative' }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable
                    onPress={() => { setModalVisible(false); }}
                    style={styles.modalContainer}>

                    <Pressable onPress={() => setModalVisible(true)}
                        style={styles.modalContent}>
                        {/* Succés */}
                        {
                            type == 'success' ? (
                                // <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderRadius: 5 }}>
                                //     {/* <Text style={[styles.titre, { color: 'green' }]}>Succés</Text> */}
                                //     <AntDesign name="checkcircle" size={30} color="green" />
                                // </View>
                                <View style={{ width: 70, height: 5, marginTop: 10, backgroundColor: 'green', alignSelf: 'center', borderRadius: 5 }}></View>
                            ) : type == 'warning' ? (
                                //    Avertissement 
                                // <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderRadius: 5 }}>
                                //     <Text style={[styles.titre, { color: 'yellow' }]}>Avertissement</Text>
                                //     <Ionicons name="warning" size={30} color="yellow" />
                                // </View>
                                <View style={{ width: 70, height: 5, marginTop: 10, backgroundColor: 'yellow', alignSelf: 'center', borderRadius: 5 }}></View>
                            ) : type == 'danger' ? (
                                // <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderRadius: 5 }}>
                                //     {/* <Text style={[styles.titre, { color: 'tomato' }]}>Echec</Text> */}
                                //     <MaterialIcons name="dangerous" size={30} color="tomato" />
                                // </View>
                                <View style={{ width: 70, height: 5, marginTop: 10, backgroundColor: 'tomato', alignSelf: 'center', borderRadius: 5 }}></View>
                            ) : (<></>)
                        }




                        <View style={styles.body}>
                            <Text style={styles.textContent}> {content} </Text>

                            <TouchableOpacity style={[styles.fermer,]}
                                onPress={() => setModalVisible(false)} >
                                <Text style={styles.fermerText}>fermer</Text>
                            </TouchableOpacity>

                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    /////////////// Modal ////////

    modalContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        borderRadius: 15,
        height: 'auto',
        backgroundColor: '#36382F',
        width: '85%',
        height: 'auto',
    },
    body: {
        marginTop: 5,
        alignItems: 'center',
    },

    titre: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 5,
    },
    textContent: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 2,
        textAlign: 'left',
    },
    fermer: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginVertical: 10,
        backgroundColor: '#2E64FE',
        borderRadius: 5,
    },
    fermerText: {
        fontSize: 20,
        color: 'white',
        paddingVertical: 3,
        paddingHorizontal: 15,
        textTransform: 'capitalize',
    },
});
