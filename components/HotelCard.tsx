import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPlaceImageUtil } from "@/utils/Image";
import { normalize } from "@/utils/Responsive";

export default function HotelCard({ hotel }: any) {
  // console.log(hotel);
  useEffect(() => {
    getPlaceImage();

    // console.log(" us4 hotel card");

    return () => {};
  }, []);

  const [photo, setPhoto] = useState<any>(null);
  const [imageUri, setImageUri] = useState<any>(null);

  const getPlaceImage = async () => {
    try {
      //    const response = await axios.get(
      //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${hotel.name}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
      // );
      // // console.log(response.data.results[0].photos[0].photo_reference);
      // setPhoto(response.data.results[0].photos[0].photo_reference);
      const imgUri = await getPlaceImageUtil(hotel.name);
      // console.log(imgUri)
      setImageUri(imgUri);
    } catch (error) {
      // console.log(error);
      setPhoto("error");
    }
  };
  return (
    <View
      style={{
        gap: 5,
        marginTop: 10,
        marginRight: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: 180,
      }}
    >
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ width: 180, height: 140, borderRadius: 10 }}
        />
      )}
      <Text
        style={{ fontFamily: "outfit-medium", fontSize: normalize(16), flexWrap: "wrap" }}
      >
        {hotel.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "outfit-medium", fontSize: normalize(12) }}>
          ⭐ {hotel.rating}
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: normalize(12) }}>
          💰 {hotel.price}
        </Text>
      </View>
    </View>
  );
}
