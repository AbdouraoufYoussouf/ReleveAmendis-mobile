import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Form, FormControle, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';

import { Text, Modal, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MySelect from '../../Components/MySelect';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addAnomalie } from '../../../services/Anomalie.Service';
import axios from 'axios';
import { addAnomalieStore } from '../../../services/redux/anomalieSlice';

export const AddAnomalie = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const fluideData = useSelector((state) => state.anomalies.fluides);
    const anomalies = useSelector((state) => state.anomalies.anomalies);
   console.log("anomalies",anomalies.anomalies)
    const [modalvisible, setModalVisible] = useState(false);
    const [designation, setDesignation] = useState('');
    const [libele, setLibele] = useState('');

    const fluides = fluideData?.map((a) => {
        return { label: a.codeFluide, value: a.codeFluide }
    });

    const [codeFluide, setCodeFluide] = useState('');
    const [label, setLabel] = useState('');


    const handleSaveAnomalie =()=>{
        //console.log('fluide ',codeFluide)
        let anomalieStore = {
            "codeAnomalie":'',
            "designation": designation,
            "libele": libele,
            "codeFluide": codeFluide
          }
        addAnomalie(designation,libele,codeFluide,dispatch)
        dispatch(addAnomalieStore(anomalieStore))
    }

 
    return (
        <View >
            <TouchableOpacity onPress={() => setModalVisible(true)} >
                <AntDesign name="pluscircleo" color='white' size={27} style={{ marginRight: 6 }} />
            </TouchableOpacity>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalvisible}
                onRequestClose={() => setModalVisible(!modalvisible)}
            >

                <Pressable onPress={() => setModalVisible(false)} style={styles.madalContainer}>
                    <Pressable onPress={() => setModalVisible(true)} style={styles.modalContent}>
                        <View style={{ width: '100%', height: 35, borderBottomWidth: 2, borderBottomColor: '#fff', alignItems: 'center', }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 2, color: '#fff' }}>Ajout d'un Anomalie</Text>
                            <Entypo onPress={() => setModalVisible(false)} style={{ right: 10, position: 'absolute', top: -3 }} name="cross" size={40} color="white" />
                        </View>
                        <View>
                           <Form marginTop='20px'>
                                        <FormControle>
                                            <FormInput >
                                                <Label color='#fff' minWidth='39%'>Designation</Label>
                                                <InputFild width='58%'
                                                    onChangeText={text => setDesignation(text)}
                                                    value={designation}
                                                />
                                            </FormInput>
                                        </FormControle>
                                      
                                        <FormControle>
                                            <FormInput >
                                                <Label color='#fff' minWidth='39%'>Libele</Label>
                                                <InputFild width='58%'
                                                    value={libele}
                                                    onChangeText={text => setLibele(text)}
                                                />
                                            </FormInput>
                                        </FormControle>
                                    
                                        <FormControle>
                                            <Label color='#fff' minWidth='39%'>Code Fluide</Label>
                                            <FormInput width='61%' >
                                                <MySelect
                                                    data={fluides}
                                                    setValue={setCodeFluide}
                                                    setLabel={setLabel}
                                                    label={label}
                                                    center={true}
                                                />
                                            </FormInput>
                                        </FormControle>
                                      
                                        <FormControle marginV='30px'>
                                            <FormInput>
                                                <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}
                                                onPress={()=>setModalVisible(false)}
                                                >
                                                    <MyButton width='80px' color='white' >Fermer</MyButton>
                                                    <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                                </TouchableOpacity>
                                            </FormInput>

                                            <FormInput>
                                                <TouchableOpacity onPress={() => (designation.length>1 && libele.length>1 && codeFluide.length>1)? handleSaveAnomalie(): (
                                                     ToastAndroid.showWithGravityAndOffset(
                                                        "Veillez verifier les champs! ",
                                                        ToastAndroid.LONG,
                                                        ToastAndroid.BOTTOM,
                                                        25,
                                                        200
                                                      )
                                                )}
                                                    style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                                                    <MyButton width='90px' color='white' >Envoyé</MyButton>
                                                    <Ionicons name="send-outline" color="white" size={25} style={{ top: 3 }} />
                                                </TouchableOpacity>
                                            </FormInput>
                                        </FormControle>
                                    </Form>

                        </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
        bottom: 0,
        backgroundColor: 'gray',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    errors: {
        width: '85%',
        height: 'auto',
    },
    errorsText: {
        alignSelf: 'flex-start',
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5,
        fontStyle: 'italic'
    },
})
