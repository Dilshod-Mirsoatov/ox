import '../styles/index.scss';
import Store from '../store';
import {Provider} from "react-redux";
import Toast from "../components/Toast";
function MyApp({ Component, pageProps }) {

  return  <Provider store={Store}>
            <Component {...pageProps} />
            <Toast/>
          </Provider>
}

export default MyApp
