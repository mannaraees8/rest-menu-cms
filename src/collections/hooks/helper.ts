export const saniTizeText = (title: any) => {
  // Convert title to lowercase, replace spaces with hyphens, and remove special characters
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
}
