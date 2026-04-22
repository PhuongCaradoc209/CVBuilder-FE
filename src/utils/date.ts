export const formatDateForInput = (dateString: string | null | undefined) => {
  if (!dateString || dateString === 'Not provided') return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  try {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
};
