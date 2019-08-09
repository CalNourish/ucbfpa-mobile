const IMAGES = {
  milk: require('../assets/images/inventory/milk.jpg'),
  canned_foods: require('../assets/images/inventory/canned_foods.jpg'),
  frozen: require('../assets/images/inventory/frozen.jpg'),
  grains: require('../assets/images/inventory/grains.jpg'),
  eggs: require('../assets/images/inventory/eggs.jpg'),
  sauces: require('../assets/images/inventory/sauces.jpg'),
  yogurt:require('../assets/images/inventory/yogurt.jpg'),
  spices: require('../assets/images/inventory/spices.jpg')
}

export function getImage(fileName) {
  return IMAGES[fileName];
}