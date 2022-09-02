import React, { Fragment, useEffect, useState } from 'react'
import { ScrollView, Text, View, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Form, FormControle, InputFild, FormInput, FormContainer } from '../styles/homeStyle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


import { Icone, Icone1 } from '../../Connexion/styles';
import { setCompteurs } from '../../../services/redux/compteurSlice';

export default function HomeReleveScreen1({ navigation }) {
  const dispatch = useDispatch();
  const {height, width } = useWindowDimensions();

  ///////////////////////// les données /////////////////////
  const tourneCourant = useSelector((state) => state.tournes.tourneCourant);

  const datas = useSelector((state) => state.compteurs.ancienCompteurs);
  const compteurs = useSelector((state) => state.compteurs.compteurs);
  const compteurByTourne = compteurs.filter(comt => comt.numeroTourne == tourneCourant)
  const [termSearch, setTermSearch] = useState('');
  const compteursSearch = compteurs.filter(cmpt => {
    return cmpt.numeroCompteur.includes(termSearch);
  });

  //console.log('tourne', tourneCourant)


  /// Dialog ***********
  const [modalVisible, setModalVisible] = useState(false);
  const [errore, setErrore] = useState(null);
  /// Dialog ***********

  const [refreshing, setRefreshing] = useState(false);

  const FlatList_Header = () => {
    return (
      <View style={{ height: 35, width: width, }} >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',marginTop:4}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: width / 12, color: 'black', textAlign: 'center' }}> ID</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: width / 3, color: 'black', textAlign: 'center' }}> N° Compteur</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: width / 3, color: 'black', textAlign: 'center' }}> N° Tourne</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: 5 * width / 12, color: 'black', textAlign: 'center' }}> Adresse</Text>
        </View>

      </View>
    );
  }

  const ItemRender = ({ numeroCompteur,codeSecteur, compteurId, idGeographique, police, codeEtat, adress, index, codeFluide, ancienIndex, consMoyenne,nomAbonne,etatLecture,consommation }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('pagelecture', {
          numeroCompteur: numeroCompteur,
          idGeographique: idGeographique,
          police: police,
          adresse: adress,
          codeEtat: codeEtat,
          codeFluide: codeFluide,
          consMoyenne: consMoyenne,
          ancienIndex: ancienIndex,
          nomAbonne: nomAbonne,
          etatLecture: etatLecture,
          consommation: consommation,
        });
      }}
      key={index} style={[styles.item, index % 2 && { backgroundColor: '#D0C9C0' }]}>
      <Text style={{ fontSize: 17, color: 'black', width: width / 12, textAlign: 'center' }}>{compteurId}</Text>
      <Text style={{ fontSize: 17, color: 'black', width: width / 3, textAlign: 'center' }}>{numeroCompteur}</Text>
      <Text style={{ fontSize: 17, color: 'black', width: width / 3, textAlign: 'center' }}>{codeSecteur}</Text>
      <Text style={{ fontSize: 14, color: 'black', width: width, textAlign: 'center' }}>{adress}</Text>

    </TouchableOpacity>
  );
  const ItemDivider = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B", }} />
    );
  }

  const onChangeSearch = (term)=>{
    setTermSearch(term)
    //console.log('Term',term)
  }

  useEffect(()=>{
    
  })

  return (
    <FormContainer  >
      <FormControle width='99%' marginV='1px' >
        <FormInput>
          {
            termSearch != '' ? (
              <Icone1 width='50px' onPress={() => setTermSearch('')} >
                <Ionicons name='md-close-circle-outline' size={30} color={'rgba(255,255,255,0.7)'} />
              </Icone1>
            ) : (
              <Icone1 width='50px' >
                <MaterialCommunityIcons name="gesture-two-double-tap" size={30} style={{ transform: [{ rotate: '90deg' }] }} color="rgba(255,255,255,0.7)" />
              </Icone1>
            )
          }

          <InputFild width='100%' paddingH='37px'
            //returnKeyType='search'
            value={termSearch}
            onChangeText={(term) => onChangeSearch(term)}
            placeholder='Recherche numero compteur'
            placeholderTextColor='gray'
          />
          <Icone width='50px'>
            <Ionicons name='search' size={30} color={'rgba(255,255,255,0.7)'} />
          </Icone>
        </FormInput>
      </FormControle>
      <Text style={{ backgroundColor:'green',fontSize: 18, fontWeight: 'bold', width: '100%', color: 'white', height: 32, paddingVertical: 3, textAlign: 'center' }}>Liste des compteurs à lire {compteurs.length}/{datas.length} </Text>

      {/* la liste des compteurs non compteurId */}

      <View style={{ width: width,marginBottom:70 }} >
      <ScrollView  showsVerticalScrollIndicator={false}>
        <ScrollView horizontal={true} bounces={false}>
          <FlatList
            data={compteursSearch}
            renderItem={({ item, index }) => <ItemRender index={index}
              idGeographique={item.idGeographique}
              police={item.police}
              numeroCompteur={item.numeroCompteur}
              compteurId={item.compteurId}
              codeSecteur={item.codeSecteur}
              codeEtat={item.codeEtat}
              adress={item.adresse}
              ancienIndex={item.ancienIndex}
              consMoyenne={item.consMoyenne}
              nomAbonne={item.nomAbonne}
              etatLecture={item.etatLecture}
              consommation={item.consommation}
              codeFluide={item.codeFluide} />}
            keyExtractor={item => item.compteurId}
            ItemSeparatorComponent={ItemDivider}
            ListHeaderComponent={FlatList_Header}
            ListHeaderComponentStyle={{ borderBottomWidth: 2 }}
          />

        </ScrollView>
        </ScrollView>
      </View>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 2,
    minHeight: 35
  }
}) 