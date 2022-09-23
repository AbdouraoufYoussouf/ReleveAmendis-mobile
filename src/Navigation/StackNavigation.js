import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import Login from '../Connexion/Login';
import Register from '../Connexion/Register';
import NonlusCompteurScreen from "../Screens/Compteurs/NonlusCompteurScreen";
import { SearchCompteur } from "../Screens/Compteurs/SearchCompteur";
import { BottomNavigation } from "./BottomNavigation";
import { getHeaderTitle } from '@react-navigation/elements';
import DetailsScreen from "../Screens/Compteurs/DetailsScreen";
import AddCompteurScreen from "../Screens/Compteurs/AddCompteurScreen";
import UserScreen from "../Screens/UserScreen";
import ModalUserOption from "../Components/ModalUserOption";
import { ReleveurNavigationBottom } from "../Screens/Releveur/ReleveurNavigationbottom";
import { FacturateurNavigationBottom } from "../Screens/Facturateur/FacturateurNavigationbottom";
import { FluideScreen } from "../Screens/FluideScreen";
import TestScreen from '../../test/TestScreen';
import PageLectureCompteur from "../Screens/Releveur/PageLectureCompteur";
import { CompteScreen } from "../Screens/CompteScreen";
import LusCompteurScreen from "../Screens/Compteurs/LusCompteurScreen";


const Stack = createStackNavigator();

const globalScreenOptions = {
    headerStyle: { backgroundColor: '#36382F', height: 65, },
    headerTitleStyle: { color: 'white', alignSelf: 'center' },
    headerTitleAlign: 'center',
    initialRouteName: 'login',
    headerBackImage: () => <Ionicons name="return-up-back" color='white' size={35} style={{ marginTop: -6, marginLeft: -9 }} />,
}

export default function StackNavigation({ navigation }) {
    return (
        <Stack.Navigator screenOptions={globalScreenOptions}>
            {/* <Stack.Screen options={{ headerShown: false }} name="test" component={TestScreen} /> */}
            <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="home" component={BottomNavigation} />
            <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: "Ajout d'un Compteur", }}
                name="addCompteur" component={AddCompteurScreen}
            />
             <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: "Page de la releve", }}
                name="pagelecture" component={PageLectureCompteur}
            />
            <Stack.Screen options={{ headerShown: false }} name="releveur" component={ReleveurNavigationBottom} />
            <Stack.Screen options={{ headerShown: false }} name="facturateur" component={FacturateurNavigationBottom} />
            <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: "Gestion des Fluides", }}
                name="fluide" component={FluideScreen}
            />
            <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: "Compte user", }}
                name="user" component={UserScreen}
            />

            <Stack.Screen
                options={{
                    tabBarLabelStyle: { fontSize: 14 },
                    headerTitle: 'Details du Compteur',

                }}
                name="details" component={DetailsScreen}
            />

        
            <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: 'Compteurs non lus', }}
                name="nonluCompteur" component={NonlusCompteurScreen}
            />
        
            <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: 'Compteurs lus', }}
                name="luCompteur" component={LusCompteurScreen}
            />

            <Stack.Screen
                options={{ tabBarLabelStyle: { fontSize: 14 }, headerTitle: 'Rechercher Compteur', }}
                name="searchCompteur" component={SearchCompteur}
            />
            <Stack.Screen name="register" component={Register} options={{ headerTitle: "Ajouter utilisateur", }} />
            <Stack.Screen options={{ headerShown: false }} name="conteuroptions" component={CompteScreen} />
        </Stack.Navigator>
    )
}
