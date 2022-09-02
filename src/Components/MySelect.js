import { AntDesign, Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { FormInput, Icone, InputFild } from '../Connexion/styles'

function MySelect({ data, setValue, placeholder, label, setLabel, center }) {

    const [modalVisible, setModalVisible] = useState(false);
    //const [center, setCenter] = useState(true);


    //console.log('selectData',data)
    return (
        <Pressable onPress={() => setModalVisible(true)}>
            <View style={{ width: '98%', position: 'relative', }} >
                <FormInput>
                    <InputFild
                        editable={false}
                        value={label}
                        placeholder={placeholder}
                    />
                    <Icone disabled={true} >
                        <Entypo name={modalVisible ? "chevron-down" : "chevron-up"} size={30} color={'rgba(255,255,255,0.7)'} />
                    </Icone>
                </FormInput>

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
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>
                            <View style={[styles.body,
                            ]}>
                                {data.map((item, index) => {
                                    return (

                                        <TouchableOpacity key={index} style={[styles.contText, {
                                            backgroundColor: label == item.label ? 'green' : '',
                                            display: 'flex',
                                            justifyContent: center ? 'center' : 'space-between',
                                           
                                        }]}
                                            onPress={() => { setLabel(item.label), setValue(item.value), setModalVisible(false) }}
                                        >
                                            {/* { console.log('item: ',item.label)} */}
                                            <AntDesign style={{ marginTop: 3, opacity: label == item.label ? 1 : 0 ,
                                                position: center ? 'absolute' : 'relative',
                                                left: center ? 10 : 10,
                                                }}
                                                 name="check" size={22} color="white" />
                                            <Text style={styles.modalText}>{item.label} </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>
            </View>
        </Pressable>
    )
}

export default MySelect

const styles = StyleSheet.create({
    /////////////// Modal ////////

    modalContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: 'auto',
        backgroundColor: '#444',

    },
    body: {
        marginTop: 22,
        width: '100%',


    },
    contText: {
        //backgroundColor: 'gray',
        marginBottom: 2,

        paddingHorizontal: 10,
        flexDirection: 'row-reverse',
        height: 33,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    modalText: {
        fontSize: 20,
        color: 'white',
    },
});
