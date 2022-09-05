import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, Modal, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import { Icone, Icone1, FormInput, } from '../Connexion/styles'
import { FormControle, InputFild } from '../Screens/styles/homeStyle';

function MySelect({ data, setValue, placeholder, label, setLabel, center, onChange, onBlur, onChangeSearch, termSearch, setTermSearch, isSearch }) {

    const [modalVisible, setModalVisible] = useState(false);
    //const [center, setCenter] = useState(true);
    const { height, width } = useWindowDimensions();

    //console.log('selectData',data)
    return (
        <Pressable onPress={() => setModalVisible(true)}>
            <View style={{ width: '98%', position: 'relative' }} >
                <FormInput>
                    <InputFild
                        onChangeText={onChange}
                        editable={false}
                        value={label}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        placeholderTextColor='gray'
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
                        style={[styles.modalContainer, isSearch ? { position: 'absolute', top: 0 } : (null)]}>

                        <Pressable onPress={() => setModalVisible(true)}
                            style={styles.modalContent}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>
                            <View style={[styles.body, isSearch ? { flex: 1, height: height, marginTop: 5,  paddingBottom:50,} : (null)]}>
                                {
                                    isSearch ? (
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', position: 'relative' }}>
                                            <FormControle width='88%' marginV='1px' >
                                                <FormInput >
                                                    {
                                                        termSearch != '' ? (
                                                            <Icone1 width='50px' onPress={() => setTermSearch('')} >
                                                                <Ionicons name='md-close-circle-outline' size={30} color={'rgba(255,255,255,0.7)'} />
                                                            </Icone1>
                                                        ) : (
                                                            <Icone1 width='50px' >
                                                                <MaterialCommunityIcons name="gesture-two-double-tap" size={30} style={{ transform: [{ rotate: '90deg' }] }} color="rgba(255,255,255,0.7)" />
                                                            </Icone1>
                                                        )
                                                    }

                                                    <InputFild width='100%' paddingH='37px'
                                                        //returnKeyType='search'
                                                        value={termSearch}
                                                        onChangeText={(term) => onChangeSearch(term)}
                                                        placeholder='Recherche Anomalie'
                                                        placeholderTextColor='gray'
                                                    />
                                                    <Icone width='50px'>
                                                        <Ionicons name='search' size={30} color={'rgba(255,255,255,0.7)'} />
                                                    </Icone>
                                                </FormInput>

                                            </FormControle>
                                            <Entypo onPress={() => setModalVisible(false)} style={{ right: -5, position: 'absolute', top: -1.5 }} name="cross" size={50} color="white" />

                                        </View>
                                    ) : (null)
                                }

                                <ScrollView bounces={false}>
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
                                                <AntDesign style={{
                                                    marginTop: 3, opacity: label == item.label ? 1 : 0,
                                                    position: center ? 'absolute' : 'relative',
                                                    left: center ? 10 : 10,
                                                }}
                                                    name="check" size={22} color="white" />
                                                <Text style={styles.modalText}>{item.label} </Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </ScrollView>
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
       
        marginTop: 18,
        width: '100%',
        paddingHorizontal: 3

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
