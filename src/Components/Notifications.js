import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export const ToastSuccess = (title) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'success',
    textBody: title,
    autoClose: 3000,

  })
}
export const ToastEchec = (title) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: 'Echec',
    textBody: title,
    autoClose: 3000,

  })
}
export const ToastAvertisement = (title) => {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    title: 'Avertissement',
    textBody: title,
    autoClose: 5000,

  })
}