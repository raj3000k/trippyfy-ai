import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Traveller } from '@/constants/Traveller'

export default function OptionCard({data,selected}:any) {
    
  return (
    <View style={{display:'flex', flexDirection:'row', marginTop:20, padding:20, backgroundColor:'#f2f2f2', borderRadius:10, justifyContent:'space-between', alignItems:'center', borderWidth: selected && selected.title===data.title ? 1.5 : 0, borderColor:'black'}}>
      <View>
        <Text style={{fontFamily:'outfit-bold', fontSize: 24}}>{data.title}</Text>
        <Text style={{fontFamily:'outfit', fontSize: 20, marginTop:10, color: "#808080"}}>{data.desc}</Text>
      </View>
      <View>
        
      <Text style={{fontSize:40}}>{data.icon}</Text>
      </View>
    </View>
  )
}