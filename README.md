# PokéSwipe 🎮

A React Native mobile application that lets you swipe through Pokémon like a dating app! Swipe left to like, swipe right to dislike, and build your collection of favorite Pokémon.

## 📱 Features

- **Swipe Gestures**: Intuitive swipe gestures to like or dislike Pokémon
- **Like Button**: Alternative way to like Pokémon with a button press
- **Collection Management**: View and manage your liked Pokémon collection
- **Persistent Storage**: Your liked Pokémon are saved using AsyncStorage
- **Dark Mode**: Toggle between light and dark themes
- **Random Pokémon**: Discover random Pokémon from generations 1-8
- **Beautiful UI**: Modern, animated interface with smooth transitions

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DarkModeToggle.tsx    # Dark mode toggle switch
│   ├── PokemonCard.tsx       # Card component for displaying Pokémon
│   └── PokemonImage.tsx      # Image component with fallback handling
│
├── context/             # React Context providers
│   └── ThemeContext.tsx      # Theme management (light/dark mode)
│
├── screens/             # Screen components
│   ├── WelcomeScreen.tsx     # Welcome/landing screen
│   ├── SwipeScreen.tsx       # Main swipe interface
│   └── LikedPokemonScreen.tsx # Collection view screen
│
├── services/           # API and external services
│   └── pokeapi.ts           # Pokémon API integration
│
└── types/               # TypeScript type definitions
    ├── pokemon.types.ts      # Pokémon-related types
    └── theme.types.ts        # Theme-related types
```

## 📂 Detailed Structure

### Components (`src/components/`)

#### `DarkModeToggle.tsx`
- Toggle component for switching between light and dark themes
- Integrates with ThemeContext

#### `PokemonCard.tsx`
- Displays Pokémon information in a card format
- Shows name, types, stats, and abilities
- Used in both SwipeScreen and LikedPokemonScreen

#### `PokemonImage.tsx`
- Handles Pokémon image loading with fallback support
- Supports SVG and PNG formats
- Error handling for failed image loads

### Context (`src/context/`)

#### `ThemeContext.tsx`
- Manages application-wide theme state
- Provides light/dark mode functionality
- Supplies theme colors to all components

### Screens (`src/screens/`)

#### `WelcomeScreen.tsx`
- Landing screen with app introduction
- Instructions on how to use the app
- Navigation to SwipeScreen

#### `SwipeScreen.tsx`
- Main interaction screen
- Implements PanResponder for swipe gestures
- Handles like/dislike actions
- Saves liked Pokémon to AsyncStorage
- Features animated card transitions
- Shows feedback messages during swipes

#### `LikedPokemonScreen.tsx`
- Displays collection of liked Pokémon
- Grid layout for browsing
- Remove Pokémon from collection
- Loads data from AsyncStorage

### Services (`src/services/`)

#### `pokeapi.ts`
- **`fetchRandomPokemon()`**: Fetches a random Pokémon (ID 1-898)
- **`getPokemonImageUrl()`**: Returns dream-world SVG image URL
- **`getOfficialArtworkUrl()`**: Returns official artwork PNG URL
- **`fetchMultipleRandomPokemon()`**: Fetches multiple random Pokémon

### Types (`src/types/`)

#### `pokemon.types.ts`
- `PokemonAPIResponse`: Raw API response structure
- `TransformedPokemon`: Transformed Pokémon data structure
- `LikedPokemon`: Extends TransformedPokemon for saved Pokémon
- `RootStackParamList`: Navigation route types

#### `theme.types.ts`
- Theme-related type definitions

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.11.0
- React Native development environment set up
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demoSwipe
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (Mac only):
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Start Metro Bundler
```bash
npm start
```

## 🎮 How to Use

1. **Start Swiping**: Tap "Start Swiping" on the welcome screen
2. **Like a Pokémon**: Swipe left or tap the ❤️ button
3. **Dislike a Pokémon**: Swipe right or tap the 👎 button
4. **View Collection**: Tap the 📋 icon in the header to see your liked Pokémon
5. **Remove Pokémon**: Long press or use the remove option in your collection

## 🛠️ Technologies Used

- **React Native** (0.84.0) - Mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client for API calls
- **React Native Gesture Handler** - Gesture recognition
- **React Native Reanimated** - Animations
- **PokeAPI** - Pokémon data source

## 📦 Key Dependencies

```json
{
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-navigation/native": "^7.1.28",
  "@react-navigation/stack": "^7.7.1",
  "axios": "^1.13.5",
  "react-native-gesture-handler": "^2.30.0",
  "react-native-reanimated": "^4.2.1"
}
```

## 🎨 Features in Detail

### Swipe Gestures
- Uses `PanResponder` for native gesture handling
- Threshold-based swipe detection
- Smooth animations with React Native Animated API
- Visual feedback during swipes (like/dislike indicators)

### Data Persistence
- Liked Pokémon saved to AsyncStorage
- Automatic loading on app start
- Real-time collection updates

### Theme System
- Context-based theme management
- Light and dark mode support
- Persistent theme preference

## 🔧 Development

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## 📝 Notes

- Pokémon IDs range from 1-898 (Generations 1-8)
- Images use dream-world SVG format from PokeAPI sprites
- All liked Pokémon data is stored locally on the device

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

---

Made with ❤️ using React Native and the PokeAPI
