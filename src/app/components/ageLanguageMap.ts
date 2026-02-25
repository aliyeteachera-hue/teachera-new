/* ─── Yaş–Dil Eşleştirme Tablosu ──────────────────────────────────────── */
// Her iki modal (Ücretsiz Deneme Seansı & Seviye Tespit) bu tabloyu kullanır.

export const allLanguages = [
  { id: 'en', name: 'İngilizce' },
  { id: 'es', name: 'İspanyolca' },
  { id: 'de', name: 'Almanca' },
  { id: 'fr', name: 'Fransızca' },
  { id: 'it', name: 'İtalyanca' },
  { id: 'ru', name: 'Rusça' },
];

export const ageRanges = ['7–12', '13–17', '18–24', '25–34', '35–44', '45–54', '55+'];

/**
 * Yaş aralığına göre sunulan dil ID'leri.
 * – 7–12  : İngilizce, Almanca
 * – 13–17 : İngilizce, Almanca, İspanyolca, Fransızca
 * – 18+   : Tüm diller
 */
const languagesByAge: Record<string, string[]> = {
  '7–12':  ['en', 'de'],
  '13–17': ['en', 'de', 'es', 'fr'],
  '18–24': ['en', 'es', 'de', 'fr', 'it', 'ru'],
  '25–34': ['en', 'es', 'de', 'fr', 'it', 'ru'],
  '35–44': ['en', 'es', 'de', 'fr', 'it', 'ru'],
  '45–54': ['en', 'es', 'de', 'fr', 'it', 'ru'],
  '55+':   ['en', 'es', 'de', 'fr', 'it', 'ru'],
};

/** Seçilen yaş aralığına göre kullanılabilir dilleri döndürür. */
export function getLanguagesForAge(age: string) {
  const ids = languagesByAge[age];
  if (!ids) return [];
  return allLanguages.filter((l) => ids.includes(l.id));
}
