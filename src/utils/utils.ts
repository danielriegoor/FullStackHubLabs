export function getYouTubeEmbedUrl(
  url?: string | null,
): string | null {
  if (!url) return null;

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  const id =
    match && match[2].length === 11
      ? match[2]
      : null;
  return id
    ? `https://www.youtube.com/embed/${id}`
    : null;
}
