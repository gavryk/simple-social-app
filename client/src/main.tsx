import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SocketProvider } from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Router>
		<Provider store={store}>
			<SocketProvider>
				<App />
			</SocketProvider>
		</Provider>
	</Router>,
);
