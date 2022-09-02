import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Container, Icone, Form, FormControle, FormInput, InputFild, Label, Logo, Title } from './styles';
import { MyButton } from '../Screens/styles/homeStyle';
import MySelect from '../Components/MySelect';
import { View } from 'react-native';

export default function Register({ navigation }) {

  // Show Password //
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const showIconPass = () => {
    setShow(!show)
    setShowPass(!showPass)
  }
  // End Show Password //
  const [label, setLabel] = useState('');

  // Register User //
  const [fullName, setFullName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  // End Register User //
  const rolesData = ['Admin', 'Releveur', 'Facturateur']
  const roles = rolesData?.map((a) => {
    return { label: a, value: a }
  });

  const goTologin = () => navigation.navigate("login");

  return (
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView keyboardVerticalOffset={5} behavior='position'>
        <Container>
          {/* <Logo source={require('../Images/Amendis.png')} resizeMode="cover" /> */}
          <Form>
            <FormControle>
              <Label>Nom et prénom</Label>
              <FormInput>
                <InputFild onChangeText={(email) => setEmail(email)} value={email} />
              </FormInput>
            </FormControle>
            <FormControle>
              <Label>Login</Label>
              <FormInput>
                <InputFild onChangeText={(email) => setEmail(email)} value={email} />
              </FormInput>
            </FormControle>

            <FormControle>
              <Label>Role</Label>
              <FormInput>
                <MySelect
                  data={roles}
                  label={label}
                  setLabel={setLabel}
                  setValue={setRole}
                />
              </FormInput>
            </FormControle>


            <FormControle>
              <Label>Password</Label>
              <FormInput>
                <InputFild onChangeText={(password) => setPassword(password)} value={password} secureTextEntry={showPass} />
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

            <View style={styles.btn}>
                
              <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                <MyButton width='80px' color='white' >Annuler</MyButton>
                <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { navigation.navigate('anomalieFac'), setModalVisible(!modalvisible) }}
                style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                <MyButton width='110px' color='white' >Enregistrer</MyButton>
                <Ionicons name="send-outline" color="white" size={25} style={{ top: 3 }} />
              </TouchableOpacity>

            </View>
          </Form>

        </Container>
      </KeyboardAvoidingView >
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  btnSave: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  btn: {
    width: '85%',
    marginVertical:15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnPreSuv: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
})