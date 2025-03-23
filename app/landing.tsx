import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import Button from '@/components/Shared/Button'

export default function LandingScreen() {
  return (
    <View>
      <Image source={require('./../assets/images/login.png')} 
        style={{
          width: '100%',
          height: 480
        }}
      />
      <View style={{
        padding: 20,
      }}>
        
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Welcome to University of Ghana Campus</Text>

        <Text style={{
          fontSize: 17,
          textAlign: 'center',
          marginTop: 10,
          color:Colors.GRAY
        }}>Your College news on your smartphone. Join clubs, register for events and many more!</Text>

        <Button text='Get Started' onPress={()=>console.log('Button Pressed')}/>

        <Text style={{
          fontSize: 16,
          textAlign: 'center',
          color: Colors.GRAY,
          marginTop: 7,
        }}>Already have an account? Sign in Here</Text>

      </View>
    </View>
  )
}