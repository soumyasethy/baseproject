import {NavigationNativeContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Surveys from '../screens/Surveys';
import TakeSurvey from '../screens/TakeSurvey';
import {pageType} from './pageType';
import {navigationRef, isMountedRef} from './RootNavigator';
import {ActivityIndicator, StyleSheet, View, YellowBox} from 'react-native';
import {inject, observer} from 'mobx-react';
import {storeType} from '../store/storeType';

import {_retrieveData} from 'component-library';
import {AuthContext} from '../context/MyContext';

const Stack = createStackNavigator();
export const Navigator = props => {
  const {setToken} = React.useContext(AuthContext);

  React.useEffect(() => {
    isMountedRef.current = true;
    YellowBox.ignoreWarnings([
      'Warning: componentWill',
      'Warning: Async Storage',
      'Warning: Each',
      'VirtualizedLists',
      'Warning: Functions',
    ]);
    return () => (isMountedRef.current = false);
  }, []);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function init() {
      // Network.SetupInterceptor();
      setLoading(true);
      const userToken = props.userStore.token; //await _retrieveData.getItem('token');
      console.warn('userToken->', userToken);
      if (!!userToken) {
        props.userStore.setToken(userToken);
      }
      setLoading(false);
    }
    init();
  }, [props.userStore.token]);
  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationNativeContainer ref={navigationRef}>
      <AppNavigator {...props} token={props.userStore.token} />
    </NavigationNativeContainer>
  );
};
export default inject(storeType.userStore)(observer(Navigator));

const AppNavigator = props => {
  return (
    <Stack.Navigator initialRouteName={pageType.Surveys}>
      {!props.token ? (
        <Stack.Screen name={pageType.Login} component={Login} />
      ) : (
        <Stack.Screen
          name={pageType.Surveys}
          component={Surveys}
          // options={{
          //   title: 'Surveys',
          //   animationTypeForReplace: /*state.isSignout ? 'pop' : */ 'push',
          // }}
        />
      )}
      <Stack.Screen
        name={pageType.TakeSurvey}
        component={TakeSurvey}
        // options={{
        //   title: 'Take Survey',
        //   animationTypeForReplace: 'pop', // /*state.isSignout ? 'pop' : */ 'push',
        // }}
      />
    </Stack.Navigator>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
