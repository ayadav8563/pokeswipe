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
import HeaderCurve from '../components/HeaderCurve';

function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('Jenimy1989@gmail.com');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('password');

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const hasMinLength = useMemo(() => password.length >= 8, [password]);
  const hasNumber = useMemo(() => /\d/.test(password), [password]);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateUsername = () => {
    if (!isLogin && !username.trim()) {
      setUsernameError('Username is required');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      return false;
    }
    if (!isLogin && (!hasMinLength || !hasNumber)) {
      setPasswordError('Password must be 8+ chars and contain a number');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = () => {
    const okEmail = validateEmail(email);
    const okUsername = validateUsername();
    const okPassword = validatePassword();

    if (!okEmail || !okUsername || !okPassword) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', isLogin ? 'Logged in!' : 'Account created!');
    }, 700);
  };

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.canvas}>
          <View style={styles.headerWrap}>
            <View style={styles.header}>
              <Text style={styles.heading}>{'Welcome\nBack'}
              </Text>
              <Text style={styles.subheading}>
                {'Join our trusted care network'}
              </Text>
            </View>
            <View style={styles.wave}>
              <HeaderCurve color="#F3F3F1" height={220} />
            </View>
          </View>

          <View style={styles.form}>
            {!isLogin ? (
              <>
                <Text style={styles.label}>User Name</Text>
                <TextInput
                  style={[styles.input, usernameError ? styles.inputError : null]}
                  placeholder="Jenimy Flons"
                  placeholderTextColor="#B4B4B9"
                  value={username}
                  onChangeText={setUsername}
                  onBlur={validateUsername}
                />
                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
              </>
            ) : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Jenimy1989@gmail.com"
              placeholderTextColor="#B4B4B9"
              value={email}
              onChangeText={setEmail}
              onBlur={() => validateEmail(email)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={styles.label}>{isLogin ? 'Password' : 'Create Password'}</Text>
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="........"
              placeholderTextColor="#B4B4B9"
              value={password}
              onChangeText={setPassword}
              onBlur={validatePassword}
              secureTextEntry
            />

            {!isLogin ? (
              <View style={styles.rules}>
                <Text style={[styles.rule, hasMinLength ? styles.ruleMet : null]}>
                  {hasMinLength ? '●' : '○'} Should contain 8+ characters
                </Text>
                <Text style={[styles.rule, hasNumber ? styles.ruleMet : null]}>
                  {hasNumber ? '●' : '○'} Contains one number
                </Text>
              </View>
            ) : null}

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {isLogin ? <Text style={styles.forgot}>Forgot Password?</Text> : null}

            <Pressable style={styles.cta} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.ctaText}>{isLogin ? 'Continue' : 'Create Account'}</Text>
              )}
            </Pressable>

            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.orLine} />
            </View>

            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialText}>Sign in with Gmail</Text>
            </Pressable>
            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialText}>Sign in with Apple</Text>
            </Pressable>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {isLogin ? "Don’t have an account?" : 'Already have an account?'}
              </Text>
              <Pressable onPress={toggleMode}>
                <Text style={styles.toggleLink}>{isLogin ? 'Sign up' : 'Log In'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#595959'},
  canvas: { backgroundColor: '#F3F3F1', minHeight: '100%'},
  headerWrap: {backgroundColor: '#4A235F', overflow: 'hidden'},
  header: {backgroundColor: '#4A235F', paddingTop: 32, paddingHorizontal: 30, height: 360},
  heading: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  subheading: {color: '#EFEAF7', fontSize: 14, lineHeight: 25, maxWidth: 230},
  wave: {position: 'absolute', left: 0, right: 0, bottom: 0},
  form: {marginTop: -16, paddingHorizontal: 24, paddingBottom: 34},
  label: {color: '#787878', fontSize: 15, marginBottom: 7, marginLeft: 2},
  input: {
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F6F6F9',
    borderWidth: 1,
    borderColor: '#E0E0E5',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1D',
    marginBottom: 14,
  },
  inputError: {borderColor: '#D94F4F'},
  errorText: {color: '#D94F4F', marginTop: -8, marginBottom: 10, fontSize: 12},
  forgot: {textAlign: 'right', color: '#9D9D9D', marginBottom: 18, fontSize: 14},
  cta: {
    height: 56,
    borderRadius: 30,
    backgroundColor: '#9D46D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  ctaText: {color: '#FFFFFF', fontWeight: '700', fontSize: 17},
  orRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 18},
  orLine: {flex: 1, height: 1, backgroundColor: '#E5E5E8'},
  orText: {color: '#A0A0A0', marginHorizontal: 16, fontSize: 15},
  socialBtn: {
    height: 56,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E5E8',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialText: {color: '#252525', fontSize: 16, fontWeight: '600'},
  toggleRow: {marginTop: 16, flexDirection: 'row', justifyContent: 'center', gap: 6},
  toggleText: {color: '#8B8B8B', fontSize: 14},
  toggleLink: {
    color: '#5655E6',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  rules: {marginTop: -6, marginBottom: 10},
  rule: {color: '#8F8F8F', fontSize: 12, marginBottom: 3},
  ruleMet: {color: '#2CA453'},
});

export default LoginScreen;