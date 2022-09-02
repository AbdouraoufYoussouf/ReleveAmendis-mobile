import React, { useState } from 'react'
import { View, SectionList, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function StatisticScreen({navigation}) {

    const Data = [
        {
            id: 1,
            numeroTourne: 21,lus:7,nonLus:2,codeFluide:45,
        },
        {
            id: 2,
            numeroTourne: 21,lus:7,nonLus:3,codeFluide:45,
        },
        {
            id: 3,
            numeroTourne: 21,lus:7,nonLus:5,codeFluide:45,
        },
        {
            id: 4,
            numeroTourne: 21,lus:7,nonLus:6,codeFluide:45,
        },
        {
            id: 5,
            numeroTourne: 21,lus:7,nonLus:4,codeFluide:45,
        },
        {
            id: 6,
            numeroTourne: 21,lus:7,nonLus:2,codeFluide:45,
        },
       
        {
            id: 7,
            numeroTourne: 21,lus:7,nonLus:2,codeFluide:56,
        },
       
        {
            id: 8,
            numeroTourne: 21,lus:7,nonLus:4,codeFluide:56,
        },
       
    ];

    const FlatList_Header = () => {
        return (
            <View style={{
                height: 30,
                width: "100%",
                display: 'flex',
                flexDirection:'row',
                backgroundColor: '#17DBE4',
                alignItems: 'center',
            }}>

                <Text style={{ fontSize: 18,fontWeight:'bold', width:90, color: 'black',height:30 }}> N° Tourne</Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:70, color: 'black',borderLeftWidth:1,height:30, paddingHorizontal:3}}> Lus </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:80, color: 'black',borderLeftWidth:1,height:30, paddingHorizontal:3}}> Non lus </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:70, color: 'black',borderLeftWidth:1,height:30, paddingHorizontal:3}}>Total</Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:120, color: 'black',borderLeftWidth:1,height:30,paddingHorizontal:3 }}>Pourcentage</Text>
            </View>
        );
    }

    const ItemRender = ({ numeroTourne,lus,nonLus,codeFluide,adress ,index }) => (
        <View  style={[styles.item,index%2 && { backgroundColor: '#D0C9C0'}]}>
            <Text style={{fontSize: 17,width:90,color: 'black' ,textAlign:'center'}}>{numeroTourne}</Text>
            <Text style={{fontSize: 17,width:70,color: 'black' ,textAlign:'center'}}>{lus}</Text>
            <Text style={{fontSize: 17,width:80,color: 'black'  ,textAlign:'center'}}>{nonLus}</Text>
            <Text style={{fontSize: 17,width:70,color: 'black',textAlign:'center' }}>{codeFluide}</Text>
            <Text style={{fontSize: 17,width:120,color: 'black',textAlign:'center' }}>{codeFluide} %</Text>
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
                    data={Data}
                    renderItem={({ item ,index}) => <ItemRender index={index} numeroTourne={item.numeroTourne} lus={item.lus} nonLus={item.nonLus} codeFluide={item.codeFluide} adress={item.adress} />}
                    keyExtractor={item => item.id}
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
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:2,
        
    }
})