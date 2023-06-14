import React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { isOffTabBarOnSomeScreens } from "../../redux/auth/authReducer";
import { useDispatch } from "react-redux";

export default function MapScreen({ route: { params } }) {
  // console.log("MapScreen", params);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isOffTabBarOnSomeScreens(true));

    return () => {
      dispatch(isOffTabBarOnSomeScreens(false));
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: params.location.latitude,
          longitude: params.location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          title="Travel photo"
          coordinate={{
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
