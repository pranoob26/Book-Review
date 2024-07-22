import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { firestore } from "../firebase"; // Import Firestore from firebase.js

const Maps = () => {
  const [bookstores, setBookstores] = useState([]);
  useEffect(() => {
    // Fetch data from Firestore
    const fetchBookstores = async () => {
      try {
        // const bookstoresRef = firestore.collection("BooksStore");
        // const snapshot = await bookstoresRef.get();
        const snapshot = await firestore.collection("BooksStore").get();

        const data = [];
        snapshot.forEach((doc) => {
          const { Latitude, Longitude, Name } = doc.data(); // Assuming Latitude, Longitude, and Name are fields in your document
          data.push({
            id: doc.id,
            latitude: Latitude,
            longitude: Longitude,
            name: Name,
          });
        });
        setBookstores(data);
      } catch (error) {
        console.error("Error fetching bookstores:", error);
      }
    };

    fetchBookstores();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {bookstores.map((bookstore) => (
          <Marker
            key={bookstore.id}
            coordinate={{
              latitude: bookstore.latitude,
              longitude: bookstore.longitude,
            }}
            title={bookstore.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Maps;
