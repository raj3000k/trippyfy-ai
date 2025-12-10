import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { router } from "expo-router";
import { getPlaceImageUtil } from "@/utils/Image";
import { normalize } from "@/utils/Responsive";

export default function UserTripCard({ trip }: any) {
  // const tripdata= JSON.parse(trip.tripData)
  const [tripData, setTripData] = useState<any>();
  const [photo2, setPhoto2] = useState<any>();
  const[imageUri,setImageUri]=useState<any>(null)
  useEffect(() => {
    setTripData(JSON.parse(trip.tripData));

    
      getPlaceImage();
 


    // console.log("us2 shs")
    return ()=>{}
  }, []);
  const getPlaceImage = async () => {

    try {
    //   const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
    //     trip.tripResp.trip.destination.split(",")[0]
    //   }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    // );
    // // console.log(response.data.results[0].photos[0].photo_reference);
    // setPhoto2(response.data.results[0].photos[0].photo_reference);

    const imgUri=await getPlaceImageUtil(trip.tripResp.trip.destination.split(",")[0])
    setImageUri(imgUri)
    // console.log('shjss',imgUri)

    } catch (error) {
      setPhoto2('error')
    }
    
  };

  
  return (
    <TouchableOpacity onPress={()=>{
      router.push({
        pathname: "/trip-details",
        params: {
          tripData: JSON.stringify((trip.tripResp)),
        },
      });
    }}>
      {tripData && (
        <View style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
          {imageUri && <Image
            source={{
              uri:imageUri
            }}
            style={{
              width: "30%",
              height: 100,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />}
         
          <View

            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginLeft: 15,
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: normalize(14),
                flexWrap: "wrap",
              }}
            >
              {tripData.destinationInfo.name}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: normalize(14),
                flexWrap: "wrap",
                color: "#808080",
              }}
            >
              {moment(tripData.startDate).format("DD MMM YYYY")}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: normalize(14),
                flexWrap: "wrap",
                color: "#808080",
              }}
            >
              Travelling : {tripData.travellerInfo.title}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
