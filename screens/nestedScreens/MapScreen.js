import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route: { params } }) {
  // console.log("MapScreen", qwe.route.params.location);
  console.log("MapScreen", params);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          // latitude: 50.4796737,
          // longitude: 30.617845,
          latitude: params.location.latitude,
          longitude: params.location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          title="Travel photo"
          coordinate={{
            // latitude: 50.4796737,
            // longitude: 30.617845,
            latitude: params.location.latitude,
            longitude: params.location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
