import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../firebase"; // Assuming firebase.js is in the same directory

const BookDetailsScreen = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRef = firestore.collection("Books").doc(bookId);
        const doc = await bookRef.get();
        if (doc.exists) {
          const { Name, Author, Photo } = doc.data();
          setBook({
            id: doc.id,
            name: Name,
            author: Author,
            photo: Photo,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handlePressReview = () => {
    // Navigate to the Review screen, passing the bookId as a parameter
    navigation.navigate("Review", { bookId: bookId });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {book ? (
          <>
            <Image style={styles.bookpopo} source={{ uri: book.photo }} />
            <Text style={styles.bookTitle}>{book.name}</Text>
            <Text style={styles.bookAuthor}>Author: {book.author}</Text>
            {/* You can add more details here */}
          </>
        ) : (
          <Text>Loading...</Text>
        )}
        <Text style={styles.bookAuthorr}>
          Description:The Subtle Art of Not Giving a F*ck" is a blunt yet
          insightful guide to living a more fulfilling life by embracing
          discomfort and prioritizing what truly matters amidst life's chaos.
          Through humorous anecdotes and unconventional wisdom, it challenges
          conventional self-help tropes, encouraging readers to embrace their
          flaws and pursue meaningful values.
        </Text>
        <Pressable onPress={handlePressReview} style={styles.review}>
          <Text style={styles.reviewtext}>See Reviews</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookpopo: {
    width: "80%",
    height: 500,
    alignSelf: "center",
  },
  bookTitle: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bookAuthor: {
    fontSize: 20,
    color: "#888",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  bookAuthorr: {
    fontSize: 20,
    color: "#888",
    marginBottom: 5,
    textAlign: "left",
    paddingHorizontal: 10,
  },
  review: {
    width: "80%",
    marginHorizontal: "10%",
    backgroundColor: "orange",
    height: 50,
    alignItems: "center",
    borderColor: "black",
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    marginBottom: 25,
  },
  reviewtext: {
    fontSize: 20,
    color: "white",
  },
});

export default BookDetailsScreen;
