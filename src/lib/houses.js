export const HOUSES = {
  gryffindor: {
    name: 'Gryffindor',
    mascot: 'Lion',
    primary: '#740001',
    accent: '#D3A625',
    bg: '#1A0E0E',
    text: '#F5E6C8',
    motto: 'Daring, nerve, and chivalry',
  },
  slytherin: {
    name: 'Slytherin',
    mascot: 'Serpent',
    primary: '#1A472A',
    accent: '#AAAAAA',
    bg: '#0D1512',
    text: '#EDEDED',
    motto: 'Ambition, cunning, resourcefulness',
  },
  hufflepuff: {
    name: 'Hufflepuff',
    mascot: 'Badger',
    primary: '#ECB939',
    accent: '#372E29',
    bg: '#1C1712',
    text: '#F5E8CE',
    motto: 'Hard work, patience, loyalty',
  },
  ravenclaw: {
    name: 'Ravenclaw',
    mascot: 'Eagle',
    primary: '#0E1A40',
    accent: '#946B2D',
    bg: '#0A0E1F',
    text: '#E3D9C4',
    motto: 'Wit, learning, wisdom',
  },
}

export function getHouseTheme(houseKey) {
  return HOUSES[houseKey] || HOUSES.gryffindor
}