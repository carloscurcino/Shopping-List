import { View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Layout() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <SafeAreaView style={{ flex: 1 }}>
                <Slot />
            </SafeAreaView>
        </View>
    )
}