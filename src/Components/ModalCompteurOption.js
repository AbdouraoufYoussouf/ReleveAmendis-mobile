import { AntDesign, MaterialCommunityIcons, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Modal, Dimensions, useWindowDimensions, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../Screens/styles/homeStyle';
import MySelect from "./MySelect";
import { useDispatch, useSelector } from 'react-redux';
import { ToastAvertisement } from "./Notifications";
import { loding, notLoding, setCompteurs } from "../../services/redux/compteurSlice";
import { setTourneCourant } from "../../services/redux/tourneSlice";

export default function ModalCompteurOption() {
    const { height, width } = useWindowDimensions();

    const dispatch = useDispatch();
    const ruesData = useSelector((state) => state.rueSecteurs.rues);
    const secteursData = useSelector((state) => state.rueSecteurs.secteurs);
    const tournesData = useSelector((state) => state.tournes.tournes);
    const isCreated = useSelector((state) => state.compteurs.isCreatec);
    const tourneCourant = useSelector((state) => state.tournes.tourneCourant);
   // console.log(isCreated)
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibletourne, setModalVisibletourne] = useState(false);
    const [modalVisibleRue, setModalVisibleRue] = useState(false);
    const [modalVisibleSecteur, setModalVisibleSecteur] = useState(false);
    const [indicator, setIndicator] = useState(false);

    const [tourne, setTourne] = useState('');
    const [rue, setRue] = useState('');
    const [secteur, setSecteur] = useState('');
    const [labelTourne, setLabelTourne] = useState(tourneCourant);
    const [labelRue, setLabelRue] = useState('');
    const [labelSecteur, setLabelSecteur] = useState('');
    const [compteurByTourne, setCompteurByTourne] = useState([]);

    const compteursData = useSelector((state) => state.compteurs.compteurs);
    const ancienCompteursData = useSelector((state) => state.compteurs.ancienCompteurs);
    let nonluCompteurs = ancienCompteursData.filter((nl) => nl.etatLecture == 'NL')
   // console.log("compteurbytourne", compteurByTourne)
    //console.log("secteurdata", secteursData)

    const handleTourne = (tourne) => {
        dispatch(setTourneCourant(tourne))
        setModalVisibletourne(false)
    }

    const handleRue = (rue) => {
        setIndicator(true)
        if (rue != '') {

            let parRue = compteurByTourne.filter((cmp) => cmp.numeroRue === rue)
           // console.log('pardecteur', parRue)
            dispatch(setCompteurs(parRue))
            setRue('')
            setLabelRue('')
            setTimeout(() => {
                setIndicator(false)
                setModalVisibleRue(false);
            }, 200);
        } else {
            ToastAvertisement('Veillez choisir un nom de rue!')
            setIndicator(false)
        }
    }
    const handleSecteur = (sect) => {
        setIndicator(true)
        if (sect != '') {

            let parSecteur = compteurByTourne.filter((cmp) => cmp.codeSecteur === sect)

            dispatch(setCompteurs(parSecteur))
            setSecteur('')
            setLabelSecteur('')
            setTimeout(() => {
                setIndicator(false)
                setModalVisibleSecteur(false);
            }, 200);
        } else {
            ToastAvertisement('Veillez choisir le numero du Secteur!')
            setIndicator(false)
        }

    }

    const handleResetFilter = () => {
        dispatch(loding())
        const compteurByTourne = nonluCompteurs.filter((cmt) => cmt.numeroTourne == tourneCourant)

        dispatch(setCompteurs(compteurByTourne))
        dispatch(notLoding())
    }

    const goto = (route) => {
        navigation.navigate(route);
        setModalVisible(false);
    }

    const tournes = tournesData.map((a) => {
        return { label: a.numeroTourne?.toString(), value: a.numeroTourne }
    });

    const rues = ruesData.map((a) => {
        return { label: a.nomRue, value: a.nomRue }
    });

    const secteurs = secteursData.map((a) => {
        return { label: a.designation, value: a.designation }
    });

    //console.log('gfgf',secteurs)
    useEffect(() => {
        setCompteurByTourne(nonluCompteurs.filter((cmt) => cmt.numeroTourne == tourneCourant))
    }, [tourneCourant])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Feather name="menu" size={28} color="white"
                    style={{ marginRight: 6 }}
                />
            </TouchableOpacity>
            {/* modal de options */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable
                    onPress={() => { setModalVisible(false); }}
                    style={styles.modalContainer}>

                    <Pressable onPress={() => setModalVisible(true)}
                        style={[styles.modalContent, { top: 35 }]}>

                        <View style={styles.body}>
                            {
                                !isCreated ? (
                                    <TouchableOpacity style={styles.contText}
                                        onPress={() => { goto('addCompteur'), setModalVisible(false) }}>
                                        <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                        <Text style={styles.modalText}>Ajouter compteur</Text>
                                    </TouchableOpacity>
                                ) : (null)
                            }

                            <View style={{ width: '100%', height: 1, backgroundColor: 'gray', alignSelf: 'center', }}></View>
                            <TouchableOpacity style={styles.contText}
                                onPress={() => { goto('nonluCompteur'), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Compteur non lus</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', alignSelf: 'center' }}></View>

                            <TouchableOpacity style={styles.contText}
                                onPress={() => { setModalVisibletourne(true), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Changer tourner</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%', height: 3, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, top: 1.5 }}>Filtre</Text>
                            <View style={{ width: '100%', height: 3, backgroundColor: 'white', alignSelf: 'center', marginVertical: 5, borderRadius: 5 }}></View>

                            <TouchableOpacity style={styles.contText}
                                onPress={() => { setModalVisibleRue(true), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Lecture par rue</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', alignSelf: 'center' }}></View>

                            <TouchableOpacity style={styles.contText}
                                onPress={() => { setModalVisibleSecteur(true), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Lecture par secteur</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', alignSelf: 'center' }}></View>
                            <TouchableOpacity style={styles.contText}
                                onPress={() => { handleResetFilter(), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Annuler le filtrage</Text>
                            </TouchableOpacity>

                        </View>

                    </Pressable>
                </Pressable>
            </Modal>

            {/* changer tourner */}

            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibletourne}
                    onRequestClose={() => {
                        setModalVisibletourne(!modalVisibletourne);
                    }}
                >
                    <Pressable
                        onPress={() => setModalVisibletourne(false)}
                        style={styles.modalContainerTourne}>

                        <Pressable onPress={() => setModalVisibletourne(true)}
                            style={styles.modalContentTourne}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>

                            <Form >
                                <MyText color='white' marginTop='13px' large>Changement de tourné</MyText>
                                <FormControle>
                                    <FormInput width='85%'>
                                        <MyText color='white' large marginH='5px'>N° Tourné</MyText>
                                        <MySelect
                                            center={true}
                                            placeholder='Selectionné Tourné'
                                            data={tournes}
                                            label={labelTourne}
                                            setLabel={setLabelTourne}
                                            setValue={setTourne} />
                                    </FormInput>

                                </FormControle>
                                <FormControle>
                                    <FormInput>
                                        <TouchableOpacity onPress={() => setModalVisibletourne(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='75px' color='white' >Férmer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity onPress={() => handleTourne(tourne)}
                                            style={[styles.btnPreSuv, { backgroundColor: '#465881', width: 120 }]}>
                                            {
                                                indicator ? (
                                                    <ActivityIndicator size="large" color="#fff" style={{}} />
                                                ) : (
                                                    <>
                                                        <MyButton width='110px' color='white' >Changer</MyButton>
                                                    </>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </FormInput>

                                </FormControle>
                            </Form>

                        </Pressable>

                    </Pressable>
                </Modal>

                {/* modal rue */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleRue}
                    onRequestClose={() => {
                        setModalVisibleRue(!modalVisibleRue);
                    }}
                >
                    <Pressable
                        onPress={() => setModalVisibleRue(false)}
                        style={styles.modalContainerTourne}>

                        <Pressable onPress={() => setModalVisibleRue(true)}
                            style={styles.modalContentTourne}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>

                            <Form >
                                <MyText color='white' marginTop='13px' large>Choix d'une rue à lire</MyText>
                                <FormControle>
                                    <FormInput width='85%'>
                                        <MyText color='white' large marginH='5px'>N° Rue</MyText>
                                        <MySelect
                                            center={true}
                                            placeholder='Select Rue'
                                            data={rues}
                                            label={labelRue}
                                            setLabel={setLabelRue}
                                            setValue={setRue} />
                                    </FormInput>

                                </FormControle>
                                <FormControle>
                                    <FormInput>
                                        <TouchableOpacity onPress={() => setModalVisibleRue(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='75px' color='white' >Fermer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity onPress={() => handleRue(rue)}
                                            style={[styles.btnPreSuv, { backgroundColor: '#465881', width: 120 }]}>
                                            {
                                                indicator ? (
                                                    <ActivityIndicator size="large" color="#fff" />
                                                ) : (
                                                    <MyButton width='110px' color='white' >Enrégistrer</MyButton>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </FormInput>

                                </FormControle>
                            </Form>

                        </Pressable>

                    </Pressable>
                </Modal>
                {/* modal secteur */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleSecteur}
                    onRequestClose={() => {
                        setModalVisibleSecteur(!modalVisibleSecteur);
                    }}
                >
                    <Pressable
                        onPress={() => setModalVisibleSecteur(false)}
                        style={styles.modalContainerTourne}>

                        <Pressable onPress={() => setModalVisibleSecteur(true)}
                            style={styles.modalContentTourne}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>

                            <Form >
                                <MyText color='white' marginTop='13px' large>Choix du Secteur à lire</MyText>
                                <FormControle>
                                    <FormInput width='85%'>
                                        <MyText color='white' large marginH='5px'>N° Secteur</MyText>
                                        <MySelect
                                            center={true}
                                            placeholder='Select  Secteur'
                                            data={secteurs}
                                            label={labelSecteur}
                                            setLabel={setLabelSecteur}
                                            setValue={setSecteur} />
                                    </FormInput>

                                </FormControle>
                                <FormControle>
                                    <FormInput>
                                        <TouchableOpacity onPress={() => setModalVisibleSecteur(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='75px' color='white' >Fermer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity onPress={() => handleSecteur(secteur)}
                                            style={[styles.btnPreSuv, { backgroundColor: '#465881', width: 120 }]}>
                                            {
                                                indicator ? (
                                                    <ActivityIndicator size="large" color="#fff" />
                                                ) : (
                                                    <MyButton width='110px' color='white' >Enrégistrer</MyButton>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </FormInput>

                                </FormControle>
                            </Form>

                        </Pressable>

                    </Pressable>
                </Modal>

            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    /////////////// Modal ////////

    modalContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        borderBottomLeftRadius: 20,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#36382F',
        position: 'absolute',
        
        right: 0,
        padding: 5
    },
    body: {
        width: '100%',
    },
    contText: {
        //backgroundColor: 'gray',
        marginVertical: 2,
        display: "flex",
        flexDirection: 'row',
        height: 30
    },
    modalText: {
        fontSize: 18,
        color: 'white',
    },

    ////modal tourne

    modalContainerTourne: {
        flex: 1,
        // justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',

    },
    modalContentTourne: {
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
        width: '100%',
        minHeight: '25%',
        height: 'auto',
        padding: 5,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: 0,
    },


    ///
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
        //marginLeft:3
    },

    chevron: { color: '#fff', fontSize: 25, top: 3 },
    bg: { color: '#fff', backgroundColor: '#465881' },
});
