import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_DECKS_KEY = "recentDecks";

export const saveRecentDeck = async (deckId) => {
  try {
    const savedDecks = await AsyncStorage.getItem(RECENT_DECKS_KEY);
    const recentIds = savedDecks ? JSON.parse(savedDecks) : [];

    // Remove the deck if it already exists, then place it first.
    const updatedIds = [
      deckId,
      ...recentIds.filter((id) => id !== deckId),
    ].slice(0, 5);

    await AsyncStorage.setItem(RECENT_DECKS_KEY, JSON.stringify(updatedIds));
  } catch (error) {
    console.error("Could not save recent deck:", error);
  }
};

export const getRecentDeckIds = async () => {
  try {
    const savedDecks = await AsyncStorage.getItem(RECENT_DECKS_KEY);
    return savedDecks ? JSON.parse(savedDecks) : [];
  } catch (error) {
    console.error("Could not load recent decks:", error);
    return [];
  }
};
