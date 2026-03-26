import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderCurve from '../components/HeaderCurve';
import {RootStackParamList} from '../types/navigation';
import {signupManual} from '../services/authApi';

type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;

function SignupScreen({navigation}: Readonly<SignupScreenProps>) {
  const [userName, setUserName] = useState('Jenimy Flons');
  const [email, setEmail] = useState('Jenimy1989@gmail.com');
  const [password, setPassword] = useState('password1');
  const [hidePassword, setHidePassword] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasMinLength = useMemo(() => password.length >= 8, [password]);
  const hasNumber = useMemo(() => /\d/.test(password), [password]);

  const handleSignup = async () => {
    if (!userName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    if (!hasMinLength || !hasNumber) {
      Alert.alert('Validation', 'Password must be 8+ characters and contain a number.');
      return;
    }

    setIsSubmitting(true);
    const result = await signupManual({
      name: userName.trim(),
      email: email.trim().toLowerCase(),
      password,
      type: 'MANUAL',
    });
    setIsSubmitting(false);

    if (!result.ok) {
      Alert.alert('Signup failed', result.message);
      return;
    }

    Alert.alert('OTP sent', 'Check your email for the OTP code.');
    navigation.navigate('VerifyOtp', {email: email.trim().toLowerCase()});
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.canvas}>
          
        
        <View style={styles.headerWrap}>
            <View style={styles.header}>
              <Text style={styles.heading}>{'Get\nStarted'}
              </Text>
              <Text style={styles.subheading}>
                {'Continue your search for a perfect caregiver'}
              </Text>
            </View>
            <View style={styles.wave}>
              <HeaderCurve color="#F3F3F1" height={220} />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              placeholder="Jenimy Flons"
              placeholderTextColor="#B4B4B9"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholder="Jenimy1989@gmail.com"
              placeholderTextColor="#B4B4B9"
            />

            <Text style={styles.label}>Create Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={setPassword}
                placeholder="........"
                placeholderTextColor="#B4B4B9"
              />
              <Pressable onPress={() => setHidePassword(!hidePassword)}>
                <Text style={styles.togglePassword}>{hidePassword ? 'eye' : 'hide'}</Text>
              </Pressable>
            </View>

            <View style={styles.passwordRules}>
              <Text style={styles.ruleText}>{hasMinLength ? '●' : '○'} Should contain 8+ characters</Text>
              <Text style={styles.ruleText}>{hasNumber ? '●' : '○'} Contains one number</Text>
            </View>

            <Pressable
              style={[styles.primaryButton, isSubmitting ? styles.disabledButton : null]}
              onPress={handleSignup}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryText}>Create Account</Text>
              )}
            </Pressable>

            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.orLine} />
            </View>

            <Pressable style={styles.socialButton}>
              <Text style={styles.socialText}>Sign in with Gmail</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialText}>Sign in with Apple</Text>
            </Pressable>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.bottomLink}>Log In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#595959',
  },
  canvas: {
    backgroundColor: '#F3F3F1',
    minHeight: '100%',
  },
  headerWrap: {
    backgroundColor: '#4A235F',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#4A235F',
    paddingTop: 32,
    paddingHorizontal: 30,
    height: 360,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  subheading: {
    color: '#EFEAF7',
    fontSize: 14,
    maxWidth: 230,
    lineHeight: 22,
  },
  wave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  form: {
    marginTop: -16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  label: {
    color: '#787878',
    fontSize: 15,
    marginBottom: 7,
    marginLeft: 2,
  },
  input: {
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F6F6F9',
    borderWidth: 1,
    borderColor: '#E0E0E5',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1D',
    marginBottom: 12,
  },
  passwordContainer: {
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F6F6F9',
    borderWidth: 1,
    borderColor: '#E0E0E5',
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1D',
  },
  togglePassword: {
    color: '#989898',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  passwordRules: {
    marginBottom: 14,
  },
  ruleText: {
    color: '#29A14E',
    fontSize: 13,
    marginBottom: 3,
  },
  primaryButton: {
    height: 56,
    borderRadius: 30,
    backgroundColor: '#9D46D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.75,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E8',
  },
  orText: {
    color: '#A0A0A0',
    marginHorizontal: 16,
    fontSize: 15,
  },
  socialButton: {
    height: 56,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E5E8',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialText: {
    color: '#252525',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  bottomText: {
    color: '#8B8B8B',
    fontSize: 14,
  },
  bottomLink: {
    color: '#5655E6',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;