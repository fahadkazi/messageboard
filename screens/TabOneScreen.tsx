import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootTabParamList } from '../types';

const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <TopTab.Navigator>
        <TopTab.Screen name="nearby" component={EditScreenInfo} />
        <TopTab.Screen name="recent" component={EditScreenInfo} />
      </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
