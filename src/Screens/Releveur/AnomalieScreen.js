import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

export default function Anomalie() {
    const user = useSelector((state) => state.user.value);
    //const [role, setRole] = useState("Admin")
    const [role, setRole] = useState(user.role)

    const anomaliesData = useSelector((state) => state.anomalies.anomalies);
    const [anomalies, setAnomalies] = useState([])

    useEffect(() => {
        setAnomalies(anomaliesData.anomalies)
    }, [])

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

                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 80, color: 'black', height: 30, }}> CodeA </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 80, color: 'black', borderLeftWidth: 1, height: 30, }}> Libele </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 140, color: 'black', borderLeftWidth: 1, height: 30, }}> Désignation </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 120, color: 'black', borderLeftWidth: 1, height: 30, }}> Code Fluide </Text>
                {
                    user.role != 'Releveur' ? (
                        <Text style={{ fontSize: 18, fontWeight: 'bold', width: 100, color: 'black', borderLeftWidth: 1, height: 30, }}> Options </Text>
                    ) : (<></>)
                }
            </View>
        );
    }

    const ItemRender = ({ codeA, libele, designation, codeFluide, index }) => (
        <View key={codeA} style={[styles.item, index % 2 && { backgroundColor: '#D0C9C0' }]}>
            <Text style={{ fontSize: 16, width: 80, color: 'black', textAlign: 'center' }}>{codeA}</Text>
            <Text style={{ fontSize: 16, width: 80, color: 'black', paddingHorizontal: 3, textAlign: 'center' }}>{libele}</Text>
            <Text style={{ fontSize: 16, width: 140, color: 'black', paddingHorizontal: 2 }}>{designation}</Text>
            <Text style={{ fontSize: 16, width: 100, color: 'black', marginLeft: 10, textAlign: 'center' }}>{codeFluide}</Text>
            {
                user.role != 'Releveur' ? (
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center' }}>

                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <MaterialCommunityIcons name="account-edit-outline" size={30} color="#0A66C2" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginLeft: 15 }}>
                        <MaterialCommunityIcons name="delete-outline" size={25} color="red" />
                    </TouchableOpacity>
                </View>
                ) : (<></>)
            }
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


    return (

        <View style={styles.container} >
            <ScrollView horizontal={true} bounces={false}>
                <FlatList
                    data={anomalies}
                    renderItem={({ item, index }) => <ItemRender index={index} codeA={item.codeAnomalie} libele={item.libele} designation={item.designation} codeFluide={item.codeFluide} adress={item.adress} />}
                    keyExtractor={item => item.codeAnomalie}
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 3,
        paddingVertical: 2,
        backgroundColor: '#fff'
    }
})