import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { logEngineInfo } from './utils/hermesTest';
import { colors } from './theme';

// Import screens
import Index from './pages/Index';
import Explore from './pages/Explore';
import YourEvents from './pages/YourEvents';
import EventDetails from './pages/EventDetails';
import SignUpPage from './pages/SignUpPage';
import CreateEventPage from './pages/CreateEventPage';
import CreateEventDetailsPage from './pages/CreateEventDetailsPage';
import CreateEventLogisticsPage from './pages/CreateEventLogisticsPage';
import EventPreviewPage from './pages/EventPreviewPage';
import EventAttendancePage from './pages/EventAttendancePage';
import EditEventPage from './pages/EditEventPage';
import HomePage from './pages/HomePage';
import ToDoPage from './pages/ToDoPage';
import SisterPointsPage from './pages/SisterPointsPage';
import RequirementsPage from './pages/RequirementsPage';
import OtherPage from './pages/OtherPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import TaskDetailPage from './pages/TaskDetailPage';
import CreateTaskPage from './pages/CreateTaskPage';
import DuesPage from './pages/DuesPage';
import CalendarPage from './pages/CalendarPage';
import BirthdaysPage from './pages/BirthdaysPage';
import MembersPage from './pages/MembersPage';
import NotificationsPage from './pages/NotificationsPage';
import EventAttendeesPage from './pages/EventAttendeesPage';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;

  useEffect(() => {
    // Log to verify Hermes is working
    console.log('App started with Hermes engine');
    logEngineInfo();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.background}
        />
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Index" component={Index} />
              <Stack.Screen name="Explore" component={Explore} />
              <Stack.Screen name="YourEvents" component={YourEvents} />
              <Stack.Screen name="EventDetails" component={EventDetails} />
              <Stack.Screen name="SignUp" component={SignUpPage} />
              <Stack.Screen name="CreateEvent" component={CreateEventPage} />
              <Stack.Screen name="CreateEventDetails" component={CreateEventDetailsPage} />
              <Stack.Screen name="CreateEventLogistics" component={CreateEventLogisticsPage} />
              <Stack.Screen name="EventPreview" component={EventPreviewPage} />
              <Stack.Screen name="EventAttendance" component={EventAttendancePage} />
              <Stack.Screen name="EditEvent" component={EditEventPage} />
              <Stack.Screen name="EventAttendees" component={EventAttendeesPage} />
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="ToDo" component={ToDoPage} />
              <Stack.Screen name="TaskDetail" component={TaskDetailPage} />
              <Stack.Screen name="CreateTask" component={CreateTaskPage} />
              <Stack.Screen name="Calendar" component={CalendarPage} />
              <Stack.Screen name="Notifications" component={NotificationsPage} />
              <Stack.Screen name="SisterPoints" component={SisterPointsPage} />
              <Stack.Screen name="Requirements" component={RequirementsPage} />
              <Stack.Screen name="Other" component={OtherPage} />
              <Stack.Screen name="Profile" component={ProfilePage} />
              <Stack.Screen name="Dues" component={DuesPage} />
              <Stack.Screen name="Birthdays" component={BirthdaysPage} />
              <Stack.Screen name="Members" component={MembersPage} />
              <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
