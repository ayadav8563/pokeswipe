import React, {ReactNode} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type AuthLayoutProps = {
  title: string;
  heading: string;
  subheading: string;
  children: ReactNode;
  showTopLabel?: boolean;
};

function AuthLayout({
  title,
  heading,
  subheading,
  children,
  showTopLabel = true,
}: Readonly<AuthLayoutProps>) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.screen}>
          {showTopLabel ? <Text style={styles.topLabel}>{title}</Text> : null}

          <View style={styles.hero}>
            <Text style={styles.heading}>{heading}</Text>
            <Text style={styles.subheading}>{subheading}</Text>
          </View>

          <View style={styles.content}>{children}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4D4D4D',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  screen: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: '#4D4D4D',
  },
  topLabel: {
    color: '#D5D4D8',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 12,
    marginTop: 4,
  },
  hero: {
    backgroundColor: '#3A165F',
    borderBottomRightRadius: 240,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 32,
    paddingTop: 52,
    paddingBottom: 88,
    zIndex: 1,
    minHeight: 318,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '800',
    lineHeight: 56,
    marginBottom: 12,
    maxWidth: 240,
  },
  subheading: {
    color: '#F2EEF6',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 220,
  },
  content: {
    marginTop: -84,
    backgroundColor: '#F5F5F3',
    borderTopLeftRadius: 250,
    borderTopRightRadius: 0,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 20,
  },
});

export default AuthLayout;
