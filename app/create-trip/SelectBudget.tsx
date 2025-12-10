import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Budget } from "@/constants/Traveller";
import OptionCard from "@/components/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";
import { normalize } from "@/utils/Responsive";

export default function SelectBudget() {
  const [selected, setSelected] = useState<any>();

  const tripContext = useContext(CreateTripContext);
  const { tripData, setTripData } = tripContext;

  useEffect(() => {
    setTripData({ ...tripData, budget: selected?.title });
  }, [selected]);
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", height: "100%", padding: 25 }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"black"} size={30} />
      </TouchableOpacity>
      <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(36), marginTop: 25 }}>
        Budget
      </Text>
      <View>
      <FlatList
        data={Budget}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelected(item)}>
            <OptionCard data={item} selected={selected} />
          </TouchableOpacity>
        )}
      />
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
            if(!selected){
              Alert.alert("Please select budget type.")
            }
            else{
              router.push('/create-trip/ReviewTrip')

            }
            
          }}
        >
          <Text
            style={{ color: "white", fontFamily: "outfit-bold", fontSize: normalize(16) }}
          >
            Next
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
