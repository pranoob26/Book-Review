import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { firestore } from "../firebase";
import { useAuth } from "../AuthContext";
// import email from "./LoginScreen" // Assuming firebase.js is in the same directory

const ReviewScreen = ({ route }) => {
  const { bookId } = route.params;
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const { userEmail } = useAuth();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = firestore
          .collection("Books")
          .doc(bookId)
          .collection("reviews");
        const snapshot = await reviewsRef.get();
        const reviewsData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            message: doc.data().Message,
            email: doc.data().Email,
          };
        });
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [bookId]);

  const addReview = async () => {
    try {
      await firestore
        .collection("Books")
        .doc(bookId)
        .collection("reviews")
        .add({
          Message: reviewText,
          Email: userEmail, // You can replace this with actual user's email
        });
      setReviewText(""); // Clear input after adding review
      // You can also fetch reviews again to update the list
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.rmessage}>{item.email}</Text>
            <Text style={styles.remail}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No reviews found</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={reviewText}
          onChangeText={(text) => setReviewText(text)}
          placeholderTextColor="black"
          placeholder="Write your review"
        />
        <Button title="Send" onPress={addReview} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5D9C3",
  },
  reviewItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F5AC72",
    borderRadius: 10,
    height: 80,
  },
  rmessage: {
    width: "100%",
    color: "black",
    fontSize: 20,
  },
  remail: {
    width: "100%",
    color: "black",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 60,
    fontSize: 20,
  },
});

export default ReviewScreen;
