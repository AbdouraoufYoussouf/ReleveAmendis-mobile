import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react'
import { Text, View, StyleSheet, Modal, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'

export default function MyDialogAndConfirm({ content, dialogVisible, setDialogVisible, type, indicator,onPressSave }) {
    //console.log('Dialogindicator',indicator)
   
    return (
        <View style={{ position: 'relative' }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={dialogVisible}
                onRequestClose={() => {
                    setDialogVisible(!dialogVisible);
                }}
            >
                <Pressable
                    // onPress={() => { setDialogVisible(false); }}
                    style={styles.modalContainer}>

                    <Pressable onPress={() => setDialogVisible(true)}
                        style={styles.modalContent}>
                        {/* Succés */}
                        {
                            type == 'success' ? (
                                <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderRadius: 5 }}>
                                    <Text style={[styles.titre, { color: 'green' }]}>Succés</Text>
                                    <AntDesign name="checkcircle" size={30} color="green" />
                                </View>
                            ) : type == 'warning' ? (
                                //    Avertissement 
                                <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderRadius: 5 }}>
                                    <Text style={[styles.titre, { color: 'yellow' }]}>Avertissement</Text>
                                    <Ionicons name="warning" size={30} color="yellow" />
                                </View>
                            ) : type == 'danger' ? (
                                <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderRadius: 5 }}>
                                    <Text style={[styles.titre, { color: 'tomato' }]}>Echec</Text>
                                    <MaterialIcons name="dangerous" size={30} color="tomato" />
                                </View>
                            ) : (<></>)
                        }

                        <View style={{ width: 70, height: 5, backgroundColor: 'white', alignSelf: 'center', borderRadius: 5 }}></View>

                        <View style={styles.body}>
                            <Text style={styles.textContent}> {content} </Text>
                            <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>

                                <TouchableOpacity style={[styles.fermer, { backgroundColor: '#2E64FE', width: 127, }]}
                                    onPress={() => onPressSave()} >
                                    {
                                        indicator ? (
                                            <ActivityIndicator size="large" color="#fff" style={{}} />
                                        ) : (
                                            <Text style={styles.fermerText}>Enregistrer</Text>
                                        )
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.fermer, { backgroundColor: 'tomato', width: 100, }]}
                                    onPress={() => setDialogVisible(false)} >
                                    <Text style={styles.fermerText}>férmer</Text>
                                </TouchableOpacity>
                            </View>


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
        backgroundColor: '#444',
        width: '90%',
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
        marginVertical: 10,
        width: 130,
        borderRadius: 5,
    },
    fermerText: {
        fontSize: 20,
        color: 'white',
        paddingVertical: 3,
        paddingHorizontal: 15,
        textTransform: 'capitalize',
        width: 150
    },
});
