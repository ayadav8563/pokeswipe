import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.headerRow}>
            <Image
              source={{uri: 'https://i.pravatar.cc/100?img=24'}}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.locationLabel}>Current Location</Text>
              <Text style={styles.locationValue}>Mexico</Text>
            </View>
            <View style={styles.headerIcons}>
              <View style={styles.iconBadge} />
              <View style={styles.iconBadge} />
            </View>
          </View>
        </View>

        <View style={styles.whiteBody}>
          <Text style={styles.greeting}>
            Goodmorning, <Text style={styles.highlight}>Jenny!</Text>
          </Text>

          <Text style={styles.sectionTitle}>Family At A Glance</Text>
          <View style={styles.familyRow}>
            <View style={styles.familyCard}>
              <Text style={styles.familyName}>Juliana Dane</Text>
              <Text style={styles.familyAge}>43 yrs</Text>
            </View>
            <View style={styles.familyCard}>
              <Text style={styles.familyName}>Emma</Text>
              <Text style={styles.familyAge}>4 yrs</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <View style={styles.recommendedCard}>
            <Image
              source={{uri: 'https://i.pravatar.cc/400?img=47'}}
              style={styles.recommendedImage}
            />
            <View style={styles.recommendedBody}>
              <Text style={styles.cardTitle}>Child Care</Text>
              <Text style={styles.cardPrice}>$22-$40 / hour</Text>
              <Text style={styles.cardMeta}>Part Time • 4.85 (215 reviews)</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Messages</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <View style={styles.messageItem}>
            <Image source={{uri: 'https://i.pravatar.cc/100?img=15'}} style={styles.msgAvatar} />
            <View style={styles.messageBody}>
              <Text style={styles.messageName}>Jancy Peter</Text>
              <Text style={styles.messageText}>What time should I reach today?</Text>
            </View>
            <View style={styles.messageBadge}>
              <Text style={styles.messageBadgeText}>2</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentName}>Juliana Dane</Text>
            <Text style={styles.appointmentMeta}>Today • 11:00 - 1:30</Text>
            <Text style={styles.appointmentMeta}>Miami, Florida • $15 - $25/hr</Text>
          </View>

          <View style={styles.footerCard}>
            <Text style={styles.footerBrand}>Serena</Text>
            <Text style={styles.footerText}>Find a help. Build a career. Create your future.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#4E4E50'},
  content: {paddingBottom: 20},
  hero: {
    backgroundColor: '#3A165F',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
    borderBottomRightRadius: 120,
  },
  headerRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 50, height: 50, borderRadius: 25, marginRight: 10},
  locationLabel: {fontSize: 11, color: '#C5B9D6'},
  locationValue: {fontSize: 16, color: '#FFFFFF', fontWeight: '700'},
  headerIcons: {marginLeft: 'auto', flexDirection: 'row', gap: 8},
  iconBadge: {height: 28, width: 28, borderRadius: 14, backgroundColor: '#F9F7FB'},
  whiteBody: {
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  greeting: {fontSize: 24, color: '#4F4F52', marginBottom: 10, fontWeight: '700'},
  highlight: {color: '#6A2EA3'},
  sectionTitle: {fontSize: 18, color: '#5A4A6D', fontWeight: '800'},
  sectionHeader: {
    marginTop: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {color: '#8678A0', fontWeight: '600'},
  familyRow: {flexDirection: 'row', gap: 10},
  familyCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#F9F8FB',
    borderColor: '#ECE5F5',
    borderWidth: 1,
  },
  familyName: {fontWeight: '700', color: '#3C3554', fontSize: 15},
  familyAge: {color: '#9B96AA', marginTop: 4},
  recommendedCard: {
    borderRadius: 14,
    overflow: 'hidden',
    borderColor: '#ECE5F5',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  recommendedImage: {height: 160, width: '100%'},
  recommendedBody: {padding: 12},
  cardTitle: {color: '#8E8A9F', fontSize: 13, marginBottom: 2},
  cardPrice: {fontSize: 18, fontWeight: '800', color: '#553778', marginBottom: 6},
  cardMeta: {color: '#8E8A9F', fontSize: 13},
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#EFEAF4',
    borderBottomWidth: 1,
  },
  msgAvatar: {height: 46, width: 46, borderRadius: 23, marginRight: 10},
  messageBody: {flex: 1},
  messageName: {fontWeight: '700', color: '#4B4563'},
  messageText: {color: '#8E8A9F', marginTop: 2},
  messageBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8E3FD8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBadgeText: {color: '#FFFFFF', fontWeight: '700'},
  appointmentCard: {
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#F9F8FB',
    borderColor: '#ECE5F5',
    borderWidth: 1,
  },
  appointmentName: {fontWeight: '800', color: '#473A67', marginBottom: 4},
  appointmentMeta: {color: '#8E8A9F', marginBottom: 2},
  footerCard: {
    marginTop: 20,
    borderTopWidth: 3,
    borderTopColor: '#5C2D8E',
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  footerBrand: {fontSize: 42, color: '#5C2D8E', fontWeight: '400'},
  footerText: {fontSize: 34, lineHeight: 38, color: '#C8C5CE', fontWeight: '700', maxWidth: 320},
});

export default DashboardScreen;
