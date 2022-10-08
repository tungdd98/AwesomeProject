/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NativeRouter, Route, Routes} from 'react-router-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import PostDetail from './src/components/PostDetail/PostDetail';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <NativeRouter>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Routes>
          <Route exact path="/" element={<PostDetail />} />
          <Route path="*" element={() => <div>Not found</div>} />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
};

export default App;
