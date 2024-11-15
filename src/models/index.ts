export interface ICard {
  id: number | string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [string];
  url: string;
  created: Date;
}

export interface ISendData {
  url: string;
  params: object
}
export interface ILocation {
  name: string;
  url: string;
  id?: number
}
