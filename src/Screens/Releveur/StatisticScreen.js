import React, { useEffect, useState } from 'react'
import { View, SectionList, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

export default function StatisticScreen({ navigation }) {

    const datasComplete = useSelector((state) => state.compteurs.ancienCompteurs);
    const dataCompleteNonlu = useSelector((state) => state.compteurs.compteurs);
    const lu = useSelector((state) => state.compteurs.lu);
    const datasPartiel = datasComplete.filter((comt) => comt.etatLecture === 'L');
    const tournesData = useSelector((state) => state.tournes.tournes);
const [data,setData] = useState([])
    var statistics = tournesData.map((tour) => {
        const compteurByTourne = datasComplete.filter((cmt) => cmt.numeroTourne == tour.numeroTourne)
        const comptNonLus = compteurByTourne.filter((nlu) => nlu.etatLecture == 'NL')
        const comptLus = compteurByTourne.filter((nlu) => (nlu.etatLecture == 'L'))
        let pourcentage = comptLus?.length * 100 / datasComplete?.length
        return {
            'numeroTourne': tour.numeroTourne,
            'lus': comptLus?.length,
            'nonLus': comptNonLus?.length,
            'total': compteurByTourne?.length,
            'pourcentage': pourcentage.toFixed(2)

        }
    })
    console.log('stat', statistics)

    const Data = [
        {
            id: 1,
            numeroTourne: 21, lus: 7, nonLus: 2, codeFluide: 45,
        },
        {
            id: 2,
            numeroTourne: 21, lus: 7, nonLus: 3, codeFluide: 45,
        },
        {
            id: 3,
            numeroTourne: 21, lus: 7, nonLus: 5, codeFluide: 45,
        },
        {
            id: 4,
            numeroTourne: 21, lus: 7, nonLus: 6, codeFluide: 45,
        },
        {
            id: 5,
            numeroTourne: 21, lus: 7, nonLus: 4, codeFluide: 45,
        },
        {
            id: 6,
            numeroTourne: 21, lus: 7, nonLus: 2, codeFluide: 45,
        },

        {
            id: 7,
            numeroTourne: 21, lus: 7, nonLus: 2, codeFluide: 56,
        },

        {
            id: 8,
            numeroTourne: 21, lus: 7, nonLus: 4, codeFluide: 56,
        },

    ];

    const FlatList_Header = () => {
        return (
            <View style={{
                height: 30,
                width: "100%",
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#17DBE4',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 90, color: 'black', height: 30 }}> N° Tourne</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 70, color: 'black', borderLeftWidth: 1, height: 30, paddingHorizontal: 3 }}> Lus </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 80, color: 'black', borderLeftWidth: 1, height: 30, paddingHorizontal: 3 }}> Non lus </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 70, color: 'black', borderLeftWidth: 1, height: 30, paddingHorizontal: 3 }}>Total</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 120, color: 'black', borderLeftWidth: 1, height: 30, paddingHorizontal: 3 }}>Pourcentage</Text>
            </View>
        );
    }

    const ItemRender = ({ numeroTourne, lus, nonLus, total, pourcentage, index }) => (
        <View key={index} style={[styles.item, index % 2 && { backgroundColor: '#D0C9C0' }]}>
            <Text style={{ fontSize: 17, width: 90, color: 'black', textAlign: 'center' }}>{numeroTourne}</Text>
            <Text style={{ fontSize: 17, width: 70, color: 'black', textAlign: 'center' }}>{lus}</Text>
            <Text style={{ fontSize: 17, width: 80, color: 'black', textAlign: 'center' }}>{nonLus}</Text>
            <Text style={{ fontSize: 17, width: 70, color: 'black', textAlign: 'center' }}>{total}</Text>
            <Text style={{ fontSize: 17, width: 120, color: 'black', textAlign: 'center' }}>{pourcentage} %</Text>
        </View>
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
    useEffect(() => {
        setData(statistics)
        console.log(lu)
    }, [lu])

    return (

        <View style={styles.container} >
            <ScrollView horizontal={true} bounces={false}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <ItemRender key={index} index={index} numeroTourne={item.numeroTourne} lus={item.lus} nonLus={item.nonLus} total={item.total} pourcentage={item.pourcentage} />}
                    keyExtractor={item => item.numeroTourne}
                    ItemSeparatorComponent={ItemDivider}
                    ListHeaderComponent={FlatList_Header}
                    ListHeaderComponentStyle={{ borderBottomWidth: 2 }}
                />

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,

    }
})