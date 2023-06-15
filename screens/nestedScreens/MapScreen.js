import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { isOffTabBarOnSomeScreens } from "../../redux/auth/authReducer";

export default function MapScreen({ route: { params } }) {
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
