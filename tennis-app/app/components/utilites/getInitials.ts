// utils/getInitials.ts
export const getInitials = (firstName: string, lastName: string): string => {
  if (!firstName || !lastName) return "";
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};
