import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { Form, FormControle, FormInput, InputFild, Label, MyButton } from './styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';
import MySelect from '../Components/MySelect';
import { useSelector } from 'react-redux';
import { updateFluide } from '../../services/Anomalie.Service';

export const FluideScreen = () => {
    const [fluide, setFluide] = useState('');
    const [label, setLabel] = useState('');

    const [filterMax, setfilterMax] = useState("");
    const [filterMin, setfilterMin] = useState("");
    const [filterSup, setFilterSup] = useState("");
    const [filterInf, setfilterInf] = useState("");

    const fluideData = useSelector((state) => state.anomalies.fluides);

    //console.log('onchange', filterMax)

    const onChangeFluide = () => {
        let fluid = fluideData.find(f => f.codeFluide == fluide)
        setFilterSup(fluid?.filtreSup.toString())
        setfilterInf(fluid?.filtreInf.toString())
        setfilterMax(fluid?.filtreMax.toString())
        setfilterMin(fluid?.filtreMin.toString())
    }
    const handleResetFluide = () => {
        setFilterSup('')
        setfilterInf('')
        setfilterMax('')
        setfilterMin('')
    }

    const handleSaveFluide = async() => {
      await updateFluide(fluide,filterSup,filterInf,filterMax,filterMin)
    }


    //console.log('fluide', fluideData)
    //const fluidesData = ['EA', 'BT', 'MT', "EB", 'EM', 'BM', 'TT'];
    const fluides = fluideData?.map((a) => {
        return { label: a.codeFluide, value: a.codeFluide }
    });

    useEffect(() => {
        onChangeFluide()
    }, [fluide])

    return (
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardVerticalOffset={42} behavior='position'>

                <Form marginTop='20px'>

                    <FormControle>
                        <Label minWidth='31%'>Fluides</Label>
                        <FormInput width='68%' >
                            <MySelect
                                placeholder={'Select fluide'}
                                data={fluides}
                                setValue={setFluide}
                                setLabel={setLabel}
                                label={label}
                                center={true}
                            // onChange={onChangeFluide}
                            />
                        </FormInput>
                    </FormControle>

                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Max</Label>
                            <InputFild width='54%'
                                keyboardType='numeric'
                                onChangeText={newText => setfilterMax(newText)}
                                value={filterMax} />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='11%'>%</Label>
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Sup</Label>
                            <InputFild width='54%'
                                keyboardType='numeric'
                                onChangeText={newText => setFilterSup(newText)}
                                value={filterSup} />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='11%'>%</Label>
                        </FormInput>
                    </FormControle>

                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Min</Label>
                            <InputFild width='54%'
                                keyboardType='numeric'
                                onChangeText={newText => setfilterMin(newText)}
                                value={filterMin} />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='11%'>%</Label>
                        </FormInput>
                    </FormControle>
                    <FormControle>
                        <FormInput >
                            <Label minWidth='31%'>Filtre Inf</Label>
                            <InputFild width='54%'
                                keyboardType='numeric'
                                onChangeText={newText => setfilterInf(newText)}
                                value={filterInf} />
                            <Label bg='#465881' fontZise='25px' color='white' textAlign minWidth='11%'>%</Label>
                        </FormInput>
                    </FormControle>


                    <FormControle marginV='22px'>
                        <FormInput>
                            <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}
                            onPress={() => handleResetFluide()}
                            >
                                <MyButton width='80px' color='white' >Annuler</MyButton>
                                <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                            </TouchableOpacity>
                        </FormInput>

                        <FormInput>
                            <TouchableOpacity onPress={() => handleSaveFluide()}
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
        marginLeft: -5
    },
    dropBtnTxtStyle: { color: 'rgba(255,255,255,0.7)', textAlign: 'left', },
    dropDropStyle: { backgroundColor: '#EFEFEF', },
    dropRowStyle: { backgroundColor: '#EFEFEF', },
    dropRowTxtStyle: { color: '#000', textAlign: 'left' },

})