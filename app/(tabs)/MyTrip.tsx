import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db, storage } from "@/config/FirebaseConfig";
import { signOut } from "@firebase/auth";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import StartNewTripCard from "@/components/StartNewTripCard";
import { query, collection, where, getDocs } from "@firebase/firestore";
import UserTripList from "@/components/UserTripList";
import { getStorage,ref,getMetadata } from "firebase/storage";
import { storageRef } from "@/config/FirebaseConfig";
import { supabase } from "@/config/SupabaseConfig";
import { normalize } from "@/utils/Responsive";
export default function MyTrip() {
  const user = auth.currentUser;

  const [
  userTrips, setUserTrips] = useState<any>([]);
  // console.log(userTrips.length)
  const [loading,setLoading]= useState<boolean>(false)

  const GetMyTrips = async () => {
    setLoading(true)
    const q = query(
      collection(db, "userTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setUserTrips((prev:any)=>[...prev,doc.data()])
      
    });
    setLoading(false)
    // console.log(userTrips)
  };


  useEffect(() => {
    setUserTrips([])
    GetMyTrips();
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", padding: 25, height: "100%" }}
    >

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(32) }}>
          My trips
        </Text>
        <TouchableOpacity onPress={()=>{
          router.push('/create-trip/SearchPlace')
        }}>
        <AntDesign name="pluscircle" size={32} color="black" />

        </TouchableOpacity>
      </View>
      {loading && <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
        <ActivityIndicator size={'large'} />
        </View>}
      {!loading && userTrips.length === 0 ? <StartNewTripCard /> : 
      !loading && userTrips && <UserTripList userTrips={userTrips}/>
      }
    </SafeAreaView>
  );
}
