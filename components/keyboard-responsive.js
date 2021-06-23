import React from 'react';
import { 
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet } from 'react-native';

export const KeyboardHideOnTouchOutside = (props) => ( 
    <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            { props.children}
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
)

export const styles = StyleSheet.create({
    container:{
        width:'100%', 
        height:'100%', 
    }})
