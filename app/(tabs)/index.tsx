
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import plantData from '../../assets/info.json';

export default function IdentifyScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const API_URL = 'http://209.38.120.5:8000/predict/';

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      identifyPlant(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      identifyPlant(result.assets[0].uri);
    }
  };

  const identifyPlant = async (imageUri: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Fetch additional details from JSON
        const identifiedPlant = findPlantDetails(data.predicted_class);

        // ✅ Store full result including additional details
        setResult({
          name: data.predicted_class,
          confidence: data.confidence,
          ...identifiedPlant, // ✅ Merge API & JSON data
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to identify the plant.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while identifying the plant.');
    } finally {
      setLoading(false);
    }
  };

  const findPlantDetails = (commonName: string) => {
    const plant = plantData.plants.find(
      (p) => p.common_name.toLowerCase() === commonName.toLowerCase()
    );
    return plant
      ? {
        scientificName: plant.scientific_name,
        medicinalUses: plant.medicinal_uses,
        conservationStatus: plant.conservation_status,
        distribution: plant.geographic_distribution,
      }
      : {
        scientificName: 'Unknown',
        medicinalUses: ['No data available'],
        conservationStatus: 'Unknown',
        distribution: ['No data available'],
      };
  };

  const resetAll = () => {
    setImage(null);
    setLoading(false);
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="leaf-outline" size={64} color="#2d6a4f" />
              <Text style={styles.placeholderText}>
                Take or upload a photo to identify plants
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="images" size={24} color="white" />
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {(image || loading || result) && (
          <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
            <Ionicons name="refresh" size={24} color="white" />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2d6a4f" />
            <Text style={styles.loadingText}>Analyzing image...</Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.plantName}>{result.name}</Text>

            <View style={styles.confidenceBar}>
              <View
                style={[
                  styles.confidenceFill,
                  { width: `${result.confidence * 100}%` },
                ]}
              />
              <Text style={styles.confidenceText}>
                {Math.round(result.confidence * 100)}% Match
              </Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Medicinal Uses</Text>
              {result?.medicinalUses?.length ? (
                result.medicinalUses.map((use: string, index: number) => (
                  <Text key={index} style={styles.infoText}>• {use}</Text>
                ))
              ) : (
                <Text style={styles.infoText}>No data available</Text>
              )}
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Conservation Status</Text>
              <Text style={styles.infoText}>{result?.conservationStatus || 'Unknown'}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Distribution</Text>
              {result?.distribution?.length ? (
                result.distribution.map((location: string, index: number) => (
                  <Text key={index} style={styles.infoText}>• {location}</Text>
                ))
              ) : (
                <Text style={styles.infoText}>No data available</Text>
              )}
            </View>

          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d6a4f',
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 16,
  },
  confidenceBar: {
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  confidenceFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#2d6a4f',
    borderRadius: 15,
  },
  confidenceText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 30,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
