export const ChargingStationTypeCurrentType = {
  AC: 'AC',
  DC: 'DC',
} as const;

type ObjectValues<T> = T[keyof T];

export type CurrentType = ObjectValues<typeof ChargingStationTypeCurrentType>;
