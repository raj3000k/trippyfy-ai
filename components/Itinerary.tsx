import { View, Text, FlatList } from 'react-native'
import React from 'react'
import DayCard from './DayCard';
import { normalize } from '@/utils/Responsive';

export default function Itinerary({itinerary}:any) {
    // console.log(itinerary)
    const sortedItinerary = Object.entries(itinerary).sort(([dayA], [dayB]) => {
        const dayANumber = parseInt(dayA.replace('day', ''), 10);
        const dayBNumber = parseInt(dayB.replace('day', ''), 10);
        return dayANumber - dayBNumber;
      });
  return (
    <View>
      <Text style={{fontFamily:'outfit-bold', fontSize:normalize(18)}}>⛱️  Itinerary</Text>

        {
            sortedItinerary.map(([day,details])=>{
                const detail = details as any;
                // console.log(detail.title)
              return <View key={Math.random()} style={{marginVertical:15}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:normalize(16)}}>{`Day ${day.replace('day','')}`} - {detail.title}</Text>
                <FlatList data={detail.schedule} horizontal={true} renderItem={({item,index})=>(
                    <DayCard day={item}/>
                )}/>
              </View>
            })
        }
    </View>
  )
}