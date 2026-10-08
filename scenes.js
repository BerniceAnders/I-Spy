/*
  Scene map for the I Spy game.
  All target coordinates use the source image coordinate system: 1122 x 1402.
  Each target can have multiple valid hit circles. This is useful when an AI-generated scene
  contains more than one matching object.
*/
const SOURCE_WIDTH = 1122;
const SOURCE_HEIGHT = 1402;

const FOUR_CHECKS = [
  { x: 160, y: 1252 },
  { x: 420, y: 1252 },
  { x: 690, y: 1252 },
  { x: 955, y: 1252 }
];

const TEN_CHECKS = [60,170,280,390,500,610,720,830,940,1050].map(x => ({ x, y: 1218 }));

const hit = (x, y, r) => ({ x, y, r });

const SCENES = [
  {
    id: 'sk-original',
    name: 'SuperKitties Playground',
    image: 'assets/scenes/sk_original.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(415, 935, 48)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(625, 425, 46)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(1015, 610, 48)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(245, 250, 50)] }
    ]
  },
  {
    id: 'sk-harder',
    name: 'SuperKitties Treehouse',
    image: 'assets/scenes/sk_harder.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(250, 910, 46)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(660, 430, 44)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(1005, 625, 46)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(215, 250, 46)] }
    ]
  },
  {
    id: 'sk-seaside',
    name: 'SuperKitties Seaside',
    image: 'assets/scenes/sk_seaside.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(255, 365, 42)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(1030, 600, 44)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(440, 985, 46)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(140, 520, 46)] }
    ]
  },
  {
    id: 'sk-carnival',
    name: 'SuperKitties Carnival',
    image: 'assets/scenes/sk_carnival.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(105, 925, 45)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(770, 800, 44)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(930, 980, 44)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(190, 195, 44)] }
    ]
  },
  {
    id: 'sk-museum',
    name: 'SuperKitties Museum',
    image: 'assets/scenes/sk_museum.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(145, 930, 46)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(160, 300, 39)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(865, 360, 43)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(610, 590, 43)] }
    ]
  },
  {
    id: 'sk-garden',
    name: 'SuperKitties Garden Maze',
    image: 'assets/scenes/sk_garden.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(850, 835, 43)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(940, 235, 39)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(175, 320, 42)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(485, 985, 44)] }
    ]
  },
  {
    id: 'sk-winter',
    name: 'SuperKitties Winter Village',
    image: 'assets/scenes/sk_winter.jpg',
    checks: FOUR_CHECKS,
    targets: [
      { id: 'buddy', label: 'Buddy', checkIndex: 0, hits: [hit(275, 275, 41)] },
      { id: 'bitsy', label: 'Bitsy', checkIndex: 1, hits: [hit(770, 410, 41)] },
      { id: 'sparks', label: 'Sparks', checkIndex: 2, hits: [hit(245, 855, 44)] },
      { id: 'genny', label: 'Genny', checkIndex: 3, hits: [hit(970, 955, 44)] }
    ]
  },
  {
    id: 'items-playroom',
    name: 'Playroom',
    image: 'assets/scenes/items_playroom.jpg',
    checks: TEN_CHECKS,
    targets: [
      { id: 'toy-car', label: 'toy car', checkIndex: 0, hits: [hit(690, 920, 48)] },
      { id: 'rubber-duck', label: 'rubber duck', checkIndex: 1, hits: [hit(590, 860, 40)] },
      { id: 'ball', label: 'ball', checkIndex: 2, hits: [hit(460, 840, 50)] },
      { id: 'teddy-bear', label: 'teddy bear', checkIndex: 3, hits: [hit(575, 355, 40)] },
      { id: 'dinosaur', label: 'dinosaur', checkIndex: 4, hits: [hit(325, 650, 58)] },
      { id: 'stacking-rings', label: 'stacking rings', checkIndex: 5, hits: [hit(880, 790, 52)] },
      { id: 'cupcake', label: 'cupcake', checkIndex: 6, hits: [hit(240, 815, 37)] },
      { id: 'kite', label: 'kite', checkIndex: 7, hits: [hit(790, 250, 58)] },
      { id: 'sock', label: 'sock', checkIndex: 8, hits: [hit(880, 1045, 50)] },
      { id: 'star', label: 'star', checkIndex: 9, hits: [hit(1025, 215, 48)] }
    ]
  },
  {
    id: 'items-farm',
    name: 'Farm',
    image: 'assets/scenes/items_farm.jpg',
    checks: TEN_CHECKS,
    targets: [
      { id: 'tractor', label: 'tractor', checkIndex: 0, hits: [hit(200, 455, 78)] },
      /* The generated art rendered the intended chick as the hen in the coop; this target is centered on that bird. */
      { id: 'chick', label: 'chick', checkIndex: 1, hits: [hit(1010, 680, 38)] },
      { id: 'apple', label: 'apple', checkIndex: 2, hits: [hit(70, 835, 34), hit(145, 200, 28), hit(40, 235, 28), hit(105, 260, 28), hit(175, 270, 28)] },
      { id: 'carrot', label: 'carrot', checkIndex: 3, hits: [hit(390, 815, 31), hit(195, 1040, 35)] },
      { id: 'sunflower', label: 'sunflower', checkIndex: 4, hits: [hit(1005, 430, 42), hit(1070, 455, 39)] },
      { id: 'milk-bottle', label: 'milk bottle', checkIndex: 5, hits: [hit(840, 745, 40)] },
      { id: 'boot', label: 'boot', checkIndex: 6, hits: [hit(770, 930, 45)] },
      { id: 'watering-can', label: 'watering can', checkIndex: 7, hits: [hit(520, 925, 55)] },
      { id: 'basket', label: 'basket', checkIndex: 8, hits: [hit(405, 1000, 58)] },
      { id: 'egg', label: 'egg', checkIndex: 9, hits: [hit(1000, 810, 36)] }
    ]
  },
  {
    id: 'items-beach',
    name: 'Beach',
    image: 'assets/scenes/items_beach.jpg',
    checks: TEN_CHECKS,
    targets: [
      { id: 'bucket', label: 'bucket', checkIndex: 0, hits: [hit(420, 895, 50)] },
      { id: 'shovel', label: 'shovel', checkIndex: 1, hits: [hit(500, 930, 44)] },
      { id: 'seashell', label: 'seashell', checkIndex: 2, hits: [hit(350, 1040, 40)] },
      { id: 'beach-ball', label: 'beach ball', checkIndex: 3, hits: [hit(325, 720, 62)] },
      { id: 'sunglasses', label: 'sunglasses', checkIndex: 4, hits: [hit(250, 855, 44)] },
      { id: 'starfish', label: 'starfish', checkIndex: 5, hits: [hit(690, 1010, 45)] },
      { id: 'crab', label: 'crab', checkIndex: 6, hits: [hit(635, 875, 46)] },
      { id: 'kite', label: 'kite', checkIndex: 7, hits: [hit(695, 245, 58)] },
      { id: 'popsicle', label: 'popsicle', checkIndex: 8, hits: [hit(770, 755, 40)] },
      { id: 'sailboat', label: 'sailboat', checkIndex: 9, hits: [hit(675, 430, 48)] }
    ]
  },
  {
    id: 'items-garden',
    name: 'Garden Picnic',
    image: 'assets/scenes/items_garden.jpg',
    checks: TEN_CHECKS,
    targets: [
      { id: 'butterfly', label: 'butterfly', checkIndex: 0, hits: [hit(430, 315, 42)] },
      { id: 'strawberry', label: 'strawberry', checkIndex: 1, hits: [hit(400, 785, 30)] },
      { id: 'snail', label: 'snail', checkIndex: 2, hits: [hit(805, 690, 34)] },
      { id: 'teacup', label: 'teacup', checkIndex: 3, hits: [hit(460, 720, 42)] },
      { id: 'watering-can', label: 'watering can', checkIndex: 4, hits: [hit(950, 610, 48)] },
      { id: 'picnic-basket', label: 'picnic basket', checkIndex: 5, hits: [hit(240, 640, 72)] },
      { id: 'ladybug', label: 'ladybug', checkIndex: 6, hits: [hit(1050, 690, 28)] },
      { id: 'frog', label: 'frog', checkIndex: 7, hits: [hit(940, 850, 48)] },
      { id: 'pinwheel', label: 'pinwheel', checkIndex: 8, hits: [hit(1025, 370, 55)] },
      { id: 'flower-pot', label: 'flower pot', checkIndex: 9, hits: [hit(120, 950, 58)] }
    ]
  },
  {
    id: 'items-halloween',
    name: 'Halloween Pumpkin Patch',
    image: 'assets/scenes/items_halloween.jpg',
    checks: TEN_CHECKS,
    targets: [
      { id: 'jack-o-lantern', label: "jack-o'-lantern", checkIndex: 0, hits: [hit(195, 980, 54)] },
      { id: 'ghost', label: 'ghost', checkIndex: 1, hits: [hit(190, 285, 50)] },
      { id: 'bat', label: 'bat', checkIndex: 2, hits: [hit(655, 250, 45)] },
      { id: 'witch-hat', label: 'witch hat', checkIndex: 3, hits: [hit(610, 850, 58)] },
      { id: 'candy-corn', label: 'candy corn', checkIndex: 4, hits: [hit(540, 975, 32)] },
      { id: 'spider', label: 'spider', checkIndex: 5, hits: [hit(720, 845, 36)] },
      { id: 'black-cat', label: 'black cat', checkIndex: 6, hits: [hit(300, 725, 46)] },
      { id: 'broom', label: 'broom', checkIndex: 7, hits: [hit(805, 1010, 52)] },
      { id: 'moon', label: 'moon', checkIndex: 8, hits: [hit(775, 230, 50)] },
      { id: 'pumpkin-bucket', label: 'pumpkin bucket', checkIndex: 9, hits: [hit(1030, 1020, 54)] }
    ]
  }
];
