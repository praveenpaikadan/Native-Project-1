import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WhiteLogo1 } from '../assets/svgs/svg-logos';
import { globalStyles, sc, themeColors } from '../styles/global-styles';

export default SplashScreen = (props) => (
    <View style={styles.splashContainer}>
        <View style={{marginTop: -25*sc}}>
            <WhiteLogo1 />
        </View>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    splashContainer:{
        ...globalStyles.container,
        backgroundColor: themeColors.primary1,
    }
})
