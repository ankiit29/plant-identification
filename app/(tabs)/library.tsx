import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const plantDatabase = [
  {
    id: '1',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum tenuiflorum',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=500',
    category: 'Medicinal',
    region: 'Pan India',
  },
  {
    id: '2',
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    image: 'https://images.unsplash.com/photo-1591137982771-187c66264a38?w=500',
    category: 'Medicinal',
    region: 'Pan India',
  },
  {
    id: '3',
    name: 'Indian Lotus',
    scientificName: 'Nelumbo nucifera',
    image: 'https://images.unsplash.com/photo-1616628188467-8f10b59a4bc6?w=500',
    category: 'Aquatic',
    region: 'Pan India',
  },
];

const categories = ['All', 'Medicinal', 'Aquatic', 'Endangered', 'Sacred'];
const regions = ['All Regions', 'Pan India', 'North India', 'South India', 'Northeast'];

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const filteredPlants = plantDatabase.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All Regions' || plant.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const renderPlantCard = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.scientificName}>{item.scientificName}</Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>{item.category}</Text>
          <Text style={styles.tag}>{item.region}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedCategory === item && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(item)}>
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === item && styles.filterButtonTextActive,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.filtersList}
        />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={regions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedRegion === item && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedRegion(item)}>
              <Text
                style={[
                  styles.filterButtonText,
                  selectedRegion === item && styles.filterButtonTextActive,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.filtersList}
        />
      </View>

      <FlatList
        data={filteredPlants}
        renderItem={renderPlantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.plantList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filtersContainer: {
    paddingBottom: 8,
  },
  filtersList: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2d6a4f',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  plantList: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
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
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scientificName: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    fontSize: 12,
  },
});