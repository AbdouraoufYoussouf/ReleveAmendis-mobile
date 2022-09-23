import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { View, SectionList, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

export const CompteScreen = () => {
    const user = useSelector((state) => state.user.value);
    const [role, setRole] = useState(user.role)  
    const users = useSelector((state) => state.user.users);
  console.log('users',users)
    useEffect(()=>{

    },[])

    const Data = [
        { id: 1, login: 'rafelmirereni@gmail.com', role: 'Admin', },
        { id: 2, login: 'rafelmirereni@gmail.com', role: 'Releveur', },
        { id: 4, login: 'rafelmirerenidimani@gmail.com', role: 'Releveur', },
        { id: 5, login: 'rafelmirereni@gmail.com', role: 'Facturateur', },
        { id: 6, login: 'rafelmirereni@gmail.com', role: 'Admin', },
        { id: 7, login: 'rafelmirereni@gmail.com', role: 'Releveur', },
        { id: 8, login: 'rafelmirerenidimani@gmail.com', role: 'Releveur', },
        { id: 9, login: 'rafelmirereni@gmail.com', role: 'Facturateur', },
    ];

const result = users.filter(res => res.role==='Facturateur' || res.role==='Releveur');

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

                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 70, color: 'black', height: 30,marginTop:5 }}> Mat </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 220, color: 'black', borderLeftWidth: 1,marginTop:5, height: 30, }}> Login </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 120, color: 'black', borderLeftWidth: 1,marginTop:5, height: 30, }}> Role </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 100, color: 'black', borderLeftWidth: 1,marginTop:5, height: 30, }}> Option</Text>
            </View>
        );
    }

    const ItemRender = ({ login, role, matricule, index}) => (
        <View style={[styles.item,index%2 && { backgroundColor: '#fff'}]}>
            <Text style={{ fontSize: 17, width: 70, color: 'black',textAlign:'center' }}>{matricule}</Text>
            <Text style={{ fontSize: 17, width: 220, color: 'black', paddingHorizontal: 3 }}>{login}</Text>
            <Text style={{ fontSize: 17, width: 120, color: 'black', paddingHorizontal: 2, }}>{role}</Text>
            <View style={{ width: 100, flexDirection: 'row' }}>

                <TouchableOpacity style={{ marginLeft: 10 }}>
                    <MaterialCommunityIcons name="account-edit-outline" size={30} color="#0A66C2" />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: 15 }}>
                    <MaterialCommunityIcons name="delete-outline" size={25} color="red" />
                </TouchableOpacity>
            </View>
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
                    
                    data={role==='Admin'? users:result}
                    renderItem={({ item,index }) => <ItemRender login={item.email} role={item.role} matricule={item.matricule} index={index} fullName={item.fullName}  />}
                    keyExtractor={item => item.userId}
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        minHeight: 35,
        backgroundColor:'#D0C9C0'
    }
})
