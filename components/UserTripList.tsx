import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import UserTripCard from "./UserTripCard";
import axios from "axios";
import { router } from "expo-router";
import { supabase } from "@/config/SupabaseConfig";

import { decode } from 'base64-arraybuffer'
import { getPlaceImageUtil } from "@/utils/Image";
import { normalize } from "@/utils/Responsive";




export default function UserTripList({ userTrips }: any) {
  useEffect(() => {
    // console.log("us1");

    getPlaceImage();

    return () => {};
  }, [userTrips]);

  const n = userTrips.length;
  const [photo, setPhoto] = useState<any>(null);
  const[imageUri,setImageUri]=useState<any>(null)

 
  const getPlaceImage = async () => {
    if (userTrips && userTrips[n - 1]) {
      try {
        // const response = await axios.get(
        //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
        //     userTrips[n - 1].tripResp.trip.destination.split(",")[0]
        //   }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
        // );
        // // console.log(response.data.results[0].photos[0].photo_reference);
        // setPhoto(response.data.results[0].photos[0].photo_reference);

       const imgUri= await getPlaceImageUtil(userTrips[n - 1].tripResp.trip.destination.split(",")[0])
      //  console.log(imgUri)
       setImageUri(imgUri)

    }
    catch (error) {
      // console.log(error);
      setPhoto("error");
    }
  };
}

  // console.log(latestTrip);
  return (
    <ScrollView>
      {userTrips && userTrips[n - 1] && (
        <View style={{ marginTop: 20 }}>
          {imageUri && (
            <Image
              source={{
              
                uri: imageUri
              }}
              style={{
                width: "100%",
                height: 240,
                objectFit: "cover",
                borderRadius: 15,
              }}
            />
          )}

          <View
            style={{
              display: "flex",
              marginTop: 10,
              padding: 10,
              width: "100%",
            }}
          >
            <Text style={{ fontFamily: "outfit", fontSize: normalize(18) }}>
              {userTrips[n - 1].tripResp.trip.destination}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 5,
                alignItems: "baseline",
              }}
            >
              <Text
                style={{ fontFamily: "outfit", fontSize:  normalize(18), color: "#808080" }}
              >
                {moment(JSON.parse(userTrips[n - 1].tripData).startDate).format(
                  "DD MMM YYYY"
                )}
              </Text>
              <Text
                style={{ fontFamily: "outfit", fontSize:  normalize(18), color: "#808080" }}
              >
                🚌 {userTrips[n - 1].tripResp.trip.traveler}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "black",
              height: "auto",
              padding: 9,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              alignSelf: "center",
            }}
            onPress={() => {
              router.push({
                pathname: "/trip-details",
                params: {
                  tripData: JSON.stringify(userTrips[n - 1].tripResp),
                },
              });
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "outfit-bold",
                fontSize:  normalize(16),
              }}
            >
              See your plan
            </Text>
          </TouchableOpacity>

          {!imageUri ? (
            <ActivityIndicator size={"large"} />
          ) : (
            userTrips.map((trip: any) => {
              return <UserTripCard key={Math.random()} trip={trip} />;
            })
          )}
        </View>
      )}
    </ScrollView>
  );
}
