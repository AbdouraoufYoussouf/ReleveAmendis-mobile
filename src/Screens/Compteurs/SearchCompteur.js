import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loding, notLoding, setIdCompteur } from '../../../services/redux/compteurSlice'
import { Form, FormControle, InputFild, FormInput, MyButton } from '../styles/homeStyle'

export const SearchCompteur = ({ navigation }) => {

    const compteurs = useSelector((state) => state.compteurs.compteurs);
    const [termSearch, setTermSearch] = useState('');
    const dispatch = useDispatch();

    const [trouve, setTrouve] = useState(false);
    const [nonTrouve, setNonTrouve] = useState(true);
    const [error, setError] = useState('');
    const [compteur, setCompteur] = useState([]);


    const search = (searchItem) => {
        return compteurs.find(c => c.numeroCompteur === searchItem) || compteurs.find(c => c.idGeographique === searchItem) || compteurs.find(c => c.nomAbonne === searchItem) || compteurs.find(c => c.police === searchItem);
    }

    const handleSearch = () => {
        let temp = search(termSearch)

        if (termSearch == '') {
            setError('vide')
            setNonTrouve(false)
        }
        if (temp != null) {
            
            setCompteur(temp);
            setTrouve(true);
            setNonTrouve(false);
            
        }
        if (termSearch != null && temp==null) {
            setError('Le terme entré est introuvable!! ')
            setNonTrouve(true);
            setTrouve(false)
        }
    }

    const gotoHome=()=>{
        dispatch(loding());
        dispatch(setIdCompteur(compteur.compteurId))
        navigation.navigate('home')
       
    }
    const handlCancel=()=>{
        setTermSearch('');
        setError('');
        setNonTrouve(false);
    }

    useEffect(() => {
        handleSearch()
    }, [termSearch])

    return (
        <ScrollView style={{ marginTop: 10 }}
            keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardVerticalOffset={-85} behavior='position'>

                <Form>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }} >Rechercher le compteur par l'un des champs suivants</Text>
                    <FormControle>
                        <FormInput>
                            <InputFild value={termSearch}
                                onChangeText={(termSearch) => setTermSearch(termSearch)}
                                width='100%' placeholder='Soit numero/idGeo/police/abonne'
                                placeholderTextColor='gray' />
                        </FormInput>
                    </FormControle>
                    {
                        nonTrouve ?
                            (
                                <View>
                                    <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}> {error} </Text>
                                </View>
                            ) :
                            (<></>)
                    }
                    <FormControle>
                        <FormInput>
                            <TouchableOpacity
                                onPress={() => handlCancel()}
                                style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                <MyButton width='100px' color='white' >Annuler</MyButton>
                                <MaterialCommunityIcons name="cancel" color="white" size={28} style={{ top: 2 }} />
                            </TouchableOpacity>
                        </FormInput>

                        <FormInput>
                            <TouchableOpacity onPress={() => handleSearch()}
                                style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                                <MyButton width='100px' color='white' >Chercher</MyButton>
                                <Ionicons name="search" color="white" size={28} style={{ top: 2 }} />
                            </TouchableOpacity>
                        </FormInput>
                    </FormControle>

                    {
                        trouve ?
                            (
                                <TouchableOpacity onPress={()=>gotoHome()}
                                     style={styles.content}>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLeft}>Numero:</Text>
                                        <Text style={styles.itemRigth}> {compteur.numeroCompteur} </Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLeft}>ID Geo:</Text>
                                        <Text style={styles.itemRigth}> {compteur.idGeographique} </Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLeft}>Police:</Text>
                                        <Text style={styles.itemRigth}>{compteur.police}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLeft}>Abonné:</Text>
                                        <Text style={styles.itemRigth}>{compteur.nomAbonne}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLeft}>Adress:</Text>
                                        <Text style={styles.itemRigth}>{compteur.adresse}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                            :
                            (<></>)
                    }

                </Form>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
    },

    content: {
        margin: 10, width: '100%',
        color: 'white', alignItems: 'center'
    },
    item: {
        margin: 5, height: 'auto', width: '100%',
        color: 'white', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemLeft: {
        marginHorizontal: 3, fontSize: 19, width: '23%', textAlign: 'left', paddingLeft: 5
    },
    itemRigth: {
        paddingHorizontal: 5,
        fontSize: 19, width: '74%', textAlign: 'left',
        fontStyle: 'italic',
        marginRight: 10,
        backgroundColor: '#465881',
        color: 'white',
    }
})  