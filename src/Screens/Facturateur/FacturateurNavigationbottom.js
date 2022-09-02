import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";

import ChargeScreen from "./HomeFacturateur";
import ParamScreen from "../ParamScreen";
import ModalUserOption from "../../Components/ModalUserOption";

import { CompteScreen } from "../CompteScreen";
import Anomalie from "../Releveur/AnomalieScreen";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import HomeFacturateur from "./HomeFacturateur";
import { AddAnomalie } from "./AddAnomalie";
import { useSelector } from "react-redux";

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

export const FacturateurNavigationBottom = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.value);
    const [role, setRole] = useState(user.role)

    return (
        <Tab.Navigator
            screenOptions={globalScreenOptions}
        >
            <Tab.Screen name="homeFacturateur" component={HomeFacturateur}
                options={{
                    tabBarLabel: 'Home',
                    headerTitle: 'Facturateur',
                    tabBarLabelStyle: { fontSize: 16 },
                    headerRight: () => (
                        <ModalUserOption />
                    ),
                    headerLeft: () => ( role ==='Admin'?
                    <Ionicons onPress={()=> navigation.navigate('home') } name="return-up-back" color='white' size={35} style={{ marginTop: -3, marginLeft: 9 }} />
                    : <></>
                ),
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" color={color} size={size} />
                    }
                }} />

            <Tab.Screen name="compte" component={CompteScreen} options={{
                headerTitle: 'Gestions des comptes',
                tabBarLabel:'Comptes',
                tabBarLabelStyle: { fontSize: 14 },
                headerRight: () => (
                    <TouchableOpacity onPress={()=>navigation.navigate('register')} >
                        <FontAwesome5 name="user-plus" color='white' size={25} onPess={()=>navigation.navigate('register')}  style={{ marginRight: 6 }} />
                    </TouchableOpacity>
                ),
                tabBarIcon: ({ color, size }) => {
                    return <FontAwesome5 name="users" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="anomalieFac" component={Anomalie} options={{
                tabBarLabel:'Anomalies',
                headerTitle:'Gestion des Anomalies',
                tabBarLabelStyle: { fontSize: 14 },
                headerRight: () => (
                    <AddAnomalie/>
                ),
                tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="notifications-circle"  color={color} size={size} />
                }
            }} />
            <Tab.Screen name="Parametre" component={EmptyScreen} options={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarButton: () => <ParamScreen/>
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
