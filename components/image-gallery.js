import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { sc } from '../styles/global-styles';
import { getFullMediaUrlIfRelative } from '../utilities/helpers';

export const ImageGallery1 = ({urlArray, width, height, borderRadius}) => {

    const styles = StyleSheet.create({

        container:{
            paddingHorizontal: 5*sc
        },
        image:{
            margin: 5*sc,
            width: width || 200* sc,
            height: height || 200 * sc,
            borderRadius: borderRadius || 5 * sc,
        }
    })

    return(
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                bounces={false}
                bouncesZoom={false}
                showsHorizontalScrollIndicator={false}
                data={urlArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return(
                    <View>
                    <Image 
                        source={{uri: getFullMediaUrlIfRelative(item.trim())}} 
                        style={styles.image}
                        onLoad={() => {}}
                        resizeMode={'cover'}
                    />
                    </View>
                
                )}} 
        />
        </View>
    )
}

