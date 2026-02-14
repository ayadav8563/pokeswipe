// src/screens/WelcomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from '../components/DarkModeToggle';
import { RootStackParamList } from '../types/pokemon.types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();

  const styles = createStyles(colors, isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PokéSwipe</Text>
        <DarkModeToggle />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
          style={styles.pokeball}
        />

        <Text style={styles.subtitle}>Gotta Catch Your Love!</Text>

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionTitle}>How to Play</Text>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionEmoji}>1️⃣</Text>
            <Text style={styles.instructionText}>Pokémon appear one at a time</Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionEmoji}>2️⃣</Text>
            <Text style={styles.instructionText}>Tap ❤️ if you like them</Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionEmoji}>3️⃣</Text>
            <Text style={styles.instructionText}>Tap 👎 if you don't</Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionEmoji}>4️⃣</Text>
            <Text style={styles.instructionText}>No skipping! Every Pokémon needs a choice</Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionEmoji}>5️⃣</Text>
            <Text style={styles.instructionText}>View your liked Pokémon in the collection</Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>✨ Features ✨</Text>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🎮</Text>
            <Text style={styles.featureText}>1000+ Pokémon to discover</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>View abilities & types</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🌙</Text>
            <Text style={styles.featureText}>Dark mode for night training</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>💾</Text>
            <Text style={styles.featureText}>Build your dream team</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Swipe')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start Your Journey! 🚀</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Data provided by PokéAPI
        </Text>
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary,
      textShadowColor: '#FFCB05',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    scrollContent: {
      paddingHorizontal: 20,
      alignItems: 'center',
      paddingBottom: 40,
    },
    pokeball: {
      width: 120,
      height: 120,
      marginVertical: 20,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 30,
    },
    instructionsCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 25,
      width: '100%',
      marginBottom: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    instructionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 20,
      textAlign: 'center',
    },
    instructionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    instructionEmoji: {
      fontSize: 20,
      marginRight: 15,
      width: 30,
    },
    instructionText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    featureCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 25,
      width: '100%',
      marginBottom: 30,
      borderWidth: 2,
      borderColor: colors.accent,
    },
    featureTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.accent,
      marginBottom: 15,
      textAlign: 'center',
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureIcon: {
      fontSize: 24,
      marginRight: 15,
    },
    featureText: {
      fontSize: 16,
      color: colors.text,
    },
    startButton: {
      backgroundColor: colors.primary,
      paddingVertical: 18,
      paddingHorizontal: 40,
      borderRadius: 30,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
      marginBottom: 20,
    },
    startButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    footerText: {
      color: colors.secondaryText,
      fontSize: 12,
      marginTop: 10,
    },
  });

export default WelcomeScreen;