import { Provider } from "react-redux"
import App from "./App"
import { store } from "./services/redux/Store"

export const AppWrapper = () => {
  
    return (
      <Provider store={store}> 
        <App />
      </Provider>
    )
  }