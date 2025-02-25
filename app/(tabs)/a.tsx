{/* <View style={styles.infoSection}>
<Text style={styles.sectionTitle}>Medicinal Uses</Text>
{result.medicinalUses.map((use: string, index: number) => (
  <Text key={index} style={styles.infoText}>• {use}</Text>
))}
</View>

<View style={styles.infoSection}>
<Text style={styles.sectionTitle}>Conservation Status</Text>
<Text style={styles.infoText}>{result.conservationStatus}</Text>
</View>

<View style={styles.infoSection}>
<Text style={styles.sectionTitle}>Distribution</Text>
<Text style={styles.infoText}>{result.distribution}</Text>
</View>

<View style={styles.infoSection}>
<Text style={styles.sectionTitle}>Cultural Significance</Text>
<Text style={styles.infoText}>{result.culturalSignificance}</Text>
</View> */}


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';

// export default function IdentifyScreen() {
//   const [image, setImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);

//   const identifyPlant = async (imageUri: string) => {
//     setLoading(true);
//     setResult(null);

//     let formData = new FormData();
//     formData.append('file', {
//       uri: imageUri,
//       name: 'image.jpg',
//       type: 'image/jpeg',
//     } as any);

//     try {
//       const response = await fetch('http://209.38.120.5:8000/predict/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       setResult({
//         name: data.predicted_class,
//         confidence: data.confidence,
//       });
//     } catch (error) {
//       alert('Error identifying plant. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access gallery is required!');
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       identifyPlant(result.assets[0].uri);
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access camera is required!');
//       return;
//     }
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       identifyPlant(result.assets[0].uri);
//     }
//   };

//   const resetAll = () => {
//     setImage(null);
//     setLoading(false);
//     setResult(null);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.imageContainer}>
//           {image ? (
//             <Image source={{ uri: image }} style={styles.image} />
//           ) : (
//             <View style={styles.placeholder}>
//               <Ionicons name="leaf-outline" size={64} color="#2d6a4f" />
//               <Text style={styles.placeholderText}>
//                 Take or upload a photo to identify plants
//               </Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={takePhoto}>
//             <Ionicons name="camera" size={24} color="white" />
//             <Text style={styles.buttonText}>Take Photo</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button} onPress={pickImage}>
//             <Ionicons name="images" size={24} color="white" />
//             <Text style={styles.buttonText}>Upload Photo</Text>
//           </TouchableOpacity>
//         </View>

//         {(image || loading || result) && (
//           <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
//             <Ionicons name="refresh" size={24} color="white" />
//             <Text style={styles.buttonText}>Reset</Text>
//           </TouchableOpacity>
//         )}

//         {loading && (
//           <View style={styles.loadingContainer}>
//             <Text style={styles.loadingText}>Analyzing image...</Text>
//           </View>
//         )}

//         {result && (
//           <View style={styles.resultContainer}>
//             <Text style={styles.plantName}>{result.name}</Text>
//             <View style={styles.confidenceBar}>
//               <View style={[styles.confidenceFill, { width: `${result.confidence * 100}%` }]} />
//               <Text style={styles.confidenceText}>{Math.round(result.confidence * 100)}% Match</Text>
//             </View>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   content: { padding: 20 },
//   imageContainer: { width: '100%', height: 300, backgroundColor: '#f5f5f5', borderRadius: 12, marginBottom: 20 },
//   image: { width: '100%', height: '100%' },
//   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   placeholderText: { marginTop: 12, fontSize: 16, color: '#666', textAlign: 'center' },
//   buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
//   button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2d6a4f', padding: 15, borderRadius: 8, flex: 0.48, justifyContent: 'center' },
//   resetButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dc2626', padding: 15, borderRadius: 8, justifyContent: 'center', marginBottom: 20 },
//   buttonText: { color: 'white', fontSize: 16, marginLeft: 8 },
//   loadingContainer: { padding: 20, alignItems: 'center' },
//   loadingText: { fontSize: 16, color: '#666' },
//   resultContainer: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 20, marginTop: 20 },
//   plantName: { fontSize: 24, fontWeight: 'bold', color: '#2d6a4f', marginBottom: 4 },
//   confidenceBar: { height: 30, backgroundColor: '#e0e0e0', borderRadius: 15, overflow: 'hidden', marginBottom: 20 },
//   confidenceFill: { position: 'absolute', top: 0, left: 0, bottom: 0, backgroundColor: '#2d6a4f', borderRadius: 15 },
//   confidenceText: { position: 'absolute', width: '100%', textAlign: 'center', lineHeight: 30, color: 'white', fontSize: 14, fontWeight: 'bold' },
// });