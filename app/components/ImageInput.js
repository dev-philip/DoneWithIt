import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ImageInput({ imageUri, onChangeImage }) {
    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const {granted} = ImagePicker.requestCameraPermissionsAsync();
        if(!granted){
        //   alert('You need to enable permission to access the library');
        }
      }

    const handlePress = () => {
        if(!imageUri) selectImage();
        else 
            Alert.alert('Delete', 'Are you sure you want to delete this image?', [
                {text: 'Yes', onPress: () => onChangeImage(null)},
                {text: 'no'},
        ]);
    }

    const selectImage = async () => {

        try {
          const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
          });

          if(!result.cancelled){
            onChangeImage(result.uri);
          }
        } catch (error) {
          console.log('Error reading an image', error);
        }
      }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
            {!imageUri && (
                <MaterialCommunityIcons color={colors.medium} name='camera' size={40} />
            )}

            {imageUri && (
                <Image source={{uri : imageUri}} style={styles.image} />
            )}
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImageInput;