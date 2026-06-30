export interface Monument {
  id: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
  dynasty: string;
  era: string;
  description: string;
  imageUrl: string | null;
}
