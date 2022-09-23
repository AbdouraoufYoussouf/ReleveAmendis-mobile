import { isInsertAnomalie, setAnomalies, setFluides } from "../../../services/redux/anomalieSlice"
import { isInsertFluide } from "../../../services/redux/rueSecteurSlice"
import axios from 'axios';
import { ToastAndroid } from "react-native";
import baseUrl from "../../../services/TerminalService";
let axiosConfig = {
  headers: {
    'accept': 'text/plain',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
};
export const InsertTerminal = (dispatch)=>{
    const terminals = [
      {"terminalNumber": "TPL1"},
      {"terminalNumber": "TPL2"},
      {"terminalNumber": "TPL3"},
  ]
  terminals.map((terminal)=>{
    axios.post(baseUrl+'Terminal', terminal, axiosConfig)
    .then((res) => {
      console.log( 'Terminals Ajouté avec succés',res)
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  })
  }
  
  export const InsertAnomalies = (dispatch) => {
    let data = [
      { "designation": "RELEVE SANS ANOMALIE", "libele": "RELEVE SANS","codeFluide": "TT" },
      {  "designation": "ADRESSE ERRONEE", "libele": "ADRES ERRO", "codeFluide": "TT"},
      {
        "designation": "COMPTEUR ABANDONN", "libele": "CPT ABANDO","codeFluide": "TT" },
      {
        "designation": "CONSO ANORMALE VERIFIEE",  "libele": "CONS VERI", "codeFluide": "TT"},
      {
        "designation": "FRAUDE",    "libele": "FRAUDE",  "codeFluide": "TT" },
      {  "designation": "FUITE", "libele": "FUITE", "codeFluide": "TT" },
      {"designation": "COMPTEUR BLOQUE", "libele": "CPT BLOQUE","codeFluide": "TT"},
      {
        "designation": "COMPTEUR MAL POSE","libele": "CPT M POSE",  "codeFluide": "TT"},
      {
        "designation": "COMPTEUR NO LU","libele": "CPT NON LU", "codeFluide": "TT"},
      {
        "designation": "COMPTEUR TOURNE ENVERS",  "libele": "CPT T ENVE",  "codeFluide": "TT" },
      {
        "designation": "COMPTEUR FAIT DU BRUIT","libele": "CPT BRUIT", "codeFluide": "TT"},
      {
        "designation": "INDEX ILLISIBLE","libele": "INDEX ILLI","codeFluide": "TT" },
      {
        "designation": "COMPTEUR CASS", "libele": "CPT CASSE", "codeFluide": "TT" },
      {
        "designation": "COMPTEUR BRULE",
        "libele": "CPT BRULE",
        "codeFluide": "TT"
      },
      {
        "designation": "CPT SANS ROBINET TC",
        "libele": "CPT SS RTC",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR ENTERRE",
        "libele": "CPT ENTER",
        "codeFluide": "TT"
      },
      {
        "designation": "ROUES DECALEES",
        "libele": "ROUE DECAL",
        "codeFluide": "TT"
      },
      {
        "designation": "NUMERO CPT ILLISIBLE",
        "libele": "NO CPT ILL",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR SANS CACHE BORNE",
        "libele": "CPT SS CB",
        "codeFluide": "TT"
      },
      {
        "designation": "SALLE CPTAGE INACCESSIBLE",
        "libele": "SCPT INACC",
        "codeFluide": "TT"
      },
      {
        "designation": "BOBINE CHANGE TARIF BRULE",
        "libele": "BOB CT BRU",
        "codeFluide": "TT"
      },
      {
        "designation": "HORLOGE DECALEE",
        "libele": "HORL DACAL",
        "codeFluide": "TT"
      },
      {
        "designation": "CONDENSATEUR HORS SERVICE",
        "libele": "CONDENS HS",
        "codeFluide": "TT"
      },
      {
        "designation": "FUSIBLE COMPTAGE BRULE",
        "libele": "FU CPT BRL",
        "codeFluide": "TT"
      },
      {
        "designation": "INDICATEUR MAX DEFECTUEUX",
        "libele": "IMAX DEFEC",
        "codeFluide": "TT"
      },
      {
        "designation": "INDICATEUR MAX AU MAXIMUM",
        "libele": "IMAX MAX",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR REACTIF BLOQUE",
        "libele": "CPTR BLOQ",
        "codeFluide": "TT"
      },
      {
        "designation": "CPT REACTIF TOURNE ENVERS",
        "libele": "CPTR T ENV",
        "codeFluide": "TT"
      },
      {
        "designation": "CHAMP TOURNANT INVERSE",
        "libele": "CHP TR INV",
        "codeFluide": "TT"
      },
      {
        "designation": "PAS AFFICHAGE CPT NUMERIQ",
        "libele": "NO AF CPTN",
        "codeFluide": "TT"
      },
      {
        "designation": "CONFIGURATION NUM EFFACEE",
        "libele": "CONF EFFAC",
        "codeFluide": "TT"
      },
      {
        "designation": "POSTE A ENTRETENIR",
        "libele": "POST ENTRE",
        "codeFluide": "TT"
      },
      {
        "designation": "ABO ABSENT CARTE REPONSE",
        "libele": "ABO ABSENT",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR INACCESSIBLE",
        "libele": "CPT INACCE",
        "codeFluide": "TT"
      },
      {
        "designation": "TRAITE PAR ANALYSE DE REL",
        "libele": "T. ANA REL",
        "codeFluide": "TT"
      },
      {
        "designation": "CARTE REPONSE",
        "libele": "CARTE REPONSE",
        "codeFluide": "TT"
      },
      {
        "designation": "INDEX PAR ABONNE",
        "libele": "INDEX ABO",
        "codeFluide": "TT"
      },
      {
        "designation": "PASSAGE A ZERO",
        "libele": "PSG ZRO",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR POSE A L ENVERS",
        "libele": "CPT BO ENV",
        "codeFluide": "TT"
      },
      {
        "designation": "FUITE INTERIEURE",
        "libele": "FUITE INT",
        "codeFluide": "TT"
      },
      {
        "designation": "FUITE BRANCHEMENT",
        "libele": "FUITE BRT",
        "codeFluide": "TT"
      },
      {
        "designation": "POSTE INACCESSIBLE",
        "libele": "POSTE INAC",
        "codeFluide": "TT"
      },
      {
        "designation": "Coffré sans couvercle",
        "libele": "COF COV SA",
        "codeFluide": "TT"
      },
      {
        "designation": "Coffré avec couvercle Plastique",
        "libele": "COF COV PL",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR CHANTIER",
        "libele": "CPT CHANT",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEURS INTERVERTIS",
        "libele": "CPT INTERV",
        "codeFluide": "TT"
      },
      {
        "designation": "BRANCHEMENT EN PLOMB",
        "libele": "BRT PLOMB",
        "codeFluide": "TT"
      },
      {
        "designation": "CPT ALIMENTE PLUSIEUR LOG",
        "libele": "CPT X LOG",
        "codeFluide": "TT"
      },
      {
        "designation": "LOCAL VIDE",
        "libele": "LOCAL VIDE",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR TRES HAUT",
        "libele": "CPT T HAUT",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR INTROUVABLE",
        "libele": "CPT INTROU",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR MANIPULE",
        "libele": "CPT MANIP",
        "codeFluide": "TT"
      },
      {
        "designation": "BRANCHEMENT DIRECT",
        "libele": "BRT DIRECT",
        "codeFluide": "TT"
      },
      {
        "designation": "COMPTEUR NON ALIMENTE",
        "libele": "CPT NO ALM",
        "codeFluide": "TT"
      }
    ]
    data.map((item) => {
  
      axios.post(+"Anomalie", item, axiosConfig)
        .then((res) => {
          console.log('Anomalie Ajouté avec succés', res)
          dispatch(setAnomalies(res.data))
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    })
    dispatch(isInsertAnomalie())
  }
  
  
  export const InsertFluides = (dispatch) => {
    let data = [
      { "codeFluide": "EA", "designation": "eau", "filterSup": 90, "filterInf": 60, "filterMax": 50, "filterMin": 75 },
      { "codeFluide": "BT", "designation": "basse tension", "filterSup": 95, "filterInf": 65, "filterMax": 55, "filterMin": 80 },
      { "codeFluide": "MT", "designation": "Moyenne tension", "filterSup": 95, "filterInf": 65, "filterMax": 55, "filterMin": 80 },
      { "codeFluide": "EB", "designation": "eau et basse tension", "filterSup": 95, "filterInf": 65, "filterMax": 55, "filterMin": 80 },
      { "codeFluide": "EM", "designation": "eau et moyenne tension", "filterSup": 95, "filterInf": 65, "filterMax": 55, "filterMin": 80 },
      { "codeFluide": "BM", "designation": "Basse et Moyenne tension", "filterSup": 95, "filterInf": 65, "filterMax": 55, "filterMin": 80 },
      { "codeFluide": "TT", "designation": "Eau,Basse et Moyenne tension", "filterSup": 95, "filterInf": 65, "filterMax": 55, "filterMin": 80 }
    ]
    data.map((item) => {
  
      axios.post(+"Fluide", item, axiosConfig)
        .then((res) => {
          console.log('Fluides Ajouté avec succés', res)
         dispatch(setFluides(res.data))
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    })
    dispatch(isInsertFluide())
}

export const deleteAllFluides = (dispatch) => {
 
    axios.delete(+"Fluide", axiosConfig)
    .then((res) => {
      ToastAndroid.showWithGravityAndOffset(
        "Fluides supprimé avec succés",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        200
      );
        console.log('Fluides supprimé avec succés',res)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  export const deleteAllTerminal = (dispatch) => {

    axios.delete(baseUrl+'Terminal', axiosConfig)
      .then((res) => {
        console.log('Terminals supprimé avec succés', res)
        ToastAndroid.showWithGravityAndOffset(
          "Terminals supprimé avec succés",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          200
        );
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  export const getAllTerminal = (dispatch) => {

    axios.get(baseUrl+'Terminal', axiosConfig)
      .then((res) => {
        console.log('Terminals', res.data)
      
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }


export const deleteAllAnomalies = (dispatch) => {
 
  
  axios.delete(+"Anomalie", axiosConfig)
  .then((res) => {
      console.log( 'Anomalies supprimé avec succés',res)
      ToastAndroid.showWithGravityAndOffset(
        "Anomalies supprimé avec succés",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        200
      );
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
