import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Form, Label, FormControle, FormInput, InputFild, Icone } from '../Connexion/styles'
import usere from '../Images/user.png'
import { MyButton } from './styles/homeStyle'

export default function UserScreen() {
    const user = useSelector((state) => state.user.value);

    // Show Password //
    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(true);

    const showIconPass = () => {
        setShow(!show)
        setShowPass(!showPass)
    }
    // End Show Password //

    // Register User //
    const [login, setLogin] = useState(user.emailu);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    // End Register User //

    const goTologin = () => navigation.navigate("login");
    return (
        <ScrollView style={styles.container}
            keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardVerticalOffset={-200} behavior='position'>

                <View style={styles.header}>
                    <Image style={{ tintColor: 'white', width: 100, height: 100, top: -9, alignSelf: 'center' }} source={usere} />
                    <View style={styles.numero}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2B8EF0', }}>{user.nom}</Text>
                        <View style={{flexDirection:'row',}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gray' }}>Matricule : </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2B8EF0' }}>{user.matricule}</Text>
                        </View>
                    </View>
                </View>
                <Form>
                    <FormControle>
                        <Label>Login</Label>
                        <FormInput>
                            <InputFild onChangeText={(login) => setLogin(login)} value={login} />
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <Label>Ancien Password</Label>
                        <FormInput>
                            <InputFild onChangeText={(password) => setPassword(password)} value={password} secureTextEntry={showPass} />
                            <Icone onPress={showIconPass} >
                                <Ionicons name={show === false ? 'eye' : 'eye-off'} size={30} color={'rgba(255,255,255,0.7)'} />
                            </Icone>
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <Label>Nouveau Password</Label>
                        <FormInput>
                            <InputFild onChangeText={(password) => setConfirmPass(password)} value={confirmPass} secureTextEntry={showPass} />
                            <Icone onPress={showIconPass} >
                                <Ionicons name={show === false ? 'eye' : 'eye-off'} size={30} color={'rgba(255,255,255,0.7)'} />
                            </Icone>
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <Label>Confirm Password</Label>
                        <FormInput>
                            <InputFild onChangeText={(password) => setConfirmPass(password)} value={confirmPass} secureTextEntry={showPass} />
                            <Icone onPress={showIconPass} >
                                <Ionicons name={show === false ? 'eye' : 'eye-off'} size={30} color={'rgba(255,255,255,0.7)'} />
                            </Icone>
                        </FormInput>
                    </FormControle>

                    <View style={styles.formcontrole}>
                        <View style={styles.formInput}>
                            <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                <MyButton width='100px' color='white' >Annuler</MyButton>
                                <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formInput}>
                            <TouchableOpacity
                                style={[styles.btnPreSuv, { backgroundColor: 'blue' }]}>
                                <MyButton width='100px' color='white' >Enregistrer</MyButton>
                                <Ionicons name="send-outline" color="white" size={25} style={{ top: 3 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Form>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 150, width: '100%', backgroundColor: '#17DBE4',
        color: 'white', alignItems: 'center'
    },

    numero: {
        height: 65,
        backgroundColor: 'white',
        padding: 5, position: 'absolute', bottom: 0,
        width: '90%', alignItems: 'center', borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingLeft:30
    },
    formcontrole: {
        width: '85%',
        height: 75,
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between'
    },
    formInput: {
        borderRadius: 5,
        flexDirection: "row",
        width: 'auto',
        height: 34,
    },
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
    },

})  