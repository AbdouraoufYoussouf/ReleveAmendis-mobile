import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { View,useWindowDimensions } from "react-native"

const MyLoader = (props) => {
  const { height, width } = useWindowDimensions();
  //console.log('width',width*50/100)
  const debut = 3;
  const fin = width - 3;
  return(

    <View style={{ backgroundColor: '#A0522D', paddingTop: 3 }}>
      <ContentLoader speed={1} backgroundColor='#333' foregroundColor='#999'>
        {/* button detail et  annuler */}
        <Rect x={width-123} y="361" rx="3" ry="3" width="120" height="40" />
        <Rect x="3" y="361" rx="3" ry="3" width="120" height="40" />
        {/* Anomalmie 2 */}
        <Rect x='73' y="313" rx="3" ry="3" width={(width/5)*3.5} height="40" />
        <Rect x="3" y="313" rx="3" ry="3" width="60" height="40" />
        {/* Anomalmie 1 */}
        <Rect x='73' y="262" rx="3" ry="3" width={(width/5)*3.5} height="40" />
        <Rect x="3" y="262" rx="3" ry="3" width="60" height="40" />
        {/* Index */}
        <Rect x={width-93} y="213" rx="3" ry="3" width="90" height="40" />
        <Rect x='73' y="213" rx="3" ry="3" width={width*50/100} height="40" />
        <Rect x="3" y="213" rx="3" ry="3" width="60" height="40" />
        {/* idGeo */}
        <Rect x='73' y="164" rx="3" ry="3" width={width*50/100} height="40" />
        <Rect x="3" y="164" rx="3" ry="3" width="60" height="40" />
        {/* numero compteur */}
        <Rect x={width-width*12/100-3} y="115" rx="3" ry="3" width={width*12/100} height="40" />
        <Rect x={width-(width*12/100*2)-12} y="115" rx="3" ry="3" width={width*12/100} height="40" />
        <Rect x='73' y="115" rx="3" ry="3" width={width*50/100} height="40" />
        <Rect x="3" y="115" rx="3" ry="3" width='60' height="40" />
        {/* button suivant et precedent */}
        <Circle cx={width-28} cy="90" r="18" />
        <Circle cx="28" cy="90" r="18" />
        {/* h1 */}
        <Rect x={width/5} y="45" rx="3" ry="3" width={(width/5)*3} height="37" />
        {/* Search */}
        <Rect x="3" y="0" rx="3" ry="3" width="98%" height="40" />

      </ContentLoader>

    </View>
  )
} 

export default MyLoader