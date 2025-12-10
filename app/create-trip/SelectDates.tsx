import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment'
import { CreateTripContext } from '@/context/CreateTripContext'
import { normalize } from '@/utils/Responsive'
export default function SelectDates() {
    const [startDate, setStartDate]= useState<any>(null)
    const [endDate, setEndDate]= useState<any>(null)

    const onDateChange=(date:any,type:any)=>{
        // console.log((date),type)
        if(type=='START_DATE'){
            setStartDate(moment(date))
        }
        else {
            setEndDate(moment(date))
        }
    }
    const tripContext = useContext(CreateTripContext);
    const { tripData, setTripData } = tripContext;
    const onContinue=()=>{
        if(startDate && endDate){
        const totDays= endDate.diff(startDate,'days')
            // console.log(totDays)
        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalDays:totDays+1
        })
        router.push('/create-trip/SelectBudget')
        }
        else{
          Alert.alert("Please select dates.")
        }
    }

// console.log(startDate,endDate)
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%", padding: 25 }}>
         <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"black"} size={30} />
      </TouchableOpacity>
      <Text style={{fontFamily:'outfit-bold', fontSize:normalize(36), marginTop:25}}>Travel Dates</Text> 
      <View style={{marginTop:20}}>
      <CalendarPicker allowRangeSelection={true} allowBackwardRangeSelect={true} minDate={new Date()} onDateChange={onDateChange}/>

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
            // router.push('/create-trip/SelectDates')
            onContinue()
          }}
        >
          <Text
            style={{ color: "white", fontFamily: "outfit-bold", fontSize: normalize(16) }}
          >
            Next
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}