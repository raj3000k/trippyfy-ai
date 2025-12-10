import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { CreateTripContext } from "@/context/CreateTripContext";
import { normalize } from "@/utils/Responsive";

export default function SearchPlace() {
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");
  const [destinationSearchQuery, setDestinationSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (sourceSearchQuery && source !== sourceSearchQuery) {
      setTimeout(() => {
        axios
          .get(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${sourceSearchQuery}&apiKey=38d8db57f54840e98ba4aaf496213da5`
          )
          .then((res: any) => {
            const response = res.data.features;
            const formatted = response.map(
              (item: any) => item.properties.formatted
            );
            setSearchResults(formatted);
          });
      }, 1000);
    }
    if (destinationSearchQuery && destination !== destinationSearchQuery) {
      setTimeout(() => {
        axios
          .get(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${destinationSearchQuery}&apiKey=38d8db57f54840e98ba4aaf496213da5`
          )
          .then((res: any) => {
            const response = res.data.features;
            const formatted = response.map(
              (item: any) => item.properties.formatted
            );
            setSearchResults(formatted);
          });
      }, 1000);
    }

    // console.log(searchResults);
  }, [sourceSearchQuery, destinationSearchQuery]);

  const tripContext = useContext(CreateTripContext);
  const { tripData, setTripData } = tripContext;

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", padding: 25, height: "100%" }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"black"} size={30} />
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(32) }}>Select </Text>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: normalize(32), color: "#808080" }}
        >
          Locations
        </Text>
      </View>
      <TextInput
        placeholder="Search Source"
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: "#808080",
          width: "100%",
          marginTop: 20,
        }}
        placeholderTextColor={"#808080"}
        value={sourceSearchQuery}
        onChangeText={(e) => {
          setSourceSearchQuery(e);
        }}
      ></TextInput>

      {sourceSearchQuery && !source ? (
        <View>
          <ScrollView style={{ height: "50%", overflow: "scroll" }}>
            {searchResults.map((item: any) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "auto",
                    borderBottomWidth: 1,
                    borderBottomColor: "#808080",
                    padding: 20,
                  }}
                  onPress={() => {
                    // setLocation(item);
                    setSource(item);
                    setSourceSearchQuery(item);
                    setSearchResults([]);
                    setTripData({
                      sourceInfo: {
                        name: item,
                      },
                    });
                  }}
                  key={Math.random()}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
<Text style={{fontFamily:'outfit', textAlign:'center',color: '#808080', marginVertical: 20, fontSize: normalize(22)}}>TO</Text>
      <TextInput
        placeholder="Search Destination"
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: "#808080",
          width: "100%",
          
        }}
        placeholderTextColor={"#808080"}
        value={destinationSearchQuery}
        onChangeText={(e) => {
          setDestinationSearchQuery(e);
        }}
      ></TextInput>

      {destinationSearchQuery && !destination ? (
        <View>
          <ScrollView style={{ height: "50%", overflow: "scroll" }}>
            {searchResults.map((item: any) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "auto",
                    borderBottomWidth: 1,
                    borderBottomColor: "#808080",
                    padding: 20,
                  }}
                  onPress={() => {
                    // setLocation(item);
                    setDestination(item);
                    setDestinationSearchQuery(item);
                    setSearchResults([]);
                    setTripData({
                      ...tripData,
                      destinationInfo: { name: item },
                    });
                  }}
                  key={Math.random()}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      <TouchableOpacity
        style={{
          width: "50%",
          backgroundColor: "black",
          height: "auto",
          padding: 18,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          alignSelf: "center",
        }}
        onPress={() => {
          if(source==="" || destination===""){
            Alert.alert("Please fill all details")
          }
          else{
            router.push("/create-trip/SelectTraveller");

          }
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "outfit-bold", fontSize: normalize(16) }}
        >
          Proceed
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
