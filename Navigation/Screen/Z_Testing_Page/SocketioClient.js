import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../../Color/Color'
import { InputMode } from 'react-native-paper/lib/typescript/src/components/TextInput/Adornment/enums'
// import { Image } from 'react-native'
// import PhotoUpload from 'react-native-photo-upload'
import scoketservices from '../../../scoket/scoketservices'

const SocketioClient = () => {
    const [message, setMessage] = useState('')
    const [data, setdate] = useState('')

    const sendMessage = () => {
        if (!!message) {
            scoketservices.emit('SendMessage', message)
            return
        }
        alert("please Enter Your Message")

    }

    useEffect(() => {
        scoketservices.initializeSocket();


        // received_message 
        scoketservices.on("received_message", (msg => {
            console.log('Received message ',msg)
        }))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flex: 0.8 }}>
                        <TextInput placeholder='Enter Your Message'
                            placeholderTextColor={Color.FontColor}
                            style={styles.inputStyle}
                            onChangeText={(text) => setMessage(text)}
                            value={message}
                        />
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Button onPress={sendMessage} title='Send' />
                    </View>

                </View>
            </View>

        </SafeAreaView>
    )
}

export default SocketioClient

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    inputStyle: {
        height: 42,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        color: Color.FontColor
    }
})