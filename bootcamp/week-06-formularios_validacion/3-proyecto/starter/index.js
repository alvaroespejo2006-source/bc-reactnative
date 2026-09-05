import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// También se asegura de que el entorno esté configurado correctamente ya sea
// que cargues la app en Expo Go o en un build nativo.
registerRootComponent(App);
