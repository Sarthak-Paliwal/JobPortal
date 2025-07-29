const getdaysAgo = (dateString) => {
  if (!dateString) return null;
  const postedDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
export default getdaysAgo;