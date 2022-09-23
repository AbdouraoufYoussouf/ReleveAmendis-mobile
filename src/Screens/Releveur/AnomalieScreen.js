import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function Anomalie() {
    const user = useSelector((state) => state.user.value);
    //const [role, setRole] = useState("Admin")
    const [role, setRole] = useState(user.role)
const dispatch = useDispatch()
    const anomaliesData = useSelector((state) => state.anomalies.anomalies);
    const [anomalies, setAnomalies] = useState([])

    useEffect(() => {
        setAnomalies(anomaliesData)
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
                paddingTop:3
            }}>

                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 50, color: 'black', height: 30, }}> ID </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 130, color: 'black', borderLeftWidth: 1, height: 30,textAlign:'center' }}> Libele </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 180, color: 'black', borderLeftWidth: 1, height: 30, textAlign:'center'}}> Désignation </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 110, color: 'black', borderLeftWidth: 1, height: 30, }}> Code Fluide </Text>
              
            </View>
        );
    }

    const ItemRender = ({ anomalieId, libele, designation, codeFluide, index }) => (
        <View key={index} style={[styles.item, index % 2 && { backgroundColor: '#D0C9C0' }]}>
            <Text style={{ fontSize: 16, width: 50, color: 'black', textAlign: 'center' }}>{index+1}</Text>
            <Text style={{ fontSize: 16, width: 130, color: 'black', paddingHorizontal: 3, textAlign: 'center' }}>{libele}</Text>
            <Text style={{ fontSize: 16, width: 180, color: 'black', paddingHorizontal: 2 }}>{designation}</Text>
            <Text style={{ fontSize: 16, width: 110, color: 'black', marginLeft: 10, textAlign: 'center' }}>{codeFluide}</Text>
           
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
                    renderItem={({ item, index }) => <ItemRender key={index} index={index} anomalieId={item.anomalieId} libele={item.libele} designation={item.designation} codeFluide={item.codeFluide} adress={item.adress} />}
                    keyExtractor={item =>item.anomalieId}
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