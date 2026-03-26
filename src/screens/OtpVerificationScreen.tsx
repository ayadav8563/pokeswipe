import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import AuthLayout from '../components/AuthLayout';
import {RootStackParamList} from '../types/navigation';
import {verifyOtp} from '../services/authApi';

type OtpScreenProps = StackScreenProps<RootStackParamList, 'VerifyOtp'>;

function OtpVerificationScreen({route, navigation}: Readonly<OtpScreenProps>) {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    if (!otp.trim()) {
      Alert.alert('Validation', 'Please enter OTP.');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyOtp({
      email: route.params.email,
      otp: otp.trim(),
    });
    setIsSubmitting(false);

    if (!result.ok) {
      Alert.alert('Invalid OTP', result.message);
      return;
    }

    Alert.alert('Success', 'Account verified. Please log in now.');
    navigation.replace('Login');
  };

  return (
    <AuthLayout
      title="Verify OTP"
      heading={'Enter\nCode'}
      subheading={`We sent an OTP to\n${route.params.email}`}>
      <View style={styles.container}>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.otpInput}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Enter OTP"
          placeholderTextColor="#9A9A9A"
        />
        <Pressable
          style={[styles.verifyButton, isSubmitting && styles.disabledButton]}
          onPress={handleVerify}
          disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.verifyText}>Verify</Text>
          )}
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: '#999999',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 8,
  },
  otpInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 66,
    paddingHorizontal: 24,
    fontSize: 28,
    letterSpacing: 6,
    color: '#111111',
    marginBottom: 24,
  },
  verifyButton: {
    height: 66,
    borderRadius: 40,
    backgroundColor: '#9E3DD9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  disabledButton: {
    opacity: 0.75,
  },
});

export default OtpVerificationScreen;
