import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemonImageUrl } from '../services/pokeapi';
import { LikedPokemon, RootStackParamList } from '../types/pokemon.types';
import PokemonImage from '../components/PokemonImage';

type LikedPokemonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LikedPokemon'>;

interface LikedPokemonScreenProps {
  navigation: LikedPokemonScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const numColumns = width > 600 ? 3 : 2;
const cardWidth = (width - 60) / numColumns;

const LikedPokemonScreen: React.FC<LikedPokemonScreenProps> = ({ navigation }) => {
  const [likedPokemon, setLikedPokemon] = useState<LikedPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { colors, isDarkMode } = useTheme();

  const styles = createStyles(colors, isDarkMode);

  const loadLikedPokemon = async (): Promise<void> => {
    setLoading(true);
    try {
      const saved = await AsyncStorage.getItem('likedPokemon');
      if (saved) {
        setLikedPokemon(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading liked Pokémon:', error);
      Alert.alert('Error', 'Failed to load your collection.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLikedPokemon();
    }, [])
  );

  const removePokemon = (pokemonId: number, pokemonName: string): void => {
    Alert.alert(
      'Remove Pokémon',
      `Are you sure you want to remove ${pokemonName} from your collection?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => handleRemovePokemon(pokemonId),
        },
      ]
    );
  };

  const handleRemovePokemon = (pokemonId: number): void => {
    const updatedList = likedPokemon.filter(p => p.id !== pokemonId);
    setLikedPokemon(updatedList);
    
    AsyncStorage.setItem('likedPokemon', JSON.stringify(updatedList))
      .catch(error => {
        console.error('Error saving to storage:', error);
        Alert.alert('Error', 'Failed to remove Pokémon. Please try again.');
      });
  };

  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[type?.toLowerCase()] || '#A8A878';
  };

  const renderPokemonCard = ({ item }: { item: LikedPokemon }) => {
    return(
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => removePokemon(item.id, item.name)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <PokemonImage
          imageUrl={getPokemonImageUrl(item.id)}
          width={cardWidth - 40}
          height={cardWidth - 40}
          fallbackUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.types}>
          {item.types?.map((type: string) => (
            <View 
              key={`${item.id}-${type}`} 
              style={[styles.typeBadge, { backgroundColor: getTypeColor(type) }]}
            >
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your collection...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Collection</Text>
        <View style={styles.placeholder} />
      </View>
      {likedPokemon.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>😢</Text>
          <Text style={styles.emptyTitle}>Your collection is empty!</Text>
          <Text style={styles.emptyText}>
            Start swiping to catch some Pokémon!
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Swipe')}
          >
            <Text style={styles.startButtonText}>Start Catching!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={likedPokemon}
          renderItem={renderPokemonCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {likedPokemon.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Total Pokémon: {likedPokemon.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: any, isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: colors.text,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
    },
    backButton: {
      padding: 10,
    },
    backText: {
      fontSize: 28,
      color: colors.primary,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    placeholder: {
      width: 44,
    },
    listContent: {
      padding: 15,
    },
    card: {
      width: cardWidth,
      margin: 7.5,
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 10,
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    imageContainer: {
      width: cardWidth - 20,
      height: cardWidth - 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#2C2C2C' : '#F8F8F8',
      borderRadius: 10,
      marginBottom: 10,
    },
    image: {
      width: cardWidth - 40,
      height: cardWidth - 40,
    },
    info: {
      width: '100%',
      alignItems: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
      textTransform: 'capitalize',
    },
    types: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    typeBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
      marginHorizontal: 2,
      marginBottom: 2,
    },
    typeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyEmoji: {
      fontSize: 64,
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: 'center',
      marginBottom: 30,
    },
    startButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 25,
    },
    startButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    statsContainer: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: 'center',
    },
    statsText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default LikedPokemonScreen;