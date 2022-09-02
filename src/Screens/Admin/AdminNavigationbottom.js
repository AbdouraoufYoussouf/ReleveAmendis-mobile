import { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";


import ParamScreen from "../../Screens/ParamScreen";
import ModalUserOption from "../../Components/ModalUserOption";
import { HomeAdmin } from "./HomeAdmin";
import { ReleveurScreen } from "./ReleveurScreen";
import { FacturateurScreen } from "./FacturateurScreen";
import { CompteScreen } from "../CompteScreen";
import { useNavigation } from "@react-navigation/native";
import { ReleveurNavigationBottom } from "../Releveur/ReleveurNavigationbottom";
import { FacturateurNavigationBottom } from "../Facturateur/FacturateurNavigationbottom";

const Tab = createBottomTabNavigator();

const globalScreenOptions = {
    headerStyle: { backgroundColor: '#36382F', height: 65, },
    headerTitleStyle: { color: 'white', alignSelf: 'center' },
    headerTitleAlign: 'center',
    initialRouteName: 'fichier',
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: '#36382F',
    tabBarHideOnKeyboard: true,

};

export const AdminNavigationBottom = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={globalScreenOptions}
        >
            <Tab.Screen name="homeAdmin" component={HomeAdmin}
                options={{
                    tabBarLabel: 'Home',
                    headerTitle: 'Administrateur',
                    tabBarLabelStyle: { fontSize: 16 },
                    headerRight: () => (
                        <ModalUserOption />
                    ),
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" color={color} size={size} />
                    }
                }} />

            <Tab.Screen name="releveurAdmin"
                component={EmptyScreen}
                options={() => {
                    return {
                        tabBarButton: () =>
                            <TouchableOpacity style={styles.popovercom} onPress={() => navigation.navigate('releveur')}>
                                <FontAwesome5 name="user-secret" color='#36382F' size={25} />
                                <Text style={{ fontSize: 15, marginHorizontal: 3, color: '#36382F' }}>Releveur</Text>
                            </TouchableOpacity>
                    };
                }}
            />
            <Tab.Screen name="facturateurAdmin"
                component={EmptyScreen}
                options={() => {
                    return {
                        tabBarButton: () =>
                            <TouchableOpacity style={styles.popovercom} onPress={() => navigation.navigate('facturateur')}>
                                <FontAwesome5 name="user-tie" color='#36382F' size={25} />
                                <Text style={{ fontSize: 15, marginHorizontal: 3, color: '#36382F' }}>Facturateur</Text>
                            </TouchableOpacity>
                    };
                }}
            />



            <Tab.Screen name="compte" component={CompteScreen} options={{
                headerTitle: 'Les comptes',
                tabBarLabel: 'Compte',
                tabBarLabelStyle: { fontSize: 14 },
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('register')} >
                        <FontAwesome5 name="user-plus" color='white' size={25} onPess={() => navigation.navigate('register')} style={{ marginRight: 6 }} />
                    </TouchableOpacity>
                ),
                tabBarIcon: ({ color, size }) => {
                    return <FontAwesome5 name="users" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="Parametre"
                component={EmptyScreen}
                options={() => {
                    return {
                        tabBarButton: () => <ParamScreen />
                    };

                }} />


        </Tab.Navigator>
    )
}

export function EmptyScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        </View>
    );
}

const styles = StyleSheet.create({

    popovercom: {
        backgroundColor: 'white',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 1
    },
})  