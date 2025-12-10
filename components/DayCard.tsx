import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPlaceImageUtil } from "@/utils/Image";
import { normalize } from "@/utils/Responsive";

export default function DayCard({ day }: any) {


  useEffect(() => {
    getPlaceImage();
    
    // console.log("day card us");

    return()=>{}
  }, []);


  const [photo, setPhoto] = useState<any>();
  const[imageUri,setImageUri]=useState<any>(null)

  const getPlaceImage = async () => {
    try {
      // const response = await axios.get(
      //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
      //     day.location === "Various locations" ? day.title : day.location
      //   }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
      // );
      // // console.log(response.data.results[0].photos[0].photo_reference);
      // setPhoto(response.data.results[0].photos[0].photo_reference);

      const imgUri= await getPlaceImageUtil(day.location === "Various locations" ? day.title : day.location)
      // console.log(imgUri)
      setImageUri(imgUri)

    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <View
      style={{
        marginRight: 10,
        borderRadius: 10,
        marginTop: 10,
        width: 180,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        padding: 5,
      }}
    >
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ width: "auto", height: 140, borderRadius: 10 }}
        />
      )}

      <Text style={{ fontFamily: "outfit-medium", fontSize: normalize(14), marginTop: 5 }}>
        {day.activity}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: normalize(14),
          marginTop: 5,
          color: "#808080",
        }}
      >
        {day.details}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: normalize(14),
          marginTop: 5,
          color: "#808080",
        }}
      >
        📍 {day.location}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: normalize(14),
          marginTop: 5,
          color: "#808080",
        }}
      >
        📍 {day.time}
      </Text>
    </View>
  );
}
