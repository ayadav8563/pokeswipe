import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import PokemonCard from '../components/PokemonCard';
import { fetchRandomPokemon, getPokemonImageUrl } from '../services/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LikedPokemon, RootStackParamList, TransformedPokemon } from '../types/pokemon.types';

type SwipeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Swipe'>;

interface SwipeScreenProps {
  navigation: SwipeScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

const SwipeScreen: React.FC<SwipeScreenProps> = ({ navigation }) => {
  const [currentPokemon, setCurrentPokemon] = useState<TransformedPokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likedPokemon, setLikedPokemon] = useState<LikedPokemon[]>([]);
  const likedPokemonRef = useRef<LikedPokemon[]>([]);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const { colors, isDarkMode } = useTheme();

  // Refs for handler functions to avoid stale closures in PanResponder
  const handleLikeSwipeRef = useRef<() => Promise<void>>(() => Promise.resolve());
  const handleDislikeSwipeRef = useRef<() => void>(() => {});
  const resetPositionRef = useRef<() => void>(() => {});

  // Animation values
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['10deg', '0deg', '-10deg'],
  });
  const likeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const dislikeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const styles = createStyles(colors, isDarkMode);
  useEffect(() => {
    likedPokemonRef.current = likedPokemon;
  }, [likedPokemon]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isSwiping,
        onPanResponderMove: (_, gesture) => {
          if (!isSwiping) {
            position.setValue({ x: gesture.dx, y: gesture.dy });
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (isSwiping) return;
          
          if (gesture.dx < -SWIPE_THRESHOLD) {
            // Left swipe - Like
            handleLikeSwipeRef.current?.().catch(error => {
              console.error('Error in handleLikeSwipe:', error);
            });
          } else if (gesture.dx > SWIPE_THRESHOLD) {
            // Right swipe - Dislike
            handleDislikeSwipeRef.current?.();
          } else {
            // Reset position
            resetPositionRef.current?.();
          }
        },
      }),
    [isSwiping, position]
  );

  const resetPosition = useCallback(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false,
    }).start();
  }, [position]);

  // Update refs when functions change
  useEffect(() => {
    resetPositionRef.current = resetPosition;
  }, [resetPosition]);

  // Define helper functions first
  const saveLikedPokemon = useCallback(async (pokemonList: LikedPokemon[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(pokemonList);
      await AsyncStorage.setItem('likedPokemon', jsonValue);
      console.log('Saved to AsyncStorage:', jsonValue);
    } catch (error) {
      console.error('Error saving liked Pokémon:', error);
    }
  }, []);

  const loadNewPokemon = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const pokemon = await fetchRandomPokemon();
      setCurrentPokemon(pokemon);
    } catch (error) {
      console.error('Error loading Pokémon:', error);
      Alert.alert('Error', 'Failed to load Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetAndLoadNext = useCallback(() => {
    // Reset animation position
    position.setValue({ x: 0, y: 0 });
    setIsSwiping(false);
    setShowFeedback(false);
    loadNewPokemon();
  }, [position, loadNewPokemon]);

  // const handleLikeSwipe = () => {
  //   if (isSwiping || !currentPokemon) return;
    
  //   setIsSwiping(true);
  //   setShowFeedback(true);
  //   setFeedbackMessage('❤️ LIKED!');
    
  //   Animated.timing(position, {
  //     toValue: { x: -width - 100, y: 0 },
  //     duration: 250,
  //     useNativeDriver: false,
  //   }).start(async () => {
  //     await saveLikedPokemonAndLoadNext();
  //   });
  // };
  const handleLikeSwipe = useCallback(async () => {
    if (isSwiping || !currentPokemon) return;
    setIsSwiping(true);
    setShowFeedback(true);
    setFeedbackMessage('❤️ LIKED!');
    
    // Use ref to get the latest state (avoids stale closure issues)
    const currentLiked = likedPokemonRef.current;
    
    // Check if already liked and save if not
    if (!currentLiked.some(p => p.id === currentPokemon.id)) {
      // Use the full currentPokemon object which matches LikedPokemon type
      const updatedLiked = [...currentLiked, currentPokemon as LikedPokemon];
      
      // Update both state and ref
      setLikedPokemon(updatedLiked);
      likedPokemonRef.current = updatedLiked;
      
      // Save to async storage
      try {
        await saveLikedPokemon(updatedLiked);
        console.log('Pokemon saved to AsyncStorage:', currentPokemon.name);
      } catch (error) {
        console.error('Error saving liked Pokémon:', error);
      }
    }
    
    Animated.timing(position, {
      toValue: { x: -width - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setIsSwiping(false);
      setShowFeedback(false);
      loadNewPokemon();
    });
  }, [isSwiping, currentPokemon, position, saveLikedPokemon, loadNewPokemon]);

  // Update ref when function changes
  useEffect(() => {
    handleLikeSwipeRef.current = handleLikeSwipe;
  }, [handleLikeSwipe]);

  const handleDislikeSwipe = useCallback(() => {
    if (isSwiping || !currentPokemon) return;
    
    setIsSwiping(true);
    setShowFeedback(true);
    setFeedbackMessage('👎 DISLIKED!');
    
    Animated.timing(position, {
      toValue: { x: width + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      resetAndLoadNext();
    });
  }, [isSwiping, currentPokemon, position, resetAndLoadNext]);

  // Update ref when function changes
  useEffect(() => {
    handleDislikeSwipeRef.current = handleDislikeSwipe;
  }, [handleDislikeSwipe]);

  const loadLikedPokemon = async (): Promise<void> => {
    try {
      const saved = await AsyncStorage.getItem('likedPokemon');
      if (saved) {
        const parsed = JSON.parse(saved);
        setLikedPokemon(parsed);
        likedPokemonRef.current = parsed; // Update ref as well
        console.log('Loaded liked Pokémon:', parsed);
      } else {
        likedPokemonRef.current = []; // Initialize ref if no saved data
      }
    } catch (error) {
      console.error('Error loading liked Pokémon:', error);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     loadLikedPokemon();
  //     loadNewPokemon();
  //     position.setValue({ x: 0, y: 0 });
  //   }, [])
  // );
  useFocusEffect(
    useCallback(() => {
      loadLikedPokemon();
      if (!currentPokemon) loadNewPokemon();  // Only if no pokemon
      position.setValue({ x: 0, y: 0 });
    }, [currentPokemon, loadNewPokemon, position])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Catching a Pokémon...</Text>
      </View>
    );
  }

  const cardStyle = {
    transform: [
      ...position.getTranslateTransform(),
      { rotate: rotate }
    ]
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PokéSwipe</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('LikedPokemon')}
          style={styles.collectionButton}
        >
          <Text style={styles.collectionText}>📋</Text>
          {likedPokemon.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{likedPokemon.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {/* Like/Dislike indicators */}
        <Animated.View style={[styles.likeIndicator, { opacity: likeOpacity }]}>
          <Text style={styles.likeIndicatorText}>❤️ LIKE</Text>
        </Animated.View>
        <Animated.View style={[styles.dislikeIndicator, { opacity: dislikeOpacity }]}>
          <Text style={styles.dislikeIndicatorText}>👎 DISLIKE</Text>
        </Animated.View>
        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{feedbackMessage}</Text>
          </View>
        )}
        {currentPokemon && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.cardWrapper, cardStyle]}
          >
            <PokemonCard
              pokemon={currentPokemon}
              imageUrl={getPokemonImageUrl(currentPokemon.id)}
            />
          </Animated.View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLikeSwipe}
          activeOpacity={0.7}
          disabled={isSwiping || !currentPokemon}
        >
          <Text style={styles.actionButtonText}>❤️</Text>
          <Text style={styles.actionLabel}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={handleDislikeSwipe}
          activeOpacity={0.7}
          disabled={isSwiping || !currentPokemon}
        >
          <Text style={styles.actionButtonText}>👎</Text>
          <Text style={styles.actionLabel}>Dislike</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Swipe left to like, right to dislike!
        </Text>
      </View>
    </View>
  );
};

const createStyles = (colors: any, _isDarkMode: boolean) =>
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
    collectionButton: {
      padding: 10,
      position: 'relative',
    },
    collectionText: {
      fontSize: 28,
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: colors.primary,
      borderRadius: 12,
      minWidth: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      position: 'relative',
    },
    cardWrapper: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    likeIndicator: {
      position: 'absolute',
      top: 50,
      left: 30,
      zIndex: 3,
      backgroundColor: 'rgba(76, 175, 80, 0.9)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      transform: [{ rotate: '-15deg' }],
    },
    dislikeIndicator: {
      position: 'absolute',
      top: 50,
      right: 30,
      zIndex: 3,
      backgroundColor: 'rgba(244, 67, 54, 0.9)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      transform: [{ rotate: '15deg' }],
    },
    likeIndicatorText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    dislikeIndicatorText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    feedbackContainer: {
      position: 'absolute',
      top: '50%',
      alignSelf: 'center',
      zIndex: 4,
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 30,
    },
    feedbackText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 30,
      paddingBottom: 40,
    },
    actionButton: {
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 15,
      minWidth: width * 0.35,
    },
    likeButton: {
      backgroundColor: colors.like,
    },
    dislikeButton: {
      backgroundColor: colors.dislike,
    },
    actionButtonText: {
      fontSize: 32,
      marginBottom: 5,
    },
    actionLabel: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    footer: {
      paddingBottom: 30,
      alignItems: 'center',
    },
    footerText: {
      color: colors.secondaryText,
      fontSize: 14,
      fontStyle: 'italic',
    },
  });

export default SwipeScreen;