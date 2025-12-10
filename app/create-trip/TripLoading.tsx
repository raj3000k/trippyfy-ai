import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CreateTripContext } from '@/context/CreateTripContext';
import { prompt } from '@/constants/AIPrompt';
import { chatSession } from '@/config/AIModel';
import {doc, setDoc} from "@firebase/firestore"
import { auth, db } from '@/config/FirebaseConfig';
import { router } from 'expo-router';
import { normalize } from '@/utils/Responsive';

export default function TripLoading() {
    const user= auth.currentUser
    const tripContext = useContext(CreateTripContext);
    const { tripData, setTripData } = tripContext;

    useEffect(()=>{
        GenerateTrip()
    },[])

    const GenerateTrip=async()=>{
          const result = await chatSession.sendMessage(prompt(tripData));
        //   const tripResp= JSON.parse(result.response.text())
            // console.log(result.response.text());
          
            const docId= (Date.now()).toString();
            let tripResp={}
            try{
                tripResp= (JSON.parse(result.response.text()))
            } catch{
                 tripResp= (JSON.parse(result.response.text() + '}'))
            }
            await setDoc(doc(db,"userTrips", docId),{
                userEmail: user?.email,
                tripResp: tripResp,
                tripData: JSON.stringify(tripData),
                docId: docId
            })

            router.replace('(tabs)/MyTrip')
    }
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%", padding: 25, alignItems:'center' }}>
       <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(36), marginTop: 25 }}>
        Please Wait
      </Text>
      <Text style={{ fontFamily: "outfit-bold", fontSize: normalize(20), marginTop: 25, textAlign:'center' }}>
        We are working to generate your dream trip
      </Text>
      <Image
        source={require("../../assets/images/Plane.gif")}
        style={{ width: "50%", height: 200, marginTop:20}}
      />
      <Text style={{ fontFamily: "outfit", fontSize: normalize(24), marginTop: 25, textAlign:'center', color:'#808080' }}>
       Do not go back
      </Text>
    </SafeAreaView>
  )
}