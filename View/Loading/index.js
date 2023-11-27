
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
    <Image source={require("../../assets/logo.png")} style = {{width: 180, height: 60}}
      />
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
