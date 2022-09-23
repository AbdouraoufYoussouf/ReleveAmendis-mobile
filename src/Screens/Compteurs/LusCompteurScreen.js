import React, { useState } from 'react'
import { View, SectionList, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { refrechAncienCompteur, refrecheCompteurs } from '../../../services/Compteur.Service';
import { loding, notLoding, setAncienCompteurs, setCompteurs, setIdCompteur, setRouteCompteur } from '../../../services/redux/compteurSlice';

export default function LusCompteurScreen({ navigation }) {

    const dispatch = useDispatch();
    const allcompteurs = useSelector((state) => state.compteurs.ancienCompteurs);
    const compteurs = allcompteurs.filter((nlu) => (nlu.etatLecture !== 'NL'))

    //console.log('nonlus', compteurs)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(setAncienCompteurs([]));
        refrechAncienCompteur(dispatch)
        wait(1000).then(() => setRefreshing(false));
    }, []);


    const FlatList_Header = () => {
        return (
            <View style={{
                height: 30,
                width: "100%",
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#17DBE4',
                alignItems: 'center',
                paddingTop:3
            }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', width: 40, color: 'black', height: 30, }}> ID </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', width: 120, color: 'black', height: 30, borderLeftWidth: 1, }}> Numero </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', width: 120, color: 'black', borderLeftWidth: 1, height: 30, }}> IdGeo </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', width: 100, color: 'black', borderLeftWidth: 1, height: 30, }}> Police </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', width: 185, color: 'black', borderLeftWidth: 1, height: 30, }}> Abonné </Text>

            </View>
        );
    }

    const ItemRender = ({ etatLecture, consommation, consMoyenne, nouveauIndex, codeEtat, ancienIndex, numero, idGeo, police, abonne, adress, index }) => (
        <TouchableOpacity key={index}
            onPress={() => {
                navigation.navigate('details', {
                    numero: numero,
                    idGeo: idGeo,
                    police: police,
                    abonne: abonne,
                    adresse: adress,
                    codeEtat: codeEtat,
                    lecture: etatLecture,
                    ancienIndex: ancienIndex,
                    newIndex: nouveauIndex,
                    consMoyenne: consMoyenne,
                    consommation: consommation
                });
            }}

            style={[styles.item, index % 2 && { backgroundColor: '#D0C9C0' }]}>
            <Text style={{ fontSize: 18, width: 40, color: 'black', textAlign: 'center' }}>{index + 1}</Text>
            <Text style={{ marginLeft: 5, fontSize: 18, marginLeft: 0, width: 120, color: 'black', textAlign: 'center' }}>{numero}</Text>
            <Text style={{ marginLeft: 5, fontSize: 18, width: 120, color: 'black', textAlign: 'center' }}>{idGeo}</Text>
            <Text style={{ marginLeft: 2, fontSize: 18, width: 100, color: 'black', textAlign: 'center' }}>{police}</Text>
            <Text style={{ fontSize: 18, width: 250, marginHorizontal: 3, color: 'black' }}>{abonne}</Text>
        </TouchableOpacity>
    );
    const ItemDivider = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }


    return (

        <View style={styles.container} >
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <ScrollView horizontal={true} bounces={false}>
                    <FlatList
                        data={compteurs}
                        renderItem={({ item, index }) => <ItemRender
                            compteurId={item.compteurId}
                            idCompteur={item.compteurId}
                            index={index}
                            numero={item.numeroCompteur}
                            idGeo={item.idGeographique}
                            codeEtat={item.codeEtat}
                            ancienIndex={item.ancienIndex}
                            nouveauIndex={item.nouveauIndex}
                            consMoyenne={item.consMoyenne}
                            etatLecture={item.etatLecture}
                            numeroRue={item.numeroRue}
                            consommation={item.consommation}
                            police={item.police}
                            abonne={item.nomAbonne}
                            adress={item.adresse} />}
                        keyExtractor={item => item.compteurId}
                        ItemSeparatorComponent={ItemDivider}
                        ListHeaderComponent={FlatList_Header}
                        ListHeaderComponentStyle={{ borderBottomWidth: 2 }}
                    />
                </ScrollView>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
    }
})