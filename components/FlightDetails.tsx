import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { normalize } from '@/utils/Responsive'

export default function FlightDetails({flight}:any) {
  return (
    <View style={{display:'flex', justifyContent:'space-evenly', marginTop:25}}>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'baseline'}}>
        <Text style={{fontFamily:'outfit-bold', fontSize:normalize(18)}}> ✈️  Flights </Text>
       

        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
            <View style={{borderRightWidth:1, borderColor:'#808080', width:'50%', height:'auto', gap:5}}>
                <Text style={{color:'#808080', textAlign:'center', fontFamily:'outfit'}}>Departure</Text>
                
                <Text style={{fontFamily:'outfit'}}>Airline: {flight.departure.airline}</Text>
                <Text style={{fontFamily:'outfit'}}>From: {flight.departure.from}</Text>
                <Text style={{fontFamily:'outfit'}}>To: {flight.departure.to}</Text>
                <Text style={{fontFamily:'outfit'}}>Price: {flight.departure.price}</Text>
                <Text style={{fontFamily:'outfit'}}>Duration: {flight.departure.duration}</Text>
                <Text style={{fontFamily:'outfit'}}>Date: {moment(flight.departure.date).format('DD MMM YYYY')}</Text>
                <TouchableOpacity>
            <View style={{padding:5, backgroundColor:'black', borderRadius:10, width:'50%', alignSelf:'center', marginTop:5}}>
            <Text style={{fontFamily:'outfit-bold', color:'white', textAlign:'center'}}> Book Now </Text>
            </View>
        </TouchableOpacity>

            </View>
            
              <View style={{ borderColor:'#808080', width:'50%', height:'auto', gap:5, marginLeft:20}}>
                <Text style={{color:'#808080', textAlign:'center'}}>Return</Text>
                {
                    flight.return ? <>
                    <Text style={{fontFamily:'outfit'}}>Airline: {flight.return.airline}</Text>
                <Text style={{fontFamily:'outfit'}}>From: {flight.return.from}</Text>
                <Text style={{fontFamily:'outfit'}}>To: {flight.return.to}</Text>
                <Text style={{fontFamily:'outfit'}}>Price: {flight.return.price}</Text>
                <Text style={{fontFamily:'outfit'}}>Duration: {flight.return.duration}</Text>
                <Text style={{fontFamily:'outfit'}}>Date: {moment(flight.return.date).format('DD MMM YYYY')}</Text>
                <TouchableOpacity>
            <View style={{padding:5, backgroundColor:'black', borderRadius:10, width:'50%', alignSelf:'center', marginTop:5}}>
            <Text style={{fontFamily:'outfit-bold', color:'white', textAlign:'center'}}> Book Now </Text>
            </View>
        </TouchableOpacity>
                    </>
                    :
                    <Text style={{color:'#808080', textAlign:'center', textAlignVertical:'center',fontFamily:'outfit'}}>Return Flight Info Not Available</Text>
                }
                

            </View>
          
        </View>
    </View>
  )
}