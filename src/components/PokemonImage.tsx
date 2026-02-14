import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

interface PokemonImageProps {
  imageUrl: string;
  width?: number;
  height?: number;
  style?: any;
  fallbackUrl?: string;
}

const PokemonImage: React.FC<PokemonImageProps> = ({ 
  imageUrl, 
  width = 100, 
  height = 100,
  style,
  fallbackUrl 
}) => {
  const [isSvg, setIsSvg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>(imageUrl);
  const { colors } = useTheme();

  useEffect(() => {
    // Check if the URL ends with .svg
    const checkIfSvg = () => {
      const extension = imageUrl.split('.').pop()?.toLowerCase();
      setIsSvg(extension === 'svg');
      setCurrentUrl(imageUrl);
      setError(false);
    };

    checkIfSvg();
  }, [imageUrl]);

  const handleError = () => {
    if (fallbackUrl && !error) {
      setCurrentUrl(fallbackUrl);
      setIsSvg(false);
      setError(true);
    } else {
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const styles = createStyles();

  if (isSvg) {
    return (
      <View style={[styles.container, { width, height }]}>
        {loading && (
          <View style={[styles.loadingContainer, { width, height }]}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
        <SvgUri
          width={width}
          height={height}
          uri={currentUrl}
          onLoad={handleLoad}
          onError={handleError}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      {loading && (
        <View style={[styles.loadingContainer, { width, height }]}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
      <Image
        source={{ uri: currentUrl }}
        style={[style, { width, height }]}
        resizeMode="contain"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={handleLoad}
        onError={handleError}
      />
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
      zIndex: 1,
    },
  });

export default PokemonImage;