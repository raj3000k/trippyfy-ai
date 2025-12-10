import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CreateTripContext } from "@/context/CreateTripContext";
import moment from "moment";
import { normalize } from "@/utils/Responsive";
export default function ReviewTrip() {
  const tripContext = useContext(CreateTripContext);
  const { tripData, setTripData } = tripContext;
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", padding: 25}}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"black"} size={30} />
      </TouchableOpacity>
      <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(36), marginTop: 25 }}>
        Review your trip
      </Text>
      <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(22), marginTop: 25 }}>
        Please review your selection before generating your trip
      </Text>
      <ScrollView style={{overflow:'scroll',height:'100%'}}>
      <View
        style={{
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          marginTop: 25,
          alignItems: "center",
          height: "auto",
        }}
      >
        <Text style={{ fontSize: normalize(32) }}>📍</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: 20,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#808080", fontSize: normalize(20) }}
          >
            Destination
          </Text>
          {tripData && tripData.destinationInfo && (
            <Text
              style={{
                fontFamily: "outfit-bold",
                color: "black",
                fontSize: normalize(20),
              }}
            >
              {tripData.destinationInfo.name}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Text style={{ fontSize: normalize(32) }}>📆</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: 20,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#808080", fontSize: normalize(20) }}
          >
            Travel Date
          </Text>
          <Text
            style={{ fontFamily: "outfit-bold", color: "black", fontSize: normalize(20) }}
          >
            {moment(tripData.startDate).format("DD MMM") +
              " To " +
              moment(tripData.endDate).format("DD MMM")}{" "}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Text style={{ fontSize: normalize(32) }}>🚌</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: 20,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#808080", fontSize: normalize(20) }}
          >
            Travellers
          </Text>
          <Text
            style={{ fontFamily: "outfit-bold", color: "black", fontSize: normalize(20) }}
          >
            {tripData.travellerInfo.title}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Text style={{ fontSize: normalize(32) }}>💰</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: 20,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#808080", fontSize: normalize(20) }}
          >
            Budget
          </Text>
          <Text
            style={{ fontFamily: "outfit-bold", color: "black", fontSize: normalize(20) }}
          >
            {tripData.budget}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: "50%",
          backgroundColor: "black",
          height: "auto",
          padding: 18,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          alignSelf: "center",
        }}
        onPress={() => {
          router.push("/create-trip/TripLoading");
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "outfit-bold", fontSize: normalize(16) }}
        >
          ✦ Generate My Trip
        </Text>
      </TouchableOpacity>
      </ScrollView>
      
    </SafeAreaView>
  );
}
