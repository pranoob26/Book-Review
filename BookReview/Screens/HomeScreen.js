import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../firebase"; // Assuming firebase.js is in the same directory
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore.collection("Books").get();
        const booksData = [];
        querySnapshot.forEach((doc) => {
          const { Name, Author, Photo } = doc.data();
          booksData.push({
            id: doc.id,
            name: Name,
            author: Author,
            photo: Photo,
          });
        });
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBookPress = (book) => {
    navigation.navigate("Bookdetails", { bookId: book.id });
  };

  const renderBookItem = ({ item }) => (
    <Pressable style={styles.bookItem} onPress={() => handleBookPress(item)}>
      <Image source={{ uri: item.photo }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
    </Pressable>
  );

  // Function to filter books based on search query
  const filteredBooks = books.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={require("../assets/amihome.jpg")}
      style={styles.backimg}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="white"
          placeholder="Search by book name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <View style={styles.flcont}>
          <FlatList
            data={filteredBooks}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.navigationtab}>
          <Pressable
            style={styles.tab}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <FontAwesome
              name="home"
              style={styles.icons}
              size={30}
            ></FontAwesome>
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => {
              navigation.navigate("Maps");
            }}
          >
            <FontAwesome
              name="map-pin"
              style={styles.icons}
              size={30}
            ></FontAwesome>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backimg: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  flcont: {
    width: "100%",
    borderRadius: 20,
    paddingBottom: 50,
    marginTop: 50,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    width: "100%",
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
  },
  bookImage: {
    width: 80,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    width: "100%",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#888",
  },
  navigationtab: {
    width: "90%",
    backgroundColor: "orange",
    height: 65,
    position: "absolute",
    top: 700,
    borderRadius: 50,
    left: "5%",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  tab: {
    width: "50%",
    alignItems: "center",
    color: "white",
  },
  searchInput: {
    position: "absolute",
    top: 30,
    zIndex: 1,
    width: "90%",
    backgroundColor: "#E66D0F",
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 0,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "white",
  },
});

export default HomeScreen;
