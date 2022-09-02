import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

export const Logo = styled.Image`
    width: 160px;
    height: ${props => props.height || '100px'};
    align-self: center;
    justify-content: center;
    align-items: center;
    margin: 0px;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: #155e75;
  margin-top: 20px;
  font-weight: bold;
`;
export const ParaTitle = styled.Text`
  font-size: 19px;
  color: gray;
  margin:0px 10px ;
`;

export const Form = styled.View`
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
`;
export const FormControle = styled.View`
    display: flex;
    width: 85%;
    height: 60px;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`;
export const Label = styled.Text`
    font-size: 19px;
    font-weight:bold;
    opacity: 0.5;
    color: black;
    align-self: flex-start;
    margin:3px 0px 1px 0px;
    `;
export const FormInput = styled.View`
    width: 100%;
    background-color: #465881;
    border-radius: 5px;
    align-items: center;
    display: flex;
    padding: 0px 5px;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`;

export const InputFild = styled.TextInput.attrs(props => ({
    secureTextEntry : props.secureTextEntry,onChangeText:props.onChangeText,
    placeholderTextColor : 'rgb(128, 128, 128)',value:props.value,defaultValue:props.defaultValue,
}))`
    color: 'rgba(255,255,255,0.7)';
    height: 42px;
    width: 100%;
    padding:1px 5px;
    border-radius: 5px;
    font-size: 20px;
`;
export const Icone = styled.TouchableOpacity.attrs(props => ({
    onPress : props.onPress
}))`
    position: absolute;
    right: -2px;
    top: ${(props)=>props.top || '4px'};
    width: ${(props)=>props.width || '34px'};
    height: auto;
    z-index: 10;
    //background-color: #000;
    align-items: center;
`;
export const Icone1 = styled.TouchableOpacity.attrs(props => ({
    onPress : props.onPress
}))`
    position: absolute;
    left: -7px;
    top: ${(props)=>props.top || '4px'};
    width: ${(props)=>props.width || '34px'};
    height: auto;
    z-index: 10;
    //background-color: #000;
    align-items: center;
`;

export const MyTouchableOpacity = styled.TouchableOpacity.attrs(props => ({
    onPress : props.onPress
}))`
    margin-right: 30px;
    align-self: flex-end;
`;
export const Text = styled.Text`
    font-size: ${(props)=>props.size || '15px'};
    color: ${(props)=>props.color || 'white'};
`;

export const FormTouchable = styled.TouchableHighlight`
    width: ${(props)=>props.width || '99%'};
    max-height: 75px;
    flex-direction: row;
    margin: ${(props)=>props.marginV || '5px'} 0;
    justify-content: space-between;
`;
