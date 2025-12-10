import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { normalize } from "@/utils/Responsive";

export default function Login() {
  
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <Image
        source={require("../assets/images/login.png")}
        style={{ width: "100%", height: 400 }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius:20,
          paddingVertical:10,
          paddingHorizontal:10,
          marginTop: -20,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: normalize(28), fontFamily: "outfit-bold", marginTop:20}}>
          Welcome to Trippify
        </Text>
        <Text style={{ fontSize: normalize(20), fontFamily: "outfit", color:'#808080', textAlign:'center', marginTop:15 }}>
            Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI driven insights. 
        </Text>
        <TouchableOpacity style={{width:'80%', backgroundColor:'black', height:'auto', padding:18, borderRadius:28, justifyContent:'center', alignItems:'center', marginTop:'25%'}} onPress={()=>{
            router.push('/auth/sign-in')
        }}>
            <Text style={{color:'white', fontFamily:'outfit-bold', fontSize:normalize(16)}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  test:{
    
  }
})