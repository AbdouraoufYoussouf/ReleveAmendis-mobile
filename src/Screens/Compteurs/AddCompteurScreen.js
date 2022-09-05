import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, ScrollView,Text, View, StyleSheet, Alert, Button } from 'react-native'
import { createNewCompteur } from '../../../services/Compteur.Service';
import { Form, FormControle, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { ToastSuccess } from '../../Components/Notifications';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function AddCompteurScreen() {
    const [numeroCompteur, setNumCompteur] = useState('');
    const [idGeog, setIdGeo] = useState('');
    const [nomAbonne, setNomAbonne] = useState('');
    const [adresse, setAdress] = useState('');

    const handleCancel = () => {
        setNumCompteur('')
        setIdGeo('')
        setNomAbonne('')
        setAdress('')
    }

    useEffect(() => {

    }, [])

    /// Validation add compteur
    let validationAddCompt = yup.object().shape({
        numeroCompteur: yup.string('Veiller entrer un numero valide!')
            .required('Le numero du compteur est vide!')
            .max(10, ({ max }) => `Le numero du compteur doit containir au maximum ${max} caracteres!`),
        idGeog: yup.string('Veiller entrer un idGeographique valide!')
            .required("L'idGeographiqaue est vide!"),
        nomAbonne: yup.string('Veiller un nomComplet valide!')
            .required("Le nom est vide!"),
        adresse: yup.string('Veiller un adresse valide valide!')
            .required("L'adresse est vide!"),
    })

    return (
        <Root>
            <ScrollView style={{ marginVertical: 10 }}
                keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView keyboardVerticalOffset={-60} behavior='position'>
                    <Formik
                        initialValues={{
                            numeroCompteur: numeroCompteur, idGeog: idGeog, nomAbonne: nomAbonne, adresse: adresse
                        }}
                        validateOnBlur={true}
                        validationSchema={validationAddCompt}
                        onSubmit={(values) => createNewCompteur(values.numeroCompteur, values.idGeog, values.nomAbonne, values.adresse)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, resetForm, errors }) => (

                            <Form>
                                <FormControle>
                                    <FormInput>
                                        <Label minWidth='25%'>N° Compt</Label>
                                        <InputFild keyboardType='text' width='70%'
                                            onChangeText={handleChange('numeroCompteur')}
                                            onBlur={handleBlur('numeroCompteur')}
                                            value={values.numeroCompteur} />
                                    </FormInput>
                                </FormControle>
                                {(errors.numeroCompteur && touched.numeroCompteur &&
                                    <View style={styles.errors}>
                                        <Text style={styles.errorsText}> {errors.numeroCompteur} </Text>
                                    </View>
                                )}
                                <FormControle>
                                    <FormInput>
                                        <Label minWidth='25%'>Id Geo</Label>
                                        <InputFild 
                                             onChangeText={handleChange('idGeog')}
                                             onBlur={handleBlur('idGeog')}
                                             value={values.idGeog}
                                            keyboardType='text' width='70%' />
                                    </FormInput>
                                </FormControle>
                                {(errors.idGeog && touched.idGeog &&
                                    <View style={styles.errors}>
                                        <Text style={styles.errorsText}> {errors.idGeog} </Text>
                                    </View>
                                )}
                                <FormControle>
                                    <FormInput >
                                        <Label minWidth='25%'>Abonné</Label>
                                        <InputFild 
                                         onChangeText={handleChange('nomAbonne')}
                                         onBlur={handleBlur('nomAbonne')}
                                         value={values.nomAbonne}
                                        width='70%' />
                                    </FormInput>
                                </FormControle>
                                {(errors.nomAbonne && touched.nomAbonne &&
                                    <View style={styles.errors}>
                                        <Text style={styles.errorsText}> {errors.nomAbonne} </Text>
                                    </View>
                                )}
                                <FormControle>
                                    <FormInput >
                                        <Label minWidth='25%'>Adress</Label>
                                        <InputFild 
                                             onChangeText={handleChange('adresse')}
                                             onBlur={handleBlur('adresse')}
                                             value={values.adresse}
                                        width='70%' />
                                    </FormInput>
                                </FormControle>
                                {(errors.adresse && touched.adresse &&
                                    <View style={styles.errors}>
                                        <Text style={styles.errorsText}> {errors.adresse} </Text>
                                    </View>
                                )}

                                <FormControle marginV='20px'>
                                  
                                    <FormInput>
                                        <TouchableOpacity 
                                            onPress={resetForm}
                                            style={[styles.btnPreSuv, { backgroundColor: 'orange' }]}>
                                            <MaterialCommunityIcons name="cancel" size={24} color="white" style={[styles.chevron, { marginTop: 4 }]} />
                                            <MyButton width='80px' color='white' >Annuler</MyButton>
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={[styles.btnPreSuv, { backgroundColor: '#467081' }]}>
                                            <MyButton width='75px' color='white' >Envoyé</MyButton>
                                            <Ionicons name="send-outline" color="white" size={25} style={{ top: 3 }} />
                                        </TouchableOpacity>
                                    </FormInput>
                                </FormControle>
                            </Form>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </Root>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
