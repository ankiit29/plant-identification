import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function MapScreen() {
  const [selectedRegion, setSelectedRegion] = useState('central');

  const regions = {
    central: {
      name: 'Central India',
      image: 'https://images.unsplash.com/photo-1582652871264-189631ae8d22?w=800',
      plants: [
        'Teak (Tectona grandis)',
        'Indian Rosewood (Dalbergia latifolia)',
        'Sal (Shorea robusta)'
      ],
      description: 'Central India is characterized by deciduous forests and diverse medicinal plants adapted to the semi-arid climate.'
    },
    western: {
      name: 'Western Ghats',
      image: 'https://images.unsplash.com/photo-1582652871264-189631ae8d22?w=800',
      plants: [
        'Malabar Kino (Pterocarpus marsupium)',
        'White Cedar (Dysoxylum malabaricum)',
        'Cinnamon (Cinnamomum verum)'
      ],
      description: 'The Western Ghats are a biodiversity hotspot with high endemism and numerous rare species.'
    },
    himalayan: {
      name: 'Himalayan Region',
      image: 'https://images.unsplash.com/photo-1582652871264-189631ae8d22?w=800',
      plants: [
        'Himalayan Yew (Taxus wallichiana)',
        'Blue Pine (Pinus wallichiana)',
        'Rhododendron (Rhododendron arboreum)'
      ],
      description: 'The Himalayan region hosts unique alpine and sub-alpine vegetation adapted to high altitudes.'
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1582652871264-189631ae8d22?w=800' }}
          style={styles.mapImage}
        />
        <Text style={styles.mapTitle}>Distribution of Native Indian Plants</Text>
      </View>

      {Object.entries(regions).map(([key, region]) => (
        <View key={key} style={styles.regionCard}>
          <Image source={{ uri: region.image }} style={styles.regionImage} />
          <View style={styles.regionContent}>
            <Text style={styles.regionName}>{region.name}</Text>
            <Text style={styles.regionDescription}>{region.description}</Text>
            
            <Text style={styles.plantsTitle}>Notable Plants:</Text>
            {region.plants.map((plant, index) => (
              <Text key={index} style={styles.plantItem}>• {plant}</Text>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Vegetation Zones</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#2d6a4f' }]} />
          <Text style={styles.legendText}>Tropical Evergreen Forest</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4c956c' }]} />
          <Text style={styles.legendText}>Deciduous Forest</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#9ec1a3' }]} />
          <Text style={styles.legendText}>Alpine Vegetation</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    padding: 16,
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  regionCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  regionImage: {
    width: '100%',
    height: 150,
  },
  regionContent: {
    padding: 16,
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  regionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  plantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  plantItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  legend: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
});