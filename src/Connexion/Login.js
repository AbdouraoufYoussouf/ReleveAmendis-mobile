import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Button, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyButtonContainer,MyButton } from '../Screens/styles/homeStyle';
import { Container, Form, FormControle, FormInput, Icone, InputFild, Label, Logo, ParaTitle, Title } from './styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import db from '../../services/SqliteDb';
import { ToastAvertisement } from '../Components/Notifications';
import { BarIndicator, UIActivityIndicator, } from 'react-native-indicators';
import { useDispatch } from 'react-redux';
import { login, } from '../../services/redux/userSlice';
import { setDataTourne } from '../../services/redux/tourneSlice';


export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  const [role, setRole] = useState('Releveur')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Pogress Bar
  const [loading, setLoading] = useState(false);

  // Show Password //
  const [showPass, setShowPass] = useState(true);


  // Login in database //
  const onLogin = (email, password) => {
    db.transaction((tx) => {
      const userData = [];
      setLoading(true)
      tx.executeSql('SELECT * FROM user u JOIN compte c ON u.userId=c.userId WHERE c.email=? ', [email],
        (tx, results) => {
          const len = results.rows.length;
          if (!len) {
            ToastAvertisement("Cette adresse email n'existe pas!")
            setLoading(false)
          } else {
            const row = results.rows.item(0);
            userData.push(row)
            dispatch(login({
              userId: row.userId,
              matricule: row.matricule,
              nom: row.nom,
              role: row.role,
              emailu: row.email,
              passwordu: row.password
            }))
            if (password === row.password) {
              // console.log('userData',userData)
              navigation.navigate('home', { user: row })
              setEmail('')
              setPassword('')
              setLoading(false)
              return;
            }
            ToastAvertisement("Le Mot de passe est incorrect!")
            setLoading(false)
          }
        });
    });
  }

  // Login validation //
  let loginValidationShelma = yup.object().shape({
    email: yup.string().email('Veiller entrer un login valid!').required('Ladresse email est vide!'),
    password: yup.string().min(6, ({ min }) => `Le mot de passe doit containir au minimum ${min} caracteres!`).required('Le mot de passe est vide')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Il doit contenir 6 caractères,une majuscule,une miniscule, un chiffre et un caractère spécial"
      ),
  });

  return (
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView keyboardVerticalOffset={-70} behavior='position'>
        <Container>
          <Title>Login</Title>
          <ParaTitle>Veillez-vous connecter pour continuer</ParaTitle>
          <Logo height='150px' source={require('../Images/Amendis.png')} resizeMode="cover" />

          <Formik
            initialValues={{ email: email, password: password }}
            validateOnBlur={true}
            onSubmit={(values) => onLogin(values.email, values.password)}
            validationSchema={loginValidationShelma}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
              <Form>
                <FormControle>
                  <Label>Email</Label>
                  <FormInput>
                    <InputFild
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType='email-address'
                    />
                    <Icone disabled={true} >
                      <Ionicons name={!errors.email ? 'checkmark' : ''} size={30} color={'rgba(255,255,255,0.7)'} />
                    </Icone>
                  </FormInput>
                </FormControle>
                {(errors.email && touched.email &&
                  <View style={styles.errors}>
                    <Text style={styles.errorsText}> {errors.email} </Text>
                  </View>
                )}

                <FormControle>
                  <Label>Password</Label>
                  <FormInput>
                    <InputFild secureTextEntry={showPass}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <Icone onPress={() => setShowPass(!showPass)} >
                      <Ionicons name={showPass === true ? 'eye' : 'eye-off'} size={30} color={'rgba(255,255,255,0.7)'} />
                    </Icone>
                  </FormInput>
                </FormControle>
                {(errors.password && touched.password &&
                  <View style={styles.errors}>
                    <Text style={styles.errorsText}> {errors.password} </Text>
                  </View>
                )}

                <FormControle >
                  <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 4 }}>
                    <Text style={{ color: '#4632A1', fontSize: 16, }}>Mot de passe oublié?</Text>
                  </TouchableOpacity>
                </FormControle>
{/* 
                <FormControle >
                  <TouchableOpacity disabled={!isValid} onPress={handleSubmit}
                    style={[styles.btnSave, { backgroundColor: isValid ? '#155e75' : '#CACFD2' }]}
                  >
                    <MyButtonContainer  paddingTop='3px' width='100%' color='white' >
                    {
                      loading ? (
                          <UIActivityIndicator color='orange' size={35} style={{display:'flex',alignSelf:'center'}} />
                        ) : (<MyButton width='100%' color='white'>Se Connecter</MyButton>)
                    }
                      </MyButtonContainer>
                  
                  </TouchableOpacity>
                </FormControle> */}

                <FormControle >
                  <TouchableOpacity disabled={!isValid} onPress={() => onLogin('anfife@gmail.com', 'Anfife@2002')}
                    style={[styles.btnSave, { backgroundColor: isValid ? '#155e75' : '#CACFD2' }]}
                  >
                    <MyButtonContainer  paddingTop='3px' width='100%' color='white' >
                    {
                      loading ? (
                          <UIActivityIndicator color='orange' size={35} style={{display:'flex',alignSelf:'center'}} />
                        ) : (<MyButton width='100%' color='white'>Se Connecter</MyButton>)
                    }
                      </MyButtonContainer>
                  
                  </TouchableOpacity>
                </FormControle> 

                

              </Form>
            )}
          </Formik>

        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  btnSave: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: -40,
    height: 40
    //marginLeft:3
  },
  errors: {
    width: '85%',
    height: 'auto',
  },
  errorsText: {
    alignSelf: 'flex-start',
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
    fontStyle: 'italic'
  },
  disabled: {
    backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: -40,
    height: 37
  }

})