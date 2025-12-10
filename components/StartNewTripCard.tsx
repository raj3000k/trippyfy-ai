import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { normalize } from '@/utils/Responsive';


export default function StartNewTripCard() {
  return (
    <View style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', marginTop: 50, gap:20}}>
         <Ionicons name="location" size={30} color='black' />
         <Text style={{fontFamily:'outfit', fontSize: normalize(26)}}>No trips planned yet</Text>
         <Text style={{fontFamily:'outfit', fontSize: normalize(26), color:'#808080', textAlign:'center'}}>Looks like its time to plan a new travel experience! Get started below</Text>
         <TouchableOpacity style={{width:'50%', backgroundColor:'black', height:'auto', padding:18, borderRadius:14, justifyContent:'center', alignItems:'center', marginTop: 20}} onPress={()=>{
            router.push('/create-trip/SearchPlace')
        }}>
            <Text style={{color:'white', fontFamily:'outfit-bold', fontSize:normalize(16)}}>Start a new trip</Text>
        </TouchableOpacity>
    </View>
  )
}