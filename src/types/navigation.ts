import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Calendar: undefined;
  ToDo: undefined;
  Profile: undefined;
  Notifications: undefined;
  Requirements: undefined;
  Dues: undefined;
  Explore: undefined;
  YourEvents: undefined;
  SignUp: undefined;
  CreateEvent: undefined;
  CreateEventDetails: undefined;
  CreateEventLogistics: { title: string; description: string; category: string };
  EventPreview: undefined;
  EventAttendees: { eventId: string };
  EventDetails: { eventId: string; source?: string };
  CreateTask: undefined;
  TaskDetail: { taskId: string };
  MemberProfile: { memberId: string };
  RedeemPoints: undefined;
  SisterPoints: undefined;
  Birthdays: undefined;
  NotFound: undefined;
  RequirementDetails: { requirementId: string };
  EditEvent: { eventId: string };
  EventAttendance: { eventId: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 