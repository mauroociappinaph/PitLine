export interface Driver {
  id: string;
  driverNumber: number;
  nameAcronym: string;
  fullName: string;
  firstName: string;
  lastName: string;
  teamName: string;
  teamColor: string;
  countryCode: string;
  headshotUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  drivers: Driver[];
}

export interface Session {
  id: string;
  sessionKey: number;
  year: number;
  sessionName: string;
  sessionType: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  location: string;
  countryCode: string;
  circuitShortName: string;
}
