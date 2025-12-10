import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, signOut } from "firebase/auth";
import { app } from '@/config/FirebaseConfig';
import { router } from 'expo-router';
import { normalize } from '@/utils/Responsive';

export default function Profile() {
  const auth = getAuth(app);

  const logOut=()=>{
    signOut(auth).then(() => {
      router.replace('/')
    }).catch((error) => {
     
    });
  }
  return (
    <SafeAreaView style={{height:'100%', backgroundColor:'white', padding:25,display:'flex',justifyContent:'center'}}>
      <TouchableOpacity style={{alignSelf:'center', backgroundColor:'black', padding:10, borderRadius:10}} onPress={()=>{
        logOut()
      }}>
    <Text style={{color:'white', fontFamily:'outfit-bold', fontSize:normalize(16)}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}