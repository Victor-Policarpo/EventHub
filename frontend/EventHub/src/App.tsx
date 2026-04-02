import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import { AppRoutes } from './routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-sans text-sm font-medium border rounded-2xl p-4 shadow-lg',
              duration: 4000,
              success: {
                style: {
                  background: '#f0fdf4',
                  borderColor: '#bbf7d0',
                  color: '#166534',
                },
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  background: '#fef2f2',
                  borderColor: '#fecaca',
                  color: '#991b1b',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
              loading: {
                style: {
                  background: '#fffbeb',
                  borderColor: '#fef3c7',
                  color: '#92400e',
                }
              }
            }}
          />
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;