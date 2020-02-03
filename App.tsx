import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </>
  );
};
export default App;
