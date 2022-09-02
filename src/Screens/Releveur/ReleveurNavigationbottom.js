import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import AnomalieScreen from "./AnomalieScreen";
import UserScreen from "../UserScreen";
import StatisticScreen from "./StatisticScreen";

import HomeReleveScreen1 from "./HomeReleveScreen1";
import { useSelector } from "react-redux";
import ModalCompteurOption from "../../Components/ModalCompteurOption";
import ModalUserOption from "../../Components/ModalUserOption";

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

export const ReleveurNavigationBottom = ({ navigation }) => {

    const tourneCourant = useSelector((state) => state.tournes.tourneCourant);
    const user = useSelector((state) => state.user.value);
    const [role, setRole] = useState(user.role)
    return (
        <Tab.Navigator screenOptions={globalScreenOptions}>
            <Tab.Screen name="homeReleve" component={HomeReleveScreen1}
                options={{
                    tabBarLabel: 'Home',
                    headerTitle: 'Tourné '+ tourneCourant,
                    tabBarLabelStyle: { fontSize: 16 },
                    headerRight: () => (
                        <ModalCompteurOption />
                    ),
                    headerLeft: () => (role === 'Admin' ?
                        <Ionicons onPress={() => navigation.navigate('home')} name="return-up-back" color='white' size={35} style={{ marginTop: -3, marginLeft: 9 }} />
                        : <></>
                    ),
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" color={color} size={size} />
                    },
                }} />

            <Tab.Screen name="Anomalie" component={AnomalieScreen} options={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="notifications-circle" color={color} size={size} />
                }
            }} />

            <Tab.Screen name="Statistic" component={StatisticScreen} options={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="stats-chart-outline" color={color} size={size} />
                }
            }} />

            <Tab.Screen name="Compte" component={UserScreen} options={{
                 headerRight: () => (
                    <ModalUserOption />
                ),
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIcon: ({ color, size }) => {
                    return <FontAwesome5 name="user" color={color} size={size} />
                }
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
