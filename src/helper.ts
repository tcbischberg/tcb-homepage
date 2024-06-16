export const shouldShowInternalArticles = import.meta.env.VITE_SHOW_INTERNAL_ARTICLES === 'true';

if (shouldShowInternalArticles) {
  console.log('Internal articles are shown.');
} else {
  console.log('Internal articles are hidden.');
}
