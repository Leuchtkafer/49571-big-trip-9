import {getRandomFromObject, getRandomTimeInterval} from '../utils/utils';

const getPoint = () => ({
  types: getRandomFromObject({
    'taxi': `taxi`,
    'bus': `bus`,
    'train': `train`,
    'ship': `ship`,
    'transport': `transport`,
    'drive': `drive`,
    'flight': `flight`,
    'check-in': `check-in`,
    'sightseeing': `sightseeing`,
    'restaurant': `restaurant`,
  }),
  cities: [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
    `Geneva`,
    `Barcelona`,
    `Turin`,
    `Tampere`,
  ],
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  offers: new Set([{
    name: `Add luggage`,
    shortName: `luggage`,
    price: 10,
    isChecked: false,
  },
  {
    name: `Switch to comfort class`,
    shortName: `comfort`,
    price: 35,
    isChecked: false,
  },
  {
    name: `Add meal`,
    shortName: `meal`,
    price: 15,
    isChecked: false,
  },
  {
    name: `Choose seats`,
    shortName: `seats`,
    price: 5,
    isChecked: false,
  },
  {
    name: `Travel by train`,
    shortName: `train`,
    price: 40,
    isChecked: false,
  }]),
  destination: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  time: getRandomTimeInterval(),
  price: Math.floor(Math.random() * 20),
  isFavorite: Boolean(Math.round(Math.random())),
});

const filters = [
  {
    title: `everything`,
    isChecked: true,
  },
  {
    title: `future`,
    isChecked: false,
  },
  {
    title: `past`,
    isChecked: false,
  },
];

const menu = [`Table`, `Stats`];

export {getPoint, filters, menu};
