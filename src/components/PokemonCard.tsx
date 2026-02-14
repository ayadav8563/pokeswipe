import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { TransformedPokemon } from '../types/pokemon.types';

const { width } = Dimensions.get('window');
const isTablet = width > 768;
const cardWidth = isTablet ? width * 0.5 : width * 0.9;

interface PokemonCardProps {
  pokemon: TransformedPokemon;
  imageUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, imageUrl }) => {
  const { colors, isDarkMode } = useTheme();
  const [isSvg, setIsSvg] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  const styles = createStyles(colors, isDarkMode);

  useEffect(() => {
    const checkIfSvg = () => {
      const extension = imageUrl.split('.').pop()?.toLowerCase();
      setIsSvg(extension === 'svg');
      setImageLoading(false);
    };

    checkIfSvg();
  }, [imageUrl]);

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

  const renderImage = () => {
    if (imageLoading) {
      return (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (imageError) {
      return (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.errorText}>Failed to load</Text>
        </View>
      );
    }

    if (isSvg) {
      return (
        <SvgUri
          width="100%"
          height="100%"
          uri={imageUrl}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />
      );
    }

    return (
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <View style={styles.imageBackground}>
          {renderImage()}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>
          {pokemon.name}
          <Text style={styles.id}> #{pokemon.id.toString().padStart(3, '0')}</Text>
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types</Text>
          <View style={styles.typesContainer}>
            {pokemon.types?.map((type: string) => (
              <View
                key={type}
                style={[
                  styles.typeBadge,
                  { backgroundColor: getTypeColor(type) },
                ]}
              >
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          <View style={styles.abilitiesContainer}>
            {pokemon.abilities?.map((ability: string) => (
              <View key={ability} style={styles.abilityItem}>
                <Text style={styles.abilityText}>• {ability}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsPreview}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{pokemon.height / 10}m</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{pokemon.weight / 10}kg</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any, isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      width: cardWidth,
      backgroundColor: colors.card,
      borderRadius: 25,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: isDarkMode ? 0.5 : 0.2,
      shadowRadius: 10,
      elevation: 8,
      overflow: 'hidden',
    },
    imageWrapper: {
      backgroundColor: isDarkMode ? '#2C2C2C' : '#F8F8F8',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    imageBackground: {
      width: cardWidth * 0.5,
      height: cardWidth * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#3C3C3C' : '#E8E8E8',
      borderRadius: 10,
    },
    errorText: {
      color: colors.secondaryText,
      fontSize: 12,
      textAlign: 'center',
    },
    content: {
      padding: 25,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textTransform: 'capitalize',
      marginBottom: 15,
    },
    id: {
      fontSize: 18,
      color: colors.secondaryText,
      fontWeight: '400',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
      marginBottom: 10,
    },
    typesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    typeBadge: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 5,
    },
    typeText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    abilitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    abilityItem: {
      width: '50%',
      marginBottom: 8,
    },
    abilityText: {
      color: colors.text,
      fontSize: 15,
      textTransform: 'capitalize',
    },
    statsPreview: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    statItem: {
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 4,
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });

export default PokemonCard;