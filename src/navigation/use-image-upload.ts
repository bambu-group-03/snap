import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

import { storage } from '@/screens/login/firebase'; // Adjust the import path as necessary

const useImageUpload = (userId: string | undefined, folder: string) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImageUri(selectedImage.uri);
      await uploadImage(selectedImage.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(storage, `${folder}/${userId}`);
    await uploadBytes(fileRef, blob);

    const downloadUrl = await getDownloadURL(fileRef);
    setImageUri(downloadUrl);
  };

  return { imageUri, setImageUri, handleImagePick };
};

export default useImageUpload;
