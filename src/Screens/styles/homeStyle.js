import styled from 'styled-components/native';

export const Form = styled.View`
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
    margin-top: ${(props) => props.marginTop || 'auto'};
`;
export const FormContainer = styled.View`
    flex:1;
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
    margin-top: ${(props) => props.marginTop || 'auto'};
`;
export const FormControle = styled.View`
    width: ${(props) => props.width || '99%'};
    max-height: 75px;
    flex-direction: row;
    margin: ${(props) => props.marginV || '5px'} 0;
    padding: ${(props) => props.paddingH || '3px'};
    justify-content: space-between;
    
`;

export const FormInput = styled.View`
    border-radius: 5px;
    flex-direction: row;
    width: ${(props) => props.width || 'auto'};
`;

export const Label = styled.Text`
    margin-top:5px ;
    font-size: ${props => props.fontZise || '19px'};
    border-radius: 5px;
    height: 35px;
    text-align: ${props => props.textAlign ? 'center' : 'left'};
    color: ${props => props.color || 'black'};
    margin-left: ${props => props.marginLeft || '3px'};
    background-color:${props => props.bg || '0'};
    width: ${(props) => props.minWidth || '60px'};
`;
export const MyButtonContainer = styled.View`
    min-height:${(props) => props.height ? '40px' : '33px'};
    padding-top: ${(props) => props.paddingTop || '1px'};
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.bg || '0'};
    width: ${(props) => props.width || '50px'};
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const MyButton = styled.Text`
    font-size: ${(props) => props.fontSize || '20px'};
    color: ${(props) => props.color || 'black'};
    min-height:${(props) => props.height ? '40px' : '33px'};
    width: ${(props) => props.width || '50px'};   
     text-align: center;
    padding-top: ${(props) => props.paddingTop || '1px'};
    background-color: ${(props) => props.bg || '0'};
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    
`;
export const MyText = styled.Text`
    color: ${(props) => props.color || '#000'};
    margin-top: ${(props) => props.marginTop || '0px'};  
    align-self: center;
    align-items: center;
    width: ${(props) => props.width || 'auto'}; 
    margin:0 ${(props) => props.marginH || 'auto'};
    

    ${({ title, large, small, minTitle }) => {
        switch (true) {
            case title:
                return 'font-size : 32px'

            case large:
                return 'font-size : 19px'

            case minTitle:
                return 'font-size : 22px'

            case small:
                return 'font-size : 15px'
        }
    }}
    ${({ bold, heavy }) => {
        switch (true) {
            case bold:
                return 'font-weight : bold'

            case heavy:
                return 'font-weight : 700'
        }
    }}
    
`;

export const InputFild = styled.TextInput.attrs(props => ({
    secureTextEntry: props.secureTextEntry, onChangeText: props.onChangeText,
    placeholderTextColor: props.placeholderTextColor, value: props.value
}))`
    color: 'rgba(255,255,255,0.7)';
    height: 40px;
    min-width: ${(props) => props.width || '80%'};
    padding:1px ${(props) => props.paddingH || '5px'};
    border-radius: 5px;
    font-size: 20px;
    background-color:  #465881;
    
`;

