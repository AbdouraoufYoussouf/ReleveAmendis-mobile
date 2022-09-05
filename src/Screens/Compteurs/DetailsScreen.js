import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native'
import db from '../../../services/SqliteDb';
import compteur from '../../Images/compteur.png'

export default function DetailsScreen({ route }) {
    const { numero, idGeo, police, abonne, adresse, codeEtat, lecture, ancienIndex, newIndex, consMoyenne, consommation } = route.params;

    useEffect(() => {


    }, [])

    return (
        <ScrollView style={styles.container}
            keyboardShouldPersistTaps='never'
            keyboardDismissMode='on-drag'
            showsVerticalScrollIndicator={false}>

            <View >
                <View style={styles.header}>
                    <Image style={{ width: 150, height: 150, marginVertical: 5 }} source={compteur} />
                    <View style={styles.numero}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2B8EF0' }}> {numero} </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeft}>ID Geo:</Text>
                        <Text style={styles.itemRigth}> {idGeo} </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLeft}>Police:</Text>
                        <Text style={styles.itemRigth}>{police}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLeft}>Abonné:</Text>
                        <Text style={styles.itemRigth}>{abonne}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLeft}>Adress:</Text>
                        <Text style={styles.itemRigth}>{adresse}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLeft}>Etats:</Text>
                        <Text style={styles.itemRigth}>{codeEtat}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLeft}>Lecture:</Text>
                        <Text style={styles.itemRigth}>{lecture}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={[styles.itemLeft, { width: '35%' }]}>AncienIndex:</Text>
                        <Text style={styles.itemRigth}>{ancienIndex}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={[styles.itemLeft, { width: '49%' }]}>NouveauIndex:</Text>
                        <Text style={styles.itemRigth}>{newIndex}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={[styles.itemLeft, { width: '55%' }]}>Consomation Moyenne:</Text>
                        <Text style={styles.itemRigth}>{consMoyenne}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={[styles.itemLeft, { width: '35%' }]}>Consomation:</Text>
                        <Text style={styles.itemRigth}>{consommation}</Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 200, width: '100%', backgroundColor: '#17DBE4',
        color: 'white', alignItems: 'center'
    },

    numero: {
        backgroundColor: 'white',
        padding: 5, position: 'absolute', bottom: 0,
        width: '70%', alignItems: 'center', borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    content: {
        margin: 5, height: '100%', width: '100%',
        color: 'white', alignItems: 'center'
    },
    item: {
        margin: 5, height: 'auto', width: '100%',
        color: 'white', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemLeft: {
        marginLeft: 5, fontSize: 19, width: '25%', textAlign: 'left', fontWeight: 'bold'
    },
    itemRigth: {
        fontSize: 19, width: '74%', textAlign: 'left',
        fontStyle: 'italic',
        paddingRight: 10,
        paddingLeft: 5
    }
})  