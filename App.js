import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './RootNavigator';

const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
