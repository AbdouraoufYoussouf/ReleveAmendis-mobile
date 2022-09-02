import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { Form, FormControle, FormInput, InputFild, Label, MyButton } from './styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';

export const FluideScreen = () => {
    const [value, setValue] = useState('');
    const fluides = ['EA', 'BT', 'MT', "EB", 'EM', 'BM', 'TT'];
    const onSelect = (selectedItem) => {
        setValue(selectedItem)
    }
    return (
        <ScrollView  keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardVerticalOffset={42} behavior='position'>

                <Form marginTop='20px'>

                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Fluide</Label>
                            <SelectDropdown
                                data={fluides}
                                onSelect={onSelect}
                                defaultButtonText={'Fluides'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={styles.dropBtnStyle}
                                buttonTextStyle={styles.dropBtnTxtStyle}
                                renderDropdownIcon={isOpened => {
                                    return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                                }}
                                dropdownIconPosition={'rigth'}
                                dropdownStyle={styles.dropDropStyle}
                                rowStyle={styles.dropRowStyle}
                                rowTextStyle={styles.dropRowTxtStyle}
                            />
                        </FormInput>
                    </FormControle>

                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Max</Label>
                            <InputFild width='54%' />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='10%'>%</Label>
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Sup</Label>
                            <InputFild width='54%' />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='10%'>%</Label>
                        </FormInput>
                    </FormControle>

                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Min</Label>
                            <InputFild width='54%' />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='10%'>%</Label>
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Inf</Label>
                            <InputFild width='54%' />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='10%'>%</Label>
                        </FormInput>
                    </FormControle>


                    <FormControle marginV='22px'>
                        <FormInput>
                            <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                <MyButton width='80px' color='white' >Annuler</MyButton>
                                <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                            </TouchableOpacity>
                        </FormInput>

                        <FormInput>
                            <TouchableOpacity onPress={() => { navigation.navigate('anomalieFac'), setModalVisible(!modalvisible) }}
                                style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                                <MyButton width='110px' color='white' >Enregistrer</MyButton>
                                <Ionicons name="send-outline" color="white" size={25} style={{ top: 3 }} />
                            </TouchableOpacity>
                        </FormInput>
                    </FormControle>
                </Form>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    dropBtnStyle: {
        height: 35,
        width: '66.5%',
        marginVertical: 1,
        backgroundColor: '#465881',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
        marginLeft:-5
    },
    dropBtnTxtStyle: { color: 'rgba(255,255,255,0.7)', textAlign: 'left', },
    dropDropStyle: { backgroundColor: '#EFEFEF', },
    dropRowStyle: { backgroundColor: '#EFEFEF', },
    dropRowTxtStyle: { color: '#000', textAlign: 'left' },

})