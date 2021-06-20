import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WhiteLogo1 } from '../assets/svgs/svg-logos';
import { globalStyles, themeColors } from '../styles/global-styles';

export default SplashScreen = () => (
    <View style={styles.splashContainer}>
        <WhiteLogo1 />
    </View>
);

const styles = StyleSheet.create({
    splashContainer:{
        ...globalStyles.container,
        backgroundColor: themeColors.primary1,
    }
})
