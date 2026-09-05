// src/navigation/types.ts

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: { id: string | number; name: string };
};