import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface CalendarViewProps {
  isExpanded: boolean;
  title: string;
  onToggleExpand: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  isExpanded,
  title,
  onToggleExpand,
}) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={onToggleExpand}
      >
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#000000"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.calendar}>
          <View style={styles.weekDays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.days}>
            {daysInMonth.map((day) => (
              <View
                key={day.toISOString()}
                style={[
                  styles.day,
                  isSameDay(day, today) && styles.today,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSameDay(day, today) && styles.todayText,
                  ]}
                >
                  {format(day, 'd')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  calendar: {
    marginTop: 16,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  day: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  today: {
    backgroundColor: '#000000',
  },
  dayText: {
    fontSize: 14,
    color: '#000000',
  },
  todayText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default CalendarView;
