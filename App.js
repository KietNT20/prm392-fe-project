import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './RootNavigator';
import store from './store/store';

const queryClient = new QueryClient();
let persistor = persistStore(store);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                  <RootNavigator />
                </SafeAreaView>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
