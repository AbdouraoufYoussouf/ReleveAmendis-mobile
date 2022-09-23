import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { isInsertAnomalie, notIsInsertAnomalie } from '../../../services/redux/anomalieSlice';
import { isInsertCompteur, NotIsInsertCompteur } from '../../../services/redux/compteurSlice';
import { isInsertFluide, NotIsInsertFluide } from '../../../services/redux/rueSecteurSlice';
import { isInsertTerminal, NotisCreatecTerminal, NotIsInsertTerminal } from '../../../services/redux/terminalSlice';
import { isInsertTourne, NotIsInsertTourne } from '../../../services/redux/tourneSlice';
import { deleteAllAnomalies, deleteAllFluides, deleteAllTerminal, getAllTerminal, InsertAnomalies, InsertFluides, InsertTerminal } from './AddDataDbDistant';

export const HomeAdmin = () => {
  const dispatch = useDispatch()
  //const allUsers = useSelector((state) => state.users.users)
  const allFluides = useSelector((state) => state.anomalies.fluides)
  const isInsertFlu = useSelector((state) => state.rueSecteurs.isInsert)
  const allTerminals = useSelector((state) => state.terminals.terminals)
  const terminalLocal = useSelector((state) => state.terminals.terminalLocal)
  const isInsertTer = useSelector((state) => state.terminals.isInsert)
  const allAnomalies = useSelector((state) => state.anomalies.anomalies)
  const isInsertAnom = useSelector((state) => state.anomalies.isInsert)
  const allTournes = useSelector((state) => state.tournes.tournes)
  const isInsertT = useSelector((state) => state.tournes.isInsert)
  const isInsertC = useSelector((state) => state.compteurs.isInsert)
  const allCompteurs = useSelector((state) => state.compteurs.compteurs)

  const [isInsertComp, setIsComisInsertComp] = useState(false);
  const [isInsertTour, setIsIisInsertTour] = useState(false);
  const [isInsertAnomali, setIsIisInsertAnomali] = useState(false);
  const [isInsertTerm, setIsInseisInsertTerm] = useState(false);
  const [isInsertFluid, setIsInfisInsertFluid] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
console.log('anomalies:',allAnomalies)
  // const toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  // }
  function toogleAnomalie() {
    //setIsIisInsertAnomali(previousState => !previousState);
    if (allAnomalies.length > 0) {
      setIsIisInsertAnomali(true)
    } else {
      setIsIisInsertAnomali(false)
      
    }
  }
  function toogleFluide() {
    //setIsInfisInsertFluid(previousState => !previousState);
    if (allFluides.length > 0) {
        setIsInfisInsertFluid(true)
      } else {
      setIsInfisInsertFluid(false)
    }
  }
  function toogleTerminal() {
    
    if (allTerminals.length > 0) {
      setIsInseisInsertTerm(true);
    } else {
      setIsInseisInsertTerm(false);
    }
  }
  function toogleTourne() {
    
    if (allTournes.length > 0) {
      setIsIisInsertTour(true);
    } else {
      setIsIisInsertTour(false);
    }
  }

  function toogleCompteur() {
    if (allCompteurs.length > 0) {
      setIsComisInsertComp(true)
    } else {
      setIsComisInsertComp(false)
    }
  }

  const handleSwitchAnomalie = () => {
    // dispatch(notIsInsertAnomalie())
    if (allAnomalies.length <= 0) {
    //  InsertAnomalies(dispatch)
    }
  }
  const handleSwitchFluide = () => {
    if (allFluides.length <= 0) {
     // InsertFluides(dispatch)

    }
  }
  const handleSwitchTerminal = () => {
    if (allTerminals.length <= 2) {
     // InsertTerminal(dispatch)

    }
  }
  const handleSwitchTourne = () => {
    if (allTournes.length <= 0) {
      console.log('pas de tourne ')

    }
  }
  const handleSwitchCompteur = () => {
    if (allTournes.length <= 0) {
      console.log('pas de compteur ')

    }
  }
  const handleDeleteFluide = () => {
    deleteAllFluides(dispatch)
    dispatch(NotIsInsertFluide())
  }
  const handleDeleteAnomalie = () => {
    deleteAllAnomalies(dispatch)
    dispatch(notIsInsertAnomalie())
  }

  const handleDeleteTerminal = () => {
    deleteAllTerminal(dispatch)
    dispatch(NotIsInsertTerminal())
  }


  useEffect(() => {
    toogleAnomalie()
    toogleFluide()
    toogleTerminal()
    toogleTourne()
    toogleCompteur()
  }, [])

  console.log("termianllocal",terminalLocal)

  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.collection}>Anomalies</Text>
          <Text style={styles.data}>{allAnomalies.length} Anomalies</Text>
        </View>
        <View style={styles.right}>

          <TouchableOpacity >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isInsertAnomali ? "green" : "#f4f3f4"}
              onValueChange={handleSwitchAnomalie}
              value={isInsertAnomali}

              style={{ marginLeft: 12, }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAnomalie} style={{ marginLeft: 15 }}>
            <MaterialCommunityIcons name="delete-outline" size={30} color="tomato" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.collection}>Fluides</Text>
          <Text style={styles.data}>{allFluides.length} Fluides</Text>
        </View>
        <View style={styles.right}>

          <TouchableOpacity >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isInsertFluid ? "green" : "#f4f3f4"}
              onValueChange={handleSwitchFluide}
              value={isInsertFluid}

              style={{ marginLeft: 12, }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteFluide} style={{ marginLeft: 15 }}>
            <MaterialCommunityIcons name="delete-outline" size={30} color="tomato" />
          </TouchableOpacity>
        </View>

      </View>
      {/* <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.collection}>Terminals</Text>
          <Text style={styles.data}>{allTerminals.length} Terminals</Text>
        </View>
        <View style={styles.right}>

          <TouchableOpacity >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isInsertTerm ? "green" : "#f4f3f4"}
              onValueChange={handleSwitchTerminal}
              value={isInsertTerm}

              style={{ marginLeft: 12, }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteTerminal} style={{ marginLeft: 15 }}>
            <MaterialCommunityIcons name="delete-outline" size={30} color="tomato" />
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.collection}>Compteurs</Text>
          <Text style={styles.data}>{allCompteurs.length} Compteurs</Text>
        </View>
        <View style={styles.right}>

          <TouchableOpacity >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isInsertComp ? "green" : "#f4f3f4"}
              onValueChange={toogleCompteur}
              value={isInsertComp}

              style={{ marginLeft: 12, }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <MaterialCommunityIcons name="delete-outline" size={30} color="tomato" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.collection}>Tournés</Text>
          <Text style={styles.data}>{ allTournes.length} Tournés</Text>
        </View>
        <View style={styles.right}>

          <TouchableOpacity >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isInsertTour ? "green" : "#f4f3f4"}
              onValueChange={toogleTourne}
              value={isInsertTour}

              style={{ marginLeft: 12, }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <MaterialCommunityIcons name="delete-outline" size={30} color="tomato" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.collection}>Utilisateurs</Text>
          <Text style={styles.data}>3 Utilisateurs</Text>
        </View>
    
      </View> */}

    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#444',
    flexDirection: 'column',
    alignItems: 'center'
  },
  body: {
    width: '95%',
    padding: 5,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,

  },
  left: {
    width: "70%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  right: {
    width: "30%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  collection: {
    marginVertical: 3,
    fontSize: 20,
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold'
  },
  data: {
    fontSize: 18,
    color: 'white',
    marginRight: 10
  },
  switch: {
    fontSize: 18,
    color: 'white',
  },
  delete: {
    fontSize: 18,
    color: 'white',
  },

});