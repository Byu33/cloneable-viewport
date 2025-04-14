import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@/types/navigation';

type IconName = keyof typeof Feather.glyphMap;

const TabBar = () => {
  const navigation = useNavigation<NavigationProp>();

  const tabs = [
    { name: 'Home', icon: 'home' as IconName },
    { name: 'Calendar', icon: 'calendar' as IconName },
    { name: 'Tasks', icon: 'check-square' as IconName },
    { name: 'Profile', icon: 'user' as IconName },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => navigation.navigate(tab.name as keyof NavigationProp['navigate'])}
        >
          <Feather name={tab.icon} size={24} color="#000000" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 20, // Add padding for safe area
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
});

export default TabBar;
