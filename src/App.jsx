import { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, ArrowLeft, CheckCircle, XCircle, Star, Trophy, HelpCircle, BookOpen, RefreshCw } from 'lucide-react';

const simulations = [
  {
    id: 1,
    topic: 'Structures & Materials',
    topicClass: 'structures',
    title: 'Animal Shelter Structures',
    icon: '🏠',
    intro: {
      title: 'Welcome to Animal Shelters!',
      description: 'Learn about different types of animal homes and how they protect animals from weather!',
      instructions: [
        'Click on each shelter to discover its structure type',
        'Learn which shelters are SHELL or FRAME structures',
        'Watch what happens when rain comes!'
      ],
      goal: 'Discover all 5 animal shelters and learn about their structures!'
    },
    interactions: [
      { x: 100, y: 300, width: 100, height: 80, answer: 'Nest - A SHELL structure made of twigs!', fact: 'Birds weave twigs together to create a strong, flexible nest that protects eggs and babies. The circular shape provides strength and the woven design allows the nest to flex in the wind.' },
      { x: 250, y: 300, width: 100, height: 80, answer: 'Burrow - A FRAME structure dug underground!', fact: 'Animals like rabbits and foxes dig tunnels underground to create safe homes protected from predators and harsh weather. The underground burrow stays cool in summer and warm in winter.' },
      { x: 400, y: 300, width: 100, height: 80, answer: 'Shell - A natural SHELL structure!', fact: 'Snails and turtles carry their homes on their backs! The hard shell protects them from danger and grows with them. It is made of calcium carbonate.' },
      { x: 550, y: 300, width: 100, height: 80, answer: 'Kennel - A FRAME structure with walls and roof!', fact: 'Dog houses use wooden frames to create a sheltered space for pets. The roof keeps rain off and the enclosed walls protect from wind.' },
      { x: 700, y: 300, width: 100, height: 80, answer: 'Kraal - A FRAME structure of fenced circles!', fact: 'Farmers in South Africa have used kraals for thousands of years to protect animals from predators. The circular fence design has no corners where animals can get trapped.' }
    ],
    quiz: [
      { question: 'What type of structure is a snail shell?', options: ['Shell Structure', 'Frame Structure', 'Liquid Structure'], correct: 0 },
      { question: 'Which shelter is built underground?', options: ['Nest', 'Burrow', 'Kennel'], correct: 1 },
      { question: 'What protects animals from rain?', options: ['Shelter', 'Food', 'Music'], correct: 0 }
    ]
  },
  {
    id: 2,
    topic: 'Energy & Matter',
    topicClass: 'structures',
    title: 'Change of State (Water)',
    icon: '💧',
    intro: {
      title: 'Water Magic!',
      description: 'Discover how water changes from ice to steam!',
      instructions: [
        'Click the HEAT button to warm up the water',
        'Click each state to learn what happens to particles',
        'Watch the particles move faster as it gets hotter!'
      ],
      goal: 'Learn about solid, liquid and gas states of matter!'
    },
    interactions: [
      { x: 300, y: 250, width: 150, height: 120, answer: 'SOLID - Ice! Particles are packed tightly together and only vibrate in place.', fact: 'In solids, particles are arranged in a tight pattern called a lattice. They can only wiggle a little!' },
      { x: 300, y: 250, width: 150, height: 120, answer: 'LIQUID - Water! Particles can slide past each other.', fact: 'When we heat ice to 0°C, particles have enough energy to break apart and move around!' },
      { x: 300, y: 250, width: 150, height: 120, answer: 'GAS - Steam! Particles move very fast and spread far apart.', fact: 'At 100°C, water boils and turns to gas. Particles have lots of energy and zoom around!' }
    ],
    quiz: [
      { question: 'At what temperature does water freeze?', options: ['0°C', '100°C', '50°C'], correct: 0 },
      { question: 'What happens to particles when water boils?', options: ['They freeze', 'They spread apart', 'They disappear'], correct: 1 },
      { question: 'What is the melting point of ice?', options: ['0°C', '100°C', '-10°C'], correct: 0 }
    ]
  },
  {
    id: 3,
    topic: 'Living Things',
    topicClass: 'living',
    title: 'What Plants Need to Grow',
    icon: '🌱',
    intro: {
      title: 'Grow Your Own Plant!',
      description: 'Learn what plants need to survive and grow healthy!',
      instructions: [
        'Click each condition (sun, water, warmth) to turn it ON or OFF',
        'Watch how the plant grows differently',
        'Try to grow the tallest plant possible!'
      ],
      goal: 'Discover what plants need to grow strong and healthy!'
    },
    interactions: [
      { x: 100, y: 420, width: 80, height: 60, answer: 'This plant has NO LIGHT - it cannot make food and will turn yellow!', fact: 'Plants need sunlight for PHOTOSYNTHESIS - making food from light!' },
      { x: 300, y: 420, width: 80, height: 60, answer: 'This plant has NO WATER - it will wilt and struggle to survive!', fact: 'Water helps plants carry nutrients from the soil through their stems!' },
      { x: 500, y: 420, width: 80, height: 60, answer: 'This plant has NO WARMTH - it will grow very slowly!', fact: 'Plants grow best in warm weather. Cold slows down their life processes!' },
      { x: 700, y: 420, width: 80, height: 60, answer: 'PERFECT! This plant has ALL it needs - light, water AND warmth!', fact: 'When plants have everything they need, they grow tall, green and healthy!' }
    ],
    quiz: [
      { question: 'What do plants need from sunlight?', options: ['Food', 'Air', 'Music'], correct: 0 },
      { question: 'What part of the plant takes in water from soil?', options: ['Roots', 'Leaves', 'Flowers'], correct: 0 },
      { question: 'What happens without warmth?', options: ['Plants grow faster', 'Plants grow slower', 'Nothing happens'], correct: 1 }
    ]
  },
  {
    id: 4,
    topic: 'Living Things',
    topicClass: 'living',
    title: 'Animal Habitats',
    icon: '🦁',
    intro: {
      title: 'Explore Animal Homes!',
      description: 'Discover where different animals live and why!',
      instructions: [
        'Click on each habitat to see what animals live there',
        'Find out what each habitat provides for animals',
        'See what happens when a habitat loses something!'
      ],
      goal: 'Learn why habitats are important for animal survival!'
    },
    interactions: [
      { x: 50, y: 100, width: 200, height: 180, answer: 'FOREST HABITAT - Home to birds! Provides: Trees for shelter, insects for food, water from streams.', fact: 'Forests have many layers - the canopy, understory, and forest floor. Each layer is home to different animals!' },
      { x: 270, y: 100, width: 200, height: 180, answer: 'DESERT HABITAT - Home to camels! Provides: Sparse plants, sand for shelter, hot days but cool nights.', fact: 'Camels can survive without water for days because they store fat in their humps!' },
      { x: 490, y: 100, width: 200, height: 180, answer: 'RIVER HABITAT - Home to fish! Provides: Clean water, aquatic plants, insects.', fact: 'Rivers provide fresh water - one of the most important resources for all living things!' },
      { x: 710, y: 100, width: 200, height: 180, answer: 'GRASSLAND HABITAT - Home to zebras! Provides: Grass for food, open space to spot predators.', fact: 'Grasslands cover huge areas of Africa! Zebras travel in herds for safety.' }
    ],
    quiz: [
      { question: 'What do all habitats provide?', options: ['Food only', 'Food, water, shelter', 'Television'], correct: 1 },
      { question: 'Which animal lives in a forest?', options: ['Zebra', 'Bird', 'Fish'], correct: 1 },
      { question: 'What is the most important thing in a habitat?', options: ['Rocks', 'Water', 'Sand'], correct: 1 }
    ]
  },
  {
    id: 5,
    topic: 'Earth, Moon & Sun',
    topicClass: 'earth',
    title: 'Earth and Space (Orbits)',
    icon: '🌍',
    intro: {
      title: 'Space Journey!',
      description: 'Explore how Earth and the Moon move in space!',
      instructions: [
        'Click PLAY to start the orbit animation',
        'Click on the Sun, Earth and Moon to learn about them',
        'Watch how the Moon goes around Earth while Earth goes around the Sun!'
      ],
      goal: 'Understand how Earth and Moon orbit in our solar system!'
    },
    interactions: [
      { x: 400, y: 200, width: 100, height: 100, answer: 'THE SUN - Our closest star! It gives us light and heat.', fact: 'The Sun is a giant ball of hot gas. It is so big that 1 million Earths could fit inside it!' },
      { x: 400, y: 350, width: 60, height: 60, answer: 'EARTH - Our home! It takes 365 days to orbit the Sun once.', fact: 'Earth is the only planet we know of that has life. It has just the right temperature for living things!' },
      { x: 500, y: 400, width: 40, height: 40, answer: 'THE MOON - Earth\'s satellite! It orbits Earth.', fact: 'The Moon takes about 27 days to orbit Earth. We see different shapes of the Moon!' }
    ],
    quiz: [
      { question: 'What does Earth orbit?', options: ['The Moon', 'The Sun', 'Mars'], correct: 1 },
      { question: 'How long does Earth take to orbit the Sun?', options: ['1 day', '1 month', '1 year'], correct: 2 },
      { question: 'What is the Moon?', options: ['A planet', 'A star', 'A satellite'], correct: 2 }
    ]
  },
  {
    id: 6,
    topic: 'Energy & Sound',
    topicClass: 'energy',
    title: 'Energy Around Us',
    icon: '⚡',
    intro: {
      title: 'Energy Transformations!',
      description: 'Discover how everyday devices change energy from one type to another!',
      instructions: [
        'Click on each device to see what energy comes IN and goes OUT',
        'Learn how electrical energy becomes other types of energy',
        'Discover which energy is USEFUL and which is WASTED!'
      ],
      goal: 'Understand how energy changes form in everyday objects!'
    },
    interactions: [
      { x: 100, y: 280, width: 120, height: 100, answer: 'KETTLE: Electrical energy comes IN → Heat and steam go OUT!', fact: 'Kettles transform electrical energy into heat energy to boil water. The steam is wasted heat!' },
      { x: 350, y: 280, width: 120, height: 100, answer: 'TORCH: Electrical energy comes IN → Light goes OUT!', fact: 'Torch bulbs transform electrical energy into light energy so we can see in the dark!' },
      { x: 600, y: 280, width: 120, height: 100, answer: 'FAN: Electrical energy comes IN → Movement (kinetic) goes OUT!', fact: 'Fans transform electrical energy into kinetic energy - the movement of air to keep us cool!' }
    ],
    quiz: [
      { question: 'What energy comes OUT of a kettle?', options: ['Light', 'Heat', 'Sound'], correct: 1 },
      { question: 'What energy comes OUT of a fan?', options: ['Cold', 'Movement', 'Food'], correct: 1 },
      { question: 'What energy goes INTO all these devices?', options: ['Solar', 'Electrical', 'Nuclear'], correct: 1 }
    ]
  },
  {
    id: 7,
    topic: 'Energy & Sound',
    topicClass: 'energy',
    title: 'Energy from the Sun',
    icon: '☀️',
    intro: {
      title: 'The Energy Chain!',
      description: 'Follow energy from the Sun through plants to animals!',
      instructions: [
        'Click START to begin the energy flow',
        'Watch the arrows show energy moving from Sun → Plant → Animal',
        'Notice how energy gets LESS at each step!'
      ],
      goal: 'Learn why the Sun is the source of all energy for life!'
    },
    interactions: [
      { x: 100, y: 250, width: 100, height: 80, answer: 'THE SUN - The ultimate source of ALL energy!', fact: 'The Sun sends energy to Earth as light. This energy powers everything on our planet!' },
      { x: 400, y: 250, width: 100, height: 80, answer: 'PLANTS - They capture energy from the Sun!', fact: 'Plants use photosynthesis to turn sunlight into food energy. They are called PRODUCERS!' },
      { x: 700, y: 250, width: 100, height: 80, answer: 'ANIMALS - They eat plants for energy!', fact: 'Animals are CONSUMERS. They get energy by eating plants or other animals!' }
    ],
    quiz: [
      { question: 'What is the original source of energy?', options: ['The Sun', 'The Moon', 'Electricity'], correct: 0 },
      { question: 'What do plants use to capture sunlight?', options: ['Roots', 'Photosynthesis', 'Wings'], correct: 1 },
      { question: 'Animals are called?', options: ['Producers', 'Consumers', 'Batteries'], correct: 1 }
    ]
  },
  {
    id: 8,
    topic: 'Energy & Sound',
    topicClass: 'energy',
    title: 'Energy for Life (Food Chain)',
    icon: '🦗',
    intro: {
      title: 'Food Chain Game!',
      description: 'Build a food chain and see what happens when one link breaks!',
      instructions: [
        'Click START to see the food chain work',
        'Click the grasshopper to REMOVE it from the chain',
        'Watch what happens to the frog and eagle!'
      ],
      goal: 'Understand why every living thing is important in a food chain!'
    },
    interactions: [
      { x: 80, y: 280, width: 80, height: 60, answer: 'SUN - Energy source for everything!', fact: 'All energy in food chains comes from the Sun!' },
      { x: 220, y: 280, width: 80, height: 60, answer: 'GRASS - The producer (makes food from Sun)', fact: 'Grass uses photosynthesis to turn sunlight into food. All animals depend on plants!' },
      { x: 360, y: 280, width: 80, height: 60, answer: 'GRASSHOPPER - Primary consumer (eats grass)', fact: 'Grasshoppers are eaten by many animals. They are important food for frogs and birds!' },
      { x: 500, y: 280, width: 80, height: 60, answer: 'FROG - Secondary consumer (eats grasshopper)', fact: 'Frogs help control insect populations. Without frogs, insects would take over!' },
      { x: 640, y: 280, width: 80, height: 60, answer: 'EAGLE - Tertiary consumer (top of chain)', fact: 'Eagles are at the top of this food chain. They keep the ecosystem balanced!' }
    ],
    quiz: [
      { question: 'What happens if grass disappears?', options: ['Nothing', 'Food chain breaks', 'Animals are happier'], correct: 1 },
      { question: 'What are animals that eat plants called?', options: ['Producers', 'Consumers', 'Sun'], correct: 1 },
      { question: 'Who is at the top of this food chain?', options: ['Grass', 'Grasshopper', 'Eagle'], correct: 2 }
    ]
  },
  {
    id: 9,
    topic: 'Earth, Moon & Sun',
    topicClass: 'earth',
    title: 'Features of the Earth',
    icon: '🌍',
    intro: {
      title: 'Our Amazing Planet!',
      description: 'Explore the different features of planet Earth!',
      instructions: [
        'Click each feature to learn about it',
        'Click mountains, rivers, oceans and continents',
        'Discover what makes Earth special!'
      ],
      goal: 'Learn about the four main features of Earth!'
    },
    interactions: [
      { x: 300, y: 150, width: 120, height: 80, answer: 'MOUNTAINS - Tall rocky landforms!', fact: 'Mountains are formed when tectonic plates collide. Mount Everest is the tallest mountain on Earth!' },
      { x: 500, y: 280, width: 150, height: 60, answer: 'RIVERS - Flowing fresh water!', fact: 'Rivers carry water from mountains to the sea. They provide water for drinking and farming!' },
      { x: 600, y: 200, width: 200, height: 150, answer: 'OCEANS - Huge bodies of salt water!', fact: 'Oceans cover 70% of Earth! They are home to millions of species and produce oxygen!' },
      { x: 250, y: 250, width: 150, height: 100, answer: 'CONTINENTS - Massive land areas!', fact: 'There are 7 continents. Each has different climates, animals and plants!' }
    ],
    quiz: [
      { question: 'What covers most of Earth?', options: ['Land', 'Oceans', 'Mountains'], correct: 1 },
      { question: 'What carries fresh water to the sea?', options: ['Mountains', 'Rivers', 'Oceans'], correct: 1 },
      { question: 'How many continents are there?', options: ['5', '7', '10'], correct: 1 }
    ]
  },
  {
    id: 10,
    topic: 'Earth, Moon & Sun',
    topicClass: 'earth',
    title: 'Features of the Moon',
    icon: '🌙',
    intro: {
      title: 'Our Neighbour in Space!',
      description: 'Explore Earth\'s only natural satellite - the Moon!',
      instructions: [
        'Click the Moon to learn about its surface',
        'Discover craters, mountains and plains',
        'Compare the Moon\'s size to Earth!'
      ],
      goal: 'Learn what makes the Moon special and different from Earth!'
    },
    interactions: [
      { x: 350, y: 200, width: 200, height: 200, answer: 'THE MOON - Earth\'s satellite!', fact: 'The Moon is our closest neighbour in space. It takes 27 days to orbit Earth!' },
      { x: 320, y: 220, width: 40, height: 40, answer: 'CRATERS - Impact marks from space!', fact: 'Craters are formed when asteroids and meteoroids hit the Moon. There is no atmosphere to protect it!' },
      { x: 480, y: 180, width: 50, height: 50, answer: 'MOUNTAINS - Rocky peaks on the Moon!', fact: 'Moon mountains can be as tall as Earth mountains. They were formed by asteroid impacts!' }
    ],
    quiz: [
      { question: 'What are the dark spots on the Moon called?', options: ['Lakes', 'Craters', 'Holes'], correct: 1 },
      { question: 'Does the Moon have an atmosphere?', options: ['Yes', 'No', 'Maybe'], correct: 1 },
      { question: 'What is the Moon?', options: ['A star', 'A planet', 'A satellite'], correct: 2 }
    ]
  },
  {
    id: 11, topic: 'Structures & Materials', topicClass: 'structures', title: 'Indigenous Frame Structures', icon: '🏘️',
    intro: { title: 'Traditional African Buildings!', description: 'Learn about traditional South African huts and how they are built!', instructions: ['Click the hut to reveal its structure', 'Learn how triangles make buildings strong', 'Discover traditional building methods'], goal: 'Understand how frame structures work!' },
    interactions: [
      { x: 350, y: 250, width: 200, height: 180, answer: 'Rondavel - Traditional African hut!', fact: 'Rondavels have been built in Africa for thousands of years using natural materials!' },
      { x: 400, y: 280, width: 100, height: 80, answer: 'Frame Structure - Poles support the roof!', fact: 'The curved poles create a strong frame that distributes weight evenly!' }
    ],
    quiz: [
      { question: 'What shape makes frames strongest?', options: ['Circle', 'Triangle', 'Square'], correct: 1 },
      { question: 'What materials were traditionally used?', options: ['Metal', 'Wood and grass', 'Plastic'], correct: 1 }
    ]
  },
  {
    id: 12, topic: 'Energy & Sound', topicClass: 'energy', title: 'Input and Output Energy', icon: '🔌',
    intro: { title: 'Energy Transformers!', description: 'Discover how devices change energy from one type to another!', instructions: ['Click each device to see energy flow', 'Learn what energy goes IN and OUT', 'Discover useful and wasted energy'], goal: 'Understand energy transformation!' },
    interactions: [
      { x: 100, y: 280, width: 120, height: 100, answer: 'IRON: Electrical → Heat!', fact: 'Irons transform electrical energy into heat to smooth clothes!' },
      { x: 350, y: 280, width: 120, height: 100, answer: 'BULB: Electrical → Light!', fact: 'Light bulbs transform electrical energy into light so we can see!' },
      { x: 600, y: 280, width: 120, height: 100, answer: 'CAR: Chemical → Movement!', fact: 'Cars burn fuel (chemical energy) to create movement!' }
    ],
    quiz: [
      { question: 'What energy goes INTO a kettle?', options: ['Light', 'Electrical', 'Sound'], correct: 1 },
      { question: 'What comes OUT of a light bulb?', options: ['Water', 'Light and heat', 'Sound'], correct: 1 }
    ]
  },
  {
    id: 13, topic: 'Living Things', topicClass: 'living', title: 'Living Things', icon: '🌳',
    intro: { title: 'What Makes Something Alive?', description: 'Learn the 7 life processes all living things do!', instructions: ['Click each organism', 'Discover what makes them alive', 'Learn the 7 life processes'], goal: 'Understand what makes living things different!' },
    interactions: [
      { x: 150, y: 280, width: 100, height: 100, answer: 'TREE - GROWTH, BREATHING, MOVEMENT!', fact: 'Trees grow toward light, breathe (photosynthesis), and move their leaves!' },
      { x: 400, y: 280, width: 100, height: 100, answer: 'DOG - All 7 life processes!', fact: 'Dogs move, breathe, eat, grow, reproduce, respond, and get rid of waste!' },
      { x: 650, y: 280, width: 100, height: 100, answer: 'FLOWER - Reproduction!', fact: 'Flowers make seeds to create new plants - this is reproduction!' }
    ],
    quiz: [
      { question: 'What is one life process?', options: ['Sleeping', 'Growth', 'Dreaming'], correct: 1 },
      { question: 'Do plants grow?', options: ['No', 'Yes', 'Sometimes'], correct: 1 }
    ]
  },
  {
    id: 14, topic: 'Energy & Sound', topicClass: 'energy', title: 'Making Sounds (Drum)', icon: '🥁',
    intro: { title: 'Sound Makers!', description: 'Discover how sounds are made by vibrations!', instructions: ['Click the drum to make a sound', 'Watch the vibration patterns', 'Learn how vibration makes sound'], goal: 'Understand how sounds are created!' },
    interactions: [
      { x: 350, y: 250, width: 200, height: 150, answer: 'THE DRUM - Vibrates to make sound!', fact: 'When you hit the drum, the skin vibrates rapidly. These vibrations create sound waves!' },
      { x: 450, y: 350, width: 100, height: 50, answer: 'VIBRATION - Back and forth movement!', fact: 'Vibration is rapid back-and-forth movement. Faster vibration = higher pitched sound!' }
    ],
    quiz: [
      { question: 'What makes sound?', options: ['Light', 'Vibration', 'Color'], correct: 1 },
      { question: 'What vibrates in a drum?', options: ['The air', 'The drum skin', 'Nothing'], correct: 1 }
    ]
  },
  {
    id: 15, topic: 'Structures & Materials', topicClass: 'structures', title: 'Rocket Systems (Balloon)', icon: '🎈',
    intro: { title: 'Newton\'s Rocket Game!', description: 'Learn about action and reaction forces!', instructions: ['Click the balloon to release it', 'Watch the air rush OUT', 'See how the balloon moves OPPOSITE'], goal: 'Understand Newton\'s Third Law!' },
    interactions: [
      { x: 100, y: 270, width: 150, height: 100, answer: 'INFLATED BALLOON - Full of air!', fact: 'The balloon is filled with air molecules pushing outward in all directions!' },
      { x: 150, y: 290, width: 100, height: 60, answer: 'ACTION: Air rushes OUT!', fact: 'When you let go, air rushes OUT of the hole. This is the ACTION force!' },
      { x: 350, y: 270, width: 150, height: 100, answer: 'REACTION: Balloon moves FORWARD!', fact: 'The balloon moves in the opposite direction of the air. This is the REACTION force!' }
    ],
    quiz: [
      { question: 'What happens when air rushes out?', options: ['Balloon stays still', 'Balloon moves opposite', 'Nothing'], correct: 1 },
      { question: 'This is Newton\'s...?', options: ['First Law', 'Second Law', 'Third Law'], correct: 2 }
    ]
  },
  {
    id: 16, topic: 'Energy & Sound', topicClass: 'energy', title: 'Musical Instruments (Guitar)', icon: '🎸',
    intro: { title: 'String Instrument Fun!', description: 'Discover how guitars make different sounds!', instructions: ['Click the guitar strings', 'Watch them vibrate', 'Hear different pitches'], goal: 'Learn about pitch and vibration!' },
    interactions: [
      { x: 380, y: 250, width: 140, height: 120, answer: 'GUITAR BODY - Amplifies sound!', fact: 'The hollow body makes the sound louder by catching and amplifying the vibrations!' },
      { x: 420, y: 300, width: 60, height: 80, answer: 'STRINGS - Vibrate to make sound!', fact: 'When plucked, strings vibrate. Thinner strings vibrate faster = higher pitch!' }
    ],
    quiz: [
      { question: 'What makes the sound in a guitar?', options: ['The wood', 'String vibration', 'The player'], correct: 1 },
      { question: 'Faster vibration = ?', options: ['Lower pitch', 'Higher pitch', 'No sound'], correct: 1 }
    ]
  },
  {
    id: 17, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'Earth\'s Orbit (365 Days)', icon: '🗓️',
    intro: { title: 'One Year Journey!', description: 'Travel with Earth around the Sun!', instructions: ['Click START to begin the year', 'Watch Earth orbit the Sun', 'See how long a year takes'], goal: 'Understand how long a year is!' },
    interactions: [
      { x: 400, y: 200, width: 100, height: 100, answer: 'THE SUN - Our star!', fact: 'The Sun is so big that 1 million Earths could fit inside it!' },
      { x: 450, y: 320, width: 50, height: 50, answer: 'EARTH - Takes 365 days!', fact: 'Earth makes one complete trip around the Sun in exactly 365 days!' }
    ],
    quiz: [
      { question: 'How long does Earth take to orbit the Sun?', options: ['1 day', '1 month', '1 year'], correct: 2 },
      { question: 'What is at the center of our solar system?', options: ['The Moon', 'The Sun', 'Mars'], correct: 1 }
    ]
  },
  {
    id: 18, topic: 'Living Things', topicClass: 'living', title: 'Habitat Needs', icon: '🐘',
    intro: { title: 'Elephant Survival!', description: 'Help an elephant find everything it needs!', instructions: ['Click to add resources', 'Give the elephant food, water, shelter', 'See what animals need to survive'], goal: 'Learn what animals need in a habitat!' },
    interactions: [
      { x: 150, y: 350, width: 80, height: 80, answer: 'FOOD - All animals need to eat!', fact: 'Animals need food for energy to move, grow, and stay alive!' },
      { x: 350, y: 350, width: 80, height: 80, answer: 'WATER - Essential for life!', fact: 'All living things need water. Animals can survive longer without food than water!' },
      { x: 550, y: 350, width: 80, height: 80, answer: 'SHELTER - Protection!', fact: 'Shelter protects animals from weather, predators, and provides a safe place to rest!' }
    ],
    quiz: [
      { question: 'What do animals need most?', options: ['Television', 'Water', 'Computer'], correct: 1 },
      { question: 'What does shelter provide?', options: ['Entertainment', 'Protection', 'Music'], correct: 1 }
    ]
  },
  {
    id: 19, topic: 'Energy & Sound', topicClass: 'energy', title: 'Noise Pollution', icon: '🔊',
    intro: { title: 'Sound Level Challenge!', description: 'Discover how loud sounds can be dangerous!', instructions: ['Click to change the noise level', 'Watch the meter', 'Learn about safe vs dangerous sounds'], goal: 'Understand noise pollution!' },
    interactions: [
      { x: 50, y: 100, width: 200, height: 150, answer: 'QUIET - Below 70dB is safe!', fact: 'Normal conversation is about 60dB. This is safe for our ears!' },
      { x: 300, y: 100, width: 200, height: 150, answer: 'LOUD - 70-85dB is risky!', fact: 'Heavy traffic or a lawn mower can damage hearing over time!' },
      { x: 550, y: 100, width: 200, height: 150, answer: 'DANGEROUS - Above 85dB!', fact: 'Sounds above 85dB can cause permanent hearing damage. Jet engines are this loud!' }
    ],
    quiz: [
      { question: 'What dB level is dangerous?', options: ['50dB', '85dB', '20dB'], correct: 1 },
      { question: 'Can loud sounds damage ears?', options: ['No', 'Yes', 'Maybe'], correct: 1 }
    ]
  },
  {
    id: 20, topic: 'Living Things', topicClass: 'living', title: 'Non-Living Things', icon: '🪨',
    intro: { title: 'Living vs Non-Living!', description: 'What\'s the difference between living and non-living things?', instructions: ['Click each object', 'Test if it does life processes', 'Discover what makes something alive'], goal: 'Learn the 7 life processes!' },
    interactions: [
      { x: 150, y: 280, width: 100, height: 100, answer: 'ROCK - Non-living!', fact: 'Rocks do NOT grow, move, breathe, or reproduce. They never were alive!' },
      { x: 400, y: 280, width: 100, height: 100, answer: 'WATER - Non-living!', fact: 'Water flows but doesn\'t breathe, grow, or reproduce. It\'s not alive!' },
      { x: 650, y: 280, width: 100, height: 100, answer: 'FIRE - Non-living!', fact: 'Fire seems alive - it moves and grows - but it doesn\'t breathe or reproduce!' }
    ],
    quiz: [
      { question: 'Can rocks grow?', options: ['Yes', 'No', 'Sometimes'], correct: 1 },
      { question: 'Is fire alive?', options: ['Yes', 'No', 'Maybe'], correct: 1 }
    ]
  },
  {
    id: 21, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'Our Closest Star (The Sun)', icon: '☀️',
    intro: { title: 'Meet Our Star!', description: 'Discover why the Sun is so amazing!', instructions: ['Click the Sun', 'Learn about its size and heat', 'Discover why it\'s important'], goal: 'Understand why the Sun is special!' },
    interactions: [
      { x: 200, y: 200, width: 150, height: 150, answer: 'THE SUN - A massive star!', fact: 'The Sun is so big that 1.3 million Earths could fit inside it!' },
      { x: 550, y: 280, width: 100, height: 80, answer: 'LIGHT AND HEAT!', fact: 'The Sun sends us light and heat. Without it, Earth would be frozen!' }
    ],
    quiz: [
      { question: 'What is the Sun?', options: ['A planet', 'A star', 'A moon'], correct: 1 },
      { question: 'What does the Sun give us?', options: ['Only light', 'Light and heat', 'Nothing'], correct: 1 }
    ]
  },
  {
    id: 22, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'Phases of the Moon', icon: '🌛',
    intro: { title: 'Moon Shape Game!', description: 'Watch the Moon change shape throughout the month!', instructions: ['Click to change the Moon\'s position', 'Watch it get bigger and smaller', 'Learn the phase names'], goal: 'Understand why the Moon looks different!' },
    interactions: [
      { x: 100, y: 300, width: 80, height: 80, answer: 'NEW MOON - Dark!', fact: 'We can\'t see the Moon because the Sun is lighting the side we can\'t see!' },
      { x: 350, y: 200, width: 80, height: 80, answer: 'FIRST QUARTER - Half lit!', fact: 'Half the Moon is lit. It looks like a half circle!' },
      { x: 600, y: 150, width: 80, height: 80, answer: 'FULL MOON - Fully lit!', fact: 'The whole side facing Earth is lit. The Moon looks like a big circle!' }
    ],
    quiz: [
      { question: 'What makes the Moon look different?', options: ['Clouds', 'How much sunlight it reflects', 'The Moon moves'], correct: 1 },
      { question: 'When is the Moon fully lit?', options: ['New Moon', 'Full Moon', 'No Moon'], correct: 1 }
    ]
  },
  {
    id: 23, topic: 'Structures & Materials', topicClass: 'structures', title: 'Properties of Materials', icon: '🧱',
    intro: { title: 'Material Testers!', description: 'Discover what makes different materials special!', instructions: ['Click each material to test it', 'Learn about flexibility, hardness, waterproofing', 'Discover why we use different materials'], goal: 'Understand material properties!' },
    interactions: [
      { x: 100, y: 280, width: 120, height: 100, answer: 'RUBBER - Very flexible!', fact: 'Rubber can stretch and bend without breaking. That\'s why we use it for tires and bands!' },
      { x: 350, y: 280, width: 120, height: 100, answer: 'STEEL - Very hard!', fact: 'Steel is hard and strong. We use it for buildings, cars, and tools!' },
      { x: 600, y: 280, width: 120, height: 100, answer: 'PLASTIC - Waterproof!', fact: 'Plastics don\'t let water through. That\'s why we use them for water bottles and raincoats!' }
    ],
    quiz: [
      { question: 'What property does rubber have?', options: ['Hard', 'Flexible', 'Metal'], correct: 1 },
      { question: 'What is steel known for?', options: ['Softness', 'Hardness', 'Flexibility'], correct: 1 }
    ]
  },
  {
    id: 24, topic: 'Structures & Materials', topicClass: 'structures', title: 'Raw vs Manufactured Materials', icon: '🪵',
    intro: { title: 'From Nature to Product!', description: 'See how raw materials become useful products!', instructions: ['Click to process materials', 'Watch raw materials change', 'Learn about manufacturing'], goal: 'Understand how materials are made!' },
    interactions: [
      { x: 100, y: 250, width: 100, height: 80, answer: 'TREE - Raw material!', fact: 'Trees grow naturally. We use wood from trees to make many products!' },
      { x: 250, y: 280, width: 80, height: 50, answer: 'Processing!', fact: 'Trees are cut and processed into planks, paper, and furniture!' },
      { x: 400, y: 250, width: 100, height: 80, answer: 'CLAY - Raw material!', fact: 'Clay is dug from the ground. It\'s a natural material found in the earth!' },
      { x: 550, y: 280, width: 80, height: 50, answer: 'Processing!', fact: 'Clay is shaped and heated (fired) to make bricks and pots!' }
    ],
    quiz: [
      { question: 'Is wood from nature?', options: ['No', 'Yes', 'Maybe'], correct: 1 },
      { question: 'What is clay made into?', options: ['Paper', 'Bricks', 'Metal'], correct: 1 }
    ]
  },
  {
    id: 25, topic: 'Energy & Matter', topicClass: 'structures', title: 'Solids, Liquids and Gases', icon: '💨',
    intro: { title: 'Matter States!', description: 'Explore the three states of matter!', instructions: ['Click each state', 'Watch how particles behave', 'Learn about particle movement'], goal: 'Understand particles in matter!' },
    interactions: [
      { x: 150, y: 280, width: 100, height: 100, answer: 'SOLID - Particles vibrate!', fact: 'In solids, particles are packed tightly and only vibrate in place. They can\'t move around!' },
      { x: 400, y: 280, width: 100, height: 100, answer: 'LIQUID - Particles flow!', fact: 'In liquids, particles can slide past each other. That\'s why liquids flow and take the shape of their container!' },
      { x: 650, y: 280, width: 100, height: 100, answer: 'GAS - Particles zoom!', fact: 'In gases, particles move very fast in all directions. They spread out to fill any space!' }
    ],
    quiz: [
      { question: 'What do particles in a solid do?', options: ['Move freely', 'Vibrate only', 'Disappear'], correct: 1 },
      { question: 'Which state has particles that spread out?', options: ['Solid', 'Liquid', 'Gas'], correct: 2 }
    ]
  },
  {
    id: 26, topic: 'Living Things', topicClass: 'living', title: 'Structure of Animals', icon: '🦁',
    intro: { title: 'Animal Body Parts!', description: 'Learn about the different parts of animal bodies!', instructions: ['Click each body part', 'Learn what each part does', 'Understand how animals work'], goal: 'Know animal body parts!' },
    interactions: [
      { x: 350, y: 220, width: 100, height: 80, answer: 'HEAD - Contains brain, eyes, ears, nose!', fact: 'The head houses important sense organs. Animals use them to understand their world!' },
      { x: 300, y: 320, width: 80, height: 60, answer: 'BODY - Houses all organs!', fact: 'The body contains the heart, lungs, stomach, and other organs that keep animals alive!' },
      { x: 500, y: 350, width: 80, height: 60, answer: 'LEGS - For movement!', fact: 'Legs help animals move to find food, escape predators, and explore their habitat!' }
    ],
    quiz: [
      { question: 'What is in the head?', options: ['Stomach', 'Brain', 'Legs'], correct: 1 },
      { question: 'What do legs help animals do?', options: ['Sleep', 'Move', 'Grow'], correct: 1 }
    ]
  },
  {
    id: 27, topic: 'Living Things', topicClass: 'living', title: 'Structure of Plants', icon: '🌻',
    intro: { title: 'Plant Parts!', description: 'Discover what each part of a plant does!', instructions: ['Click each plant part', 'Learn about roots, stem, leaves, flowers', 'Understand how plants work'], goal: 'Know plant parts and jobs!' },
    interactions: [
      { x: 400, y: 380, width: 100, height: 60, answer: 'ROOTS - Absorb water!', fact: 'Roots take in water and minerals from the soil. They also anchor the plant!' },
      { x: 400, y: 300, width: 40, height: 80, answer: 'STEM - Carries water!', fact: 'The stem is like a straw. It carries water from roots to leaves!' },
      { x: 350, y: 220, width: 60, height: 60, answer: 'LEAVES - Make food!', fact: 'Leaves use sunlight, water, and air to make food through photosynthesis!' },
      { x: 450, y: 180, width: 60, height: 60, answer: 'FLOWER - Makes seeds!', fact: 'Flowers make seeds that can grow into new plants. This is reproduction!' }
    ],
    quiz: [
      { question: 'What do roots do?', options: ['Make flowers', 'Absorb water', 'Make light'], correct: 1 },
      { question: 'What do leaves do?', options: ['Make food', 'Hold the plant', 'Make seeds'], correct: 0 }
    ]
  },
  {
    id: 28, topic: 'Structures & Materials', topicClass: 'structures', title: 'Struts and Frame Structures', icon: '🔺',
    intro: { title: 'The Strongest Shape!', description: 'Discover why triangles are the strongest!', instructions: ['Click to add weight to shapes', 'Watch which shape stays strong', 'Learn why triangles are special'], goal: 'Understand engineering!' },
    interactions: [
      { x: 200, y: 280, width: 120, height: 100, answer: 'SQUARE - Weakens and bends!', fact: 'Squares can easily change shape. The corners are weak points!' },
      { x: 500, y: 280, width: 120, height: 100, answer: 'TRIANGLE - Super strong!', fact: 'Triangles are the strongest shape! They cannot change shape without changing the length of their sides!' }
    ],
    quiz: [
      { question: 'Which shape is strongest?', options: ['Circle', 'Triangle', 'Square'], correct: 1 },
      { question: 'Why is a triangle strong?', options: ['It bends easily', 'It cannot change shape', 'It is round'], correct: 1 }
    ]
  },
  {
    id: 29, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'The Sun and Life', icon: '🌻',
    intro: { title: 'Life from the Sun!', description: 'Discover how the Sun supports all life on Earth!', instructions: ['Click to follow the energy', 'See how Sun helps plants grow', 'Learn about the water cycle'], goal: 'Understand Sun\'s importance!' },
    interactions: [
      { x: 100, y: 150, width: 80, height: 80, answer: 'SUN - Energy source!', fact: 'The Sun provides ALL the energy for life on Earth. Every living thing depends on it!' },
      { x: 400, y: 280, width: 100, height: 80, answer: 'PLANTS - Use Sun energy!', fact: 'Plants use sunlight to make food. This is called photosynthesis!' },
      { x: 700, y: 280, width: 100, height: 80, answer: 'ANIMALS - Eat plants!', fact: 'Animals get energy by eating plants (or other animals that eat plants). This is the food chain!' }
    ],
    quiz: [
      { question: 'What does the Sun provide?', options: ['Nothing', 'Energy', 'Water'], correct: 1 },
      { question: 'What do plants use Sun for?', options: ['Sleep', 'Photosynthesis', 'Nothing'], correct: 1 }
    ]
  },
  {
    id: 30, topic: 'Energy & Matter', topicClass: 'structures', title: 'The Water Cycle', icon: '💧',
    intro: { title: 'Water\'s Amazing Journey!', description: 'Follow water as it travels around Earth!', instructions: ['Click to start the cycle', 'Watch evaporation, condensation, precipitation', 'Learn how water moves'], goal: 'Understand the water cycle!' },
    interactions: [
      { x: 100, y: 350, width: 150, height: 80, answer: 'EVAPORATION - Water rises!', fact: 'When water is heated by the Sun, it turns into invisible water vapour and rises into the air!' },
      { x: 350, y: 200, width: 150, height: 80, answer: 'CONDENSATION - Clouds form!', fact: 'When water vapour cools, it turns back into tiny water drops. This makes clouds!' },
      { x: 600, y: 250, width: 150, height: 80, answer: 'PRECIPITATION - Rain falls!', fact: 'When clouds get too heavy, water falls back to Earth as rain, snow, or hail!' }
    ],
    quiz: [
      { question: 'What happens when water heats up?', options: ['Evaporation', 'Freezing', 'Nothing'], correct: 0 },
      { question: 'What forms when water vapour cools?', options: ['Clouds', 'Fire', 'Rocks'], correct: 0 }
    ]
  },
  {
    id: 31, topic: 'Energy & Sound', topicClass: 'energy', title: 'Vibrations and Sound (Ruler)', icon: '📏',
    intro: { title: 'Ruler Music!', description: 'Make sounds with a vibrating ruler!', instructions: ['Click to make the ruler vibrate', 'Change how much hangs over the edge', 'Hear different sounds'], goal: 'Learn about sound volume!' },
    interactions: [
      { x: 100, y: 280, width: 150, height: 80, answer: 'SHORT overhang - High pitch!', fact: 'When less hangs over, the ruler vibrates faster, making a higher pitched sound!' },
      { x: 350, y: 280, width: 150, height: 80, answer: 'LONG overhang - Low pitch!', fact: 'When more hangs over, the ruler vibrates slower, making a lower pitched sound!' },
      { x: 550, y: 280, width: 150, height: 80, answer: 'Vibration = Sound!', fact: 'All sounds are made by vibrations. Faster vibration = higher sound!' }
    ],
    quiz: [
      { question: 'What makes the sound?', options: ['Color', 'Vibration', 'Size'], correct: 1 },
      { question: 'More overhang = ? pitch', options: ['Higher', 'Lower', 'Same'], correct: 1 }
    ]
  },
  {
    id: 32, topic: 'Structures & Materials', topicClass: 'structures', title: 'Ways to Strengthen Materials', icon: '📦',
    intro: { title: 'Build Super Strong!', description: 'Discover how to make materials stronger!', instructions: ['Click each shape to test strength', 'See which holds the most weight', 'Learn engineering tricks'], goal: 'Understand material strength!' },
    interactions: [
      { x: 150, y: 280, width: 100, height: 80, answer: 'FLAT SHEET - Weak!', fact: 'Flat sheets bend easily because they have no support. They can\'t hold much weight!' },
      { x: 400, y: 280, width: 100, height: 80, answer: 'FOLDED - Stronger!', fact: 'Folding material creates more support. Corrugated cardboard is much stronger than flat!' },
      { x: 650, y: 280, width: 100, height: 80, answer: 'ROLLED TUBE - Strongest!', fact: 'Rolling material into a tube creates the strongest shape. It can support a lot of weight!' }
    ],
    quiz: [
      { question: 'What is the strongest shape?', options: ['Flat', 'Folded', 'Rolled'], correct: 2 },
      { question: 'Why is a tube strong?', options: ['It is hollow', 'It has no shape', 'It is flat'], correct: 0 }
    ]
  }
];

function App() {
  const [activeSim, setActiveSim] = useState(null);
  const [gameState, setGameState] = useState('intro'); // intro, playing, quiz, complete
  const [currentInteraction, setCurrentInteraction] = useState(null);
  const [showFact, setShowFact] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [completedSims, setCompletedSims] = useState([]);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [temperature, setTemperature] = useState(-20);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [animPhase, setAnimPhase] = useState(0);
  const [breakPoint, setBreakPoint] = useState(null);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const launchSim = (sim) => {
    setActiveSim(sim);
    setGameState('intro');
    setCurrentInteraction(null);
    setShowFact(null);
    setQuizAnswers([]);
    setShowResult(null);
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentInteraction(null);
    setIsAnimating(false);
    if (animationRef.current) clearInterval(animationRef.current);

    // Reset simulation-specific states
    if (activeSim?.id === 2) {
      setTemperature(-20);
    } else if (activeSim?.id >= 3 && activeSim?.id <= 20) {
      setAnimProgress(0);
      setAnimPhase(0);
      setBreakPoint(null);
    }
  };

  const handleCanvasClick = (e) => {
    if (!activeSim || gameState !== 'playing') return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = 900 / rect.width;
    const scaleY = 540 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Change of State: click canvas "Press Play" button to start
    if (activeSim.id === 2) {
      if (!isAnimating && temperature <= -18) {
        // Click on the "Press Play" button area (300, 480, 200, 45)
        if (x >= 300 && x <= 500 && y >= 480 && y <= 525) {
          setIsAnimating(true);
        }
      }
      return;
    }

    // Simulations 3-20: click canvas "Press Play" button
    if (activeSim.id >= 3 && activeSim.id <= 20) {
      if (!isAnimating && animProgress <= 0) {
        // Broad click area for the Play hints
        if (x >= 350 && x <= 550 && ((y >= 150 && y <= 490))) {
          setIsAnimating(true);
        }
      }

      // Special interaction for Food Chain (ID 8): click organism to break chain
      if (activeSim.id === 8 && isAnimating) {
        // x-coordinates for Grasshopper (460), Frog (640), Eagle (820)
        if (y >= 200 && y <= 300) {
          if (x >= 420 && x <= 500) setBreakPoint(2); // Grasshopper
          else if (x >= 600 && x <= 680) setBreakPoint(3); // Frog
          else if (x >= 780 && x <= 860) setBreakPoint(4); // Eagle
        }
      }
      return;
    }

    // Check if click matches any interaction area
    for (let i = 0; i < activeSim.interactions.length; i++) {
      const interaction = activeSim.interactions[i];
      // Mobile vertical layout positions
      const clickX = isMobile ? (450 - interaction.width / 2) : interaction.x;
      const clickY = isMobile ? 60 + (i * (interaction.height + 20)) : interaction.y;

      if (x >= clickX && x <= clickX + interaction.width &&
        y >= clickY && y <= clickY + interaction.height) {
        setCurrentInteraction(interaction);
        setShowFact(interaction.fact);
        return;
      }
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    const isCorrect = answerIndex === activeSim.quiz[questionIndex].correct;

    if (questionIndex < activeSim.quiz.length - 1) {
      // Move to next question after short delay
      setTimeout(() => {
        setShowResult({ correct: isCorrect, next: true });
      }, 1000);
    } else {
      // Quiz complete
      setTimeout(() => {
        const finalScore = newAnswers.filter((a, i) => a === activeSim.quiz[i].correct).length;
        setScore(finalScore);
        setGameState('complete');
        if (!completedSims.includes(activeSim.id)) {
          setCompletedSims([...completedSims, activeSim.id]);
        }
      }, 1000);
    }

    setShowResult({ correct: isCorrect, showing: true });
    setTimeout(() => setShowResult(null), 1500);
  };

  const goBack = () => {
    setActiveSim(null);
    setGameState('intro');
    setCurrentInteraction(null);
    setShowFact(null);
  };

  // Change of State dedicated renderer
  const renderChangeOfState = (ctx, temp) => {
    // Background gradient based on temperature
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 540);
    if (temp < 0) {
      bgGrad.addColorStop(0, '#D6EAF8');
      bgGrad.addColorStop(1, '#AED6F1');
    } else if (temp < 100) {
      bgGrad.addColorStop(0, '#D5F5E3');
      bgGrad.addColorStop(1, '#ABEBC6');
    } else {
      bgGrad.addColorStop(0, '#FADBD8');
      bgGrad.addColorStop(1, '#F5B7B1');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 900, 540);

    // Temperature scale on the left
    const scaleX = 50, scaleY = 60, scaleH = 400, scaleW = 30;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(scaleX, scaleY, scaleW, scaleH, 8);
    ctx.fill();
    ctx.strokeStyle = '#1A2E5A';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill the thermometer
    const tempRange = 140; // -20 to 120
    const fillFraction = Math.max(0, Math.min(1, (temp + 20) / tempRange));
    const fillH = fillFraction * (scaleH - 10);
    const fillColor = temp < 0 ? '#3498DB' : temp < 100 ? '#27AE60' : '#E74C3C';
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.roundRect(scaleX + 4, scaleY + scaleH - 5 - fillH, scaleW - 8, fillH, 4);
    ctx.fill();

    // Temperature markers
    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 12px Nunito, sans-serif';
    ctx.textAlign = 'left';
    const markers = [120, 100, 50, 0, -20];
    markers.forEach(m => {
      const my = scaleY + scaleH - 5 - ((m + 20) / tempRange) * (scaleH - 10);
      ctx.fillText(`${m}°C`, scaleX + scaleW + 5, my + 4);
      ctx.beginPath();
      ctx.moveTo(scaleX + scaleW - 5, my);
      ctx.lineTo(scaleX + scaleW, my);
      ctx.strokeStyle = '#1A2E5A';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Current temperature display
    ctx.font = 'bold 28px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1A2E5A';
    ctx.fillText(`${Math.round(temp)}°C`, 140, 490);

    // Main substance display area
    const mainX = 200, mainY = 80, mainW = 350, mainH = 300;

    if (temp < 0) {
      // ICE BLOCK - solid
      const meltProgress = 0;
      ctx.fillStyle = '#AED6F1';
      ctx.beginPath();
      ctx.roundRect(mainX, mainY + 50, mainW, mainH - 50, 8);
      ctx.fill();
      ctx.strokeStyle = '#5DADE2';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Ice crystal lines
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(mainX + 20 + i * 55, mainY + 60);
        ctx.lineTo(mainX + 20 + i * 55, mainY + mainH - 10);
        ctx.stroke();
      }
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(mainX + 10, mainY + 80 + i * 50);
        ctx.lineTo(mainX + mainW - 10, mainY + 80 + i * 50);
        ctx.stroke();
      }

      // Label
      ctx.fillStyle = '#2C3E50';
      ctx.font = 'bold 24px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🧊 SOLID (ICE)', mainX + mainW / 2, mainY + 35);
    } else if (temp < 100) {
      // WATER - liquid
      const waterLevel = mainH - 80;

      // Water body
      const waterGrad = ctx.createLinearGradient(mainX, mainY + 100, mainX, mainY + mainH);
      waterGrad.addColorStop(0, '#5DADE2');
      waterGrad.addColorStop(1, '#2E86C1');
      ctx.fillStyle = waterGrad;
      ctx.beginPath();
      ctx.roundRect(mainX, mainY + 80, mainW, waterLevel - 30, [0, 0, 8, 8]);
      ctx.fill();

      // Wavy top
      ctx.strokeStyle = '#85C1E9';
      ctx.lineWidth = 3;
      const waveOffset = (temp * 2) % 30;
      ctx.beginPath();
      ctx.moveTo(mainX, mainY + 80);
      for (let wx = 0; wx <= mainW; wx += 10) {
        ctx.lineTo(mainX + wx, mainY + 80 + Math.sin((wx + waveOffset) * 0.1) * 5);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = '#2C3E50';
      ctx.font = 'bold 24px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💧 LIQUID (WATER)', mainX + mainW / 2, mainY + 35);
    } else {
      // STEAM - gas
      // Steam clouds rising
      ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
      const steamOffset = (temp - 100) * 3;
      for (let i = 0; i < 8; i++) {
        const sx = mainX + 40 + (i * 45) % mainW;
        const sy = mainY + mainH - 50 - ((steamOffset + i * 40) % (mainH + 50));
        const sr = 20 + (i % 3) * 10;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }

      // More visible steam puffs
      ctx.fillStyle = 'rgba(180, 180, 180, 0.4)';
      for (let i = 0; i < 5; i++) {
        const sx = mainX + 60 + (i * 70);
        const sy = mainY + 100 + Math.sin(temp * 0.1 + i) * 30;
        ctx.beginPath();
        ctx.arc(sx, sy, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Label
      ctx.fillStyle = '#2C3E50';
      ctx.font = 'bold 24px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('☁️ GAS (STEAM)', mainX + mainW / 2, mainY + 35);
    }

    // Particle diagram (right side)
    const pdX = 620, pdY = 80, pdW = 240, pdH = 200;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.roundRect(pdX, pdY, pdW, pdH, 12);
    ctx.fill();
    ctx.strokeStyle = '#1A2E5A';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 14px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Particle Diagram', pdX + pdW / 2, pdY + 20);

    // Draw particles based on state
    const pcX = pdX + pdW / 2, pcY = pdY + pdH / 2 + 15;
    if (temp < 0) {
      // Tightly packed, vibrating
      ctx.fillStyle = '#3498DB';
      const positions = [
        [-30, -30], [-10, -30], [10, -30], [30, -30],
        [-30, -10], [-10, -10], [10, -10], [30, -10],
        [-30, 10], [-10, 10], [10, 10], [30, 10],
        [-30, 30], [-10, 30], [10, 30], [30, 30]
      ];
      positions.forEach(([px, py]) => {
        const jitter = Math.sin(Date.now() * 0.01 + px * py) * 2;
        ctx.beginPath();
        ctx.arc(pcX + px + jitter, pcY + py + jitter * 0.5, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#2C3E50';
      ctx.font = '12px Nunito, sans-serif';
      ctx.fillText('Packed tightly, vibrate in place', pdX + pdW / 2, pdY + pdH - 10);
    } else if (temp < 100) {
      // Loosely arranged, sliding
      ctx.fillStyle = '#2E86C1';
      const spread = 5 + (temp / 100) * 15;
      const positions = [
        [-35, -25], [-5, -35], [25, -20],
        [-40, 0], [-10, 5], [20, -5], [45, 10],
        [-30, 25], [0, 30], [30, 20],
        [-20, 50], [15, 45]
      ];
      positions.forEach(([px, py], i) => {
        const drift = Math.sin(Date.now() * 0.005 + i) * spread;
        ctx.beginPath();
        ctx.arc(pcX + px + drift, pcY + py + Math.cos(Date.now() * 0.003 + i) * 3, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#2C3E50';
      ctx.font = '12px Nunito, sans-serif';
      ctx.fillText('Slide past each other, flow', pdX + pdW / 2, pdY + pdH - 10);
    } else {
      // Spread far apart, zooming
      ctx.fillStyle = '#E74C3C';
      const positions = [
        [-70, -50], [0, -60], [60, -40],
        [-80, 0], [70, 10],
        [-50, 50], [30, 60],
        [-10, 20]
      ];
      positions.forEach(([px, py], i) => {
        const dx = Math.sin(Date.now() * 0.008 + i * 1.5) * 15;
        const dy = Math.cos(Date.now() * 0.006 + i * 2) * 15;
        ctx.beginPath();
        ctx.arc(pcX + px + dx, pcY + py + dy, 6, 0, Math.PI * 2);
        ctx.fill();
        // Motion trails
        ctx.strokeStyle = 'rgba(231, 76, 60, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pcX + px + dx, pcY + py + dy);
        ctx.lineTo(pcX + px + dx - dx * 0.8, pcY + py + dy - dy * 0.8);
        ctx.stroke();
      });
      ctx.fillStyle = '#2C3E50';
      ctx.font = '12px Nunito, sans-serif';
      ctx.fillText('Spread apart, move very fast', pdX + pdW / 2, pdY + pdH - 10);
    }

    // Phase labels (appear at transition points)
    const labelBoxY = 320;
    if (temp >= -2 && temp <= 5) {
      // Melting label
      ctx.fillStyle = 'rgba(41, 128, 185, 0.9)';
      ctx.beginPath();
      ctx.roundRect(200, labelBoxY, 460, 50, 12);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⬆️ MELTING POINT (0°C) — Ice turns to water!', 430, labelBoxY + 32);
    } else if (temp >= 98 && temp <= 105) {
      // Boiling/Evaporation label
      ctx.fillStyle = 'rgba(192, 57, 43, 0.9)';
      ctx.beginPath();
      ctx.roundRect(200, labelBoxY, 460, 50, 12);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⬆️ BOILING POINT (100°C) — Water turns to steam!', 430, labelBoxY + 32);
    }

    // Condensation info box (bottom)
    if (temp > 105) {
      ctx.fillStyle = 'rgba(44, 62, 80, 0.85)';
      ctx.beginPath();
      ctx.roundRect(200, 400, 460, 80, 12);
      ctx.fill();
      ctx.fillStyle = '#F1C40F';
      ctx.font = 'bold 16px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💡 Reverse process:', 430, 425);
      ctx.fillStyle = 'white';
      ctx.font = '14px Nunito, sans-serif';
      ctx.fillText('When steam cools → CONDENSATION (gas→liquid)', 430, 448);
      ctx.fillText('When water cools → FREEZING (liquid→solid)', 430, 468);
    }

    // Play/Reset button hint
    if (!isAnimating && temp <= -18) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(300, 480, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 400, 510);
    }
  };

  // Animation effect for Change of State
  useEffect(() => {
    if (isAnimating && activeSim?.id === 2 && gameState === 'playing') {
      animationRef.current = setInterval(() => {
        setTemperature(prev => {
          if (prev >= 120) {
            clearInterval(animationRef.current);
            setIsAnimating(false);
            return 120;
          }
          return prev + 0.5;
        });
      }, 80);
      return () => clearInterval(animationRef.current);
    }
  }, [isAnimating, activeSim?.id, gameState]);

  // Continuous re-render for Change of State particle animation
  useEffect(() => {
    if (activeSim?.id === 2 && gameState === 'playing') {
      let frameId;
      const animate = () => {
        renderGame();
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [activeSim?.id, gameState, temperature, isAnimating]);

  // Animation effect for generic interactive sims (IDs 3-12)
  useEffect(() => {
    if (isAnimating && activeSim?.id >= 3 && activeSim?.id <= 20 && gameState === 'playing') {
      animationRef.current = setInterval(() => {
        setAnimProgress(prev => {
          // Special case for food chain (ID 8): stop if broken
          if (activeSim.id === 8 && breakPoint !== null) {
            clearInterval(animationRef.current);
            setIsAnimating(false);
            return prev;
          }

          if (prev >= 1) {
            clearInterval(animationRef.current);
            setIsAnimating(false);
            return 1;
          }
          return prev + 0.01;
        });
      }, 50);
      return () => clearInterval(animationRef.current);
    }
  }, [isAnimating, activeSim?.id, gameState, breakPoint]);

  // Continuous loop for rendering animations
  useEffect(() => {
    if (activeSim?.id >= 3 && activeSim?.id <= 20 && gameState === 'playing') {
      let frameId;
      const animate = () => {
        renderGame();
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [activeSim?.id, gameState, animProgress, isAnimating, animPhase, breakPoint]);

  // Renderer for ID 3: What Plants Need to Grow
  const renderPlantGrowth = (ctx, progress) => {
    ctx.fillStyle = '#E8F5E9';
    ctx.fillRect(0, 0, 900, 540);

    const pots = [
      { id: 'no-light', label: '❌ No Light', text: 'Stays small & turns yellow' },
      { id: 'no-water', label: '❌ No Water', text: 'Wilts & turns brown' },
      { id: 'no-warmth', label: '❌ No Warmth', text: 'Barely grows' },
      { id: 'all', label: '✅ All Needs Met', text: 'Grows tall & green!' }
    ];

    const potWidth = 140;
    const spacing = 60;
    const startX = 80;
    const baseY = 380;

    pots.forEach((pot, i) => {
      const x = startX + i * (potWidth + spacing);

      // Draw pot
      ctx.fillStyle = '#D35400';
      ctx.beginPath();
      ctx.moveTo(x + 20, baseY);
      ctx.lineTo(x + potWidth - 20, baseY);
      ctx.lineTo(x + potWidth - 30, baseY + 80);
      ctx.lineTo(x + 30, baseY + 80);
      ctx.fill();
      ctx.strokeStyle = '#A04000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.rect(x + 10, baseY, potWidth - 20, 15);
      ctx.fill();
      ctx.stroke();

      // Draw label 
      ctx.fillStyle = pot.id === 'all' ? '#27AE60' : '#E74C3C';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pot.label, x + potWidth / 2, baseY + 115);

      // Draw Plant (animated)
      const cx = x + potWidth / 2;
      const cy = baseY;

      let stemHeight = 40;
      let leafSize = 10;
      let stemColor = '#2ECC71';
      let leafColor = '#2ECC71';
      let droop = 0;

      if (pot.id === 'no-light') {
        stemHeight = 40 + (progress * 20);
        stemColor = `rgb(${46 + progress * 150}, ${204 + progress * 0}, ${113 - progress * 50})`;
        leafColor = stemColor;
      } else if (pot.id === 'no-water') {
        stemHeight = 40 + (progress * 10);
        droop = progress * 40;
        stemColor = `rgb(${46 + progress * 100}, ${204 - progress * 100}, ${113 - progress * 100})`;
        leafColor = stemColor;
      } else if (pot.id === 'no-warmth') {
        stemHeight = 40 + (progress * 5); // barely grows
      } else if (pot.id === 'all') {
        stemHeight = 40 + (progress * 150);
        leafSize = 10 + (progress * 25);
      }

      // Stem
      ctx.strokeStyle = stemColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      // add droop effect for no-water
      ctx.quadraticCurveTo(cx + droop, cy - stemHeight / 2, cx + droop * 1.5, cy - stemHeight);
      ctx.stroke();

      // Leaves
      const drawLeaf = (lx, ly, size, angle, color) => {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(angle);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(size, 0, size, size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      const topX = cx + droop * 1.5;
      const topY = cy - stemHeight;

      drawLeaf(cx + droop * 0.5, cy - stemHeight * 0.4, leafSize, -Math.PI / 6 + (droop * 0.02), leafColor); // right
      drawLeaf(cx + droop * 0.5, cy - stemHeight * 0.6, leafSize, Math.PI + Math.PI / 6 - (droop * 0.02), leafColor); // left
      drawLeaf(topX, topY, leafSize * 0.8, -Math.PI / 2 + (droop * 0.04), leafColor); // top

      // Draw final state text if animation done
      if (progress > 0.95) {
        ctx.fillStyle = '#34495E';
        ctx.font = 'bold 13px Nunito, sans-serif';
        ctx.fillText(pot.text, cx, baseY - stemHeight - 30);
      }
    });

    // Final summary box
    if (progress > 0.95) {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.roundRect(150, 40, 600, 80, 12);
      ctx.fill();
      ctx.strokeStyle = '#27AE60';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 24px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Plants MUST have Light, Water AND Warmth to grow!', 450, 80);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 200, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 230);
    }
  };

  // Renderer for ID 4: Habitats of Animals
  const renderAnimalHabitats = (ctx, progress) => {
    const scenes = [
      { id: 'forest', title: '🌲 Forest', bg: '#A9DFBF', animal: '🐦 Bird', needs: ['🐛 Food', '💧 Water', '🌿 Shelter'] },
      { id: 'desert', title: '🏜️ Desert', bg: '#FAD7A1', animal: '🐪 Camel', needs: ['🌵 Food', '💧 Water', '🕳️ Shelter'] },
      { id: 'river', title: '🌊 River', bg: '#AED6F1', animal: '🐟 Fish', needs: ['🦟 Food', '💧 Water', '🪨 Shelter'] },
      { id: 'grass', title: '🌾 Grassland', bg: '#F9E79F', animal: '🦓 Zebra', needs: ['🌱 Food', '💧 Water', '🌳 Shelter'] }
    ];

    const w = 900 / 4;

    scenes.forEach((scene, i) => {
      const x = i * w;

      // Scene Background
      ctx.fillStyle = scene.bg;
      ctx.fillRect(x, 0, w, 540);

      // Borders
      if (i > 0) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 540);
        ctx.stroke();
      }

      // Title
      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 24px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(scene.title, x + w / 2, 60);

      // Phase 1: Animals appear (0 to 0.3)
      if (progress > 0.1) {
        ctx.save();
        let alpha = Math.min(1, (progress - 0.1) * 5);

        // Phase 3: Remove water from Desert (0.6 to 1)
        if (scene.id === 'desert' && progress > 0.7) {
          alpha = Math.max(0.2, 1 - ((progress - 0.7) * 4));
          ctx.fillStyle = 'red';
          ctx.font = 'bold 16px Nunito, sans-serif';
          ctx.fillText('NO WATER!', x + w / 2, 180);
        }

        ctx.globalAlpha = alpha;
        ctx.font = '60px Arial';
        ctx.fillText(scene.animal.split(' ')[0], x + w / 2, 250);
        ctx.font = 'bold 20px Nunito, sans-serif';
        ctx.fillStyle = '#1A2E5A';
        ctx.fillText(scene.animal.split(' ')[1], x + w / 2, 300);
        ctx.restore();
      }

      // Phase 2: Needs appear (0.3 to 0.6)
      if (progress > 0.3) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.roundRect(x + 20, 350, w - 40, 120, 10);
        ctx.fill();

        ctx.fillStyle = '#1A2E5A';
        ctx.font = 'bold 16px Nunito, sans-serif';
        ctx.textAlign = 'left';

        scene.needs.forEach((need, nIdx) => {
          // If desert and water is removed in Phase 3
          if (scene.id === 'desert' && need.includes('Water') && progress > 0.6) {
            ctx.fillStyle = 'red';
            ctx.fillText('❌ ' + need.split(' ')[1], x + 30, 380 + (nIdx * 30));
          } else {
            ctx.fillStyle = '#1A2E5A';
            ctx.globalAlpha = Math.min(1, (progress - 0.3) * 5);
            ctx.fillText(need, x + 30, 380 + (nIdx * 30));
            ctx.globalAlpha = 1;
          }
        });
      }
    });

    // Final summary box
    if (progress > 0.9) {
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.roundRect(150, 480, 600, 50, 12);
      ctx.fill();
      ctx.strokeStyle = '#E74C3C';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 20px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Animals CANNOT SURVIVE if their habitat loses Food, Water, or Shelter!', 450, 512);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 200, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 230);
    }
  };

  // Renderer for ID 5: Planet Earth
  const renderPlanetEarth = (ctx, progress) => {
    // Space Background
    ctx.fillStyle = '#0B0C10';
    ctx.fillRect(0, 0, 900, 540);

    // Stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
      const sx = (i * 87) % 900;
      const sy = (i * 113) % 540;
      ctx.globalAlpha = 0.3 + (Math.sin(Date.now() * 0.002 + i) * 0.3 + 0.3);
      ctx.beginPath();
      ctx.arc(sx, sy, (i % 2) + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const cx = 450;
    const cy = 270;

    // Sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 60);
    sunGrad.addColorStop(0, '#FDFEFE');
    sunGrad.addColorStop(0.2, '#F4D03F');
    sunGrad.addColorStop(0.8, '#E67E22');
    sunGrad.addColorStop(1, 'rgba(230, 126, 34, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fill();

    // Orbit path
    const orbitRX = 280;
    const orbitRY = 140;

    if (progress > 0.05) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbitRX, orbitRY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Earth
    if (progress > 0) {
      // Loop the orbit continuously if animating, use progress to start it up
      const t = isAnimating ? (Date.now() * 0.0005) : 0;

      const ex = cx + Math.cos(t) * orbitRX;
      const ey = cy + Math.sin(t) * orbitRY;

      // Earth shadow/glow
      const earthGrad = ctx.createRadialGradient(ex - 5, ey - 5, 2, ex, ey, 25);
      earthGrad.addColorStop(0, '#85C1E9');
      earthGrad.addColorStop(0.7, '#2874A6');
      earthGrad.addColorStop(1, '#154360');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(ex, ey, 20, 0, Math.PI * 2);
      ctx.fill();

      // Earth Continents (simple green patches rotating)
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(t * 5); // spin faster than orbit
      ctx.fillStyle = '#27AE60';
      ctx.beginPath();
      ctx.ellipse(-5, -5, 10, 5, Math.PI / 4, 0, Math.PI * 2);
      ctx.ellipse(5, 8, 8, 6, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Moon orbit
      if (progress > 0.5) {
        const mt = t * 13; // moon orbits faster
        const mDist = 40;
        const mx = ex + Math.cos(mt) * mDist;
        const my = ey + Math.sin(mt) * mDist;

        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.arc(ex, ey, mDist, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#BDC3C7';
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fill();

        // Moon Label
        if (progress > 0.8) {
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.font = '12px Nunito';
          ctx.fillText('Moon', mx + 15, my + 5);
        }
      }

      // Labels
      if (progress > 0.6) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Nunito';
        ctx.fillText('Earth', ex - 40, ey - 30);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(ex - 35, ey - 25);
        ctx.lineTo(ex - 15, ey - 10);
        ctx.stroke();
      }
    }

    if (progress > 0.3) {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Nunito';
      ctx.fillText('The Sun', cx, cy + 80);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 400, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 430);
    }
  };

  // Renderer for ID 6: Energy Around Us
  const renderEnergyAroundUs = (ctx, progress) => {
    ctx.fillStyle = '#FFF7C8';
    ctx.fillRect(0, 0, 900, 540);

    // Use an internal cycle phase (0-3) based on time if animating, or progress if not
    const cycle = isAnimating ? (Date.now() / 3000) % 3 : (progress * 3);
    const activeObj = Math.floor(cycle);
    const objProgress = cycle % 1; // 0 to 1 inside current object's turn

    const objects = [
      { name: 'Kettle', icon: '🫖', in: '⚡ Electrical Energy', out: '🔥 Heat Energy', x: 200, y: 250 },
      { name: 'Torch', icon: '🔦', in: '🔋 Chemical Energy', out: '💡 Light Energy', x: 450, y: 250 },
      { name: 'Fan', icon: '🌬️', in: '⚡ Electrical Energy', out: '💨 Kinetic Energy', x: 700, y: 250 }
    ];

    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 24px Nunito';
    ctx.textAlign = 'center';
    ctx.fillText('Energy cycles through everyday objects!', 450, 60);

    objects.forEach((obj, idx) => {
      const isActive = idx === activeObj && isAnimating;
      const isDone = progress > 0.9 || (isAnimating && idx < activeObj) || (!isAnimating && progress > (idx + 1) / 3);

      // Draw box
      ctx.fillStyle = isActive ? '#FFF' : 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.roundRect(obj.x - 100, obj.y - 120, 200, 240, 16);
      ctx.fill();
      ctx.strokeStyle = isActive ? '#F39C12' : '#BDC3C7';
      ctx.lineWidth = isActive ? 4 : 2;
      ctx.stroke();

      // Icon & Name
      ctx.font = '70px Arial';
      ctx.fillText(obj.icon, obj.x, obj.y - 10);
      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 20px Nunito';
      ctx.fillText(obj.name, obj.x, obj.y - 80);

      // Draw Arrows and Labels for the Active object
      if (isActive || isDone) {
        const arrowLen = 120;

        // Input Arrow (Left side)
        ctx.fillStyle = '#3498DB';
        const inProg = isActive ? Math.min(1, objProgress * 2) : 1;
        if (inProg > 0) {
          ctx.beginPath();
          ctx.moveTo(obj.x - 110 - arrowLen, obj.y + 70);
          ctx.lineTo(obj.x - 110 - arrowLen + (arrowLen * inProg), obj.y + 70);
          ctx.lineWidth = 15;
          ctx.strokeStyle = '#3498DB';
          ctx.lineCap = 'round';
          ctx.stroke();

          // Arrowhead
          if (inProg > 0.8) {
            ctx.beginPath();
            ctx.moveTo(obj.x - 110, obj.y + 70);
            ctx.lineTo(obj.x - 125, obj.y + 60);
            ctx.lineTo(obj.x - 125, obj.y + 80);
            ctx.fill();
          }

          // Input Label
          ctx.font = 'bold 14px Nunito';
          ctx.fillText('IN: ' + obj.in, obj.x - 150, obj.y + 110);
        }

        // Output Arrow (Right side)
        ctx.fillStyle = '#E74C3C';
        const outProg = isActive ? Math.max(0, (objProgress - 0.5) * 2) : 1;
        if (outProg > 0) {
          ctx.beginPath();
          ctx.moveTo(obj.x + 110, obj.y + 70);
          ctx.lineTo(obj.x + 110 + (arrowLen * outProg), obj.y + 70);
          ctx.lineWidth = 15;
          ctx.strokeStyle = '#E74C3C';
          ctx.lineCap = 'round';
          ctx.stroke();

          // Arrowhead
          if (outProg > 0.8) {
            ctx.beginPath();
            ctx.moveTo(obj.x + 110 + arrowLen, obj.y + 70);
            ctx.lineTo(obj.x + 95 + arrowLen, obj.y + 60);
            ctx.lineTo(obj.x + 95 + arrowLen, obj.y + 80);
            ctx.fill();
          }

          // Output Label
          ctx.font = 'bold 14px Nunito';
          ctx.fillText('OUT: ' + obj.out, obj.x + 150, obj.y + 110);
        }
      }
    });

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 400, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 430);
    }
  };

  // Renderer for ID 7: Energy and Energy Transfer
  const renderEnergyTransfer = (ctx, progress) => {
    ctx.fillStyle = '#F5E6C8';
    ctx.fillRect(0, 0, 900, 540);

    const stages = [
      { text: '☀️', x: 150, y: 250, label: 'The Sun' },
      { text: '🌻', x: 450, y: 250, label: 'Plant (Producer)' },
      { text: '🦓', x: 750, y: 250, label: 'Animal (Consumer)' }
    ];

    // Background connection line
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(150, 250);
    ctx.lineTo(750, 250);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw entities
    stages.forEach((stage, i) => {
      // Scale up based on progress
      const p = Math.max(0, Math.min(1, (progress - i * 0.2) * 4));

      ctx.save();
      ctx.translate(stage.x, stage.y);
      ctx.scale(p, p);

      ctx.font = '80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stage.text, 0, 0);

      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 18px Nunito';
      ctx.fillText(stage.label, 0, 70);
      ctx.restore();
    });

    // Arrow 1: Sun to Plant (Large)
    if (progress > 0.4) {
      const a1P = Math.min(1, (progress - 0.4) * 3);
      const startX = 220, endX = 380, y = 250;

      ctx.fillStyle = '#F39C12';
      ctx.beginPath();
      // Thick arrow
      ctx.moveTo(startX, y - 15);
      ctx.lineTo(startX + (endX - startX - 30) * a1P, y - 15);
      ctx.lineTo(startX + (endX - startX - 30) * a1P, y - 30);
      ctx.lineTo(startX + (endX - startX) * a1P, y);
      ctx.lineTo(startX + (endX - startX - 30) * a1P, y + 30);
      ctx.lineTo(startX + (endX - startX - 30) * a1P, y + 15);
      ctx.lineTo(startX, y + 15);
      ctx.fill();

      // Energy particles moving inside arrow if animating
      if (isAnimating) {
        ctx.fillStyle = '#FFF';
        for (let i = 0; i < 3; i++) {
          const px = startX + ((Date.now() * 0.1 + i * 50) % (endX - startX - 40));
          ctx.beginPath();
          ctx.arc(px, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Arrow 2: Plant to Animal (Smaller)
    if (progress > 0.7) {
      const a2P = Math.min(1, (progress - 0.7) * 3);
      const startX = 520, endX = 680, y = 250;

      ctx.fillStyle = '#E67E22';
      ctx.beginPath();
      // Thin arrow to show energy loss
      ctx.moveTo(startX, y - 8);
      ctx.lineTo(startX + (endX - startX - 20) * a2P, y - 8);
      ctx.lineTo(startX + (endX - startX - 20) * a2P, y - 16);
      ctx.lineTo(startX + (endX - startX) * a2P, y);
      ctx.lineTo(startX + (endX - startX - 20) * a2P, y + 16);
      ctx.lineTo(startX + (endX - startX - 20) * a2P, y + 8);
      ctx.lineTo(startX, y + 8);
      ctx.fill();

      // Energy loss label (heat/movement)
      ctx.fillStyle = '#E74C3C';
      ctx.font = 'bold 14px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Energy Lost (Heat)', startX + (endX - startX) / 2, y - 40);
      ctx.beginPath();
      ctx.moveTo(startX + (endX - startX) / 2, y - 25);
      ctx.lineTo(startX + (endX - startX) / 2, y - 10);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E74C3C';
      ctx.stroke();
    }

    // Final summary box
    if (progress > 0.95) {
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.roundRect(150, 420, 600, 60, 12);
      ctx.fill();
      ctx.strokeStyle = '#F39C12';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 20px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('The SUN is the primary source of energy for almost all life!', 450, 455);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 320, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 350);
    }
  };

  // Renderer for ID 8: Food Chain
  const renderFoodChain = (ctx, progress) => {
    ctx.fillStyle = '#E8F5E green';
    ctx.fillStyle = '#ECF9F1';
    ctx.fillRect(0, 0, 900, 540);

    const organisms = [
      { name: 'Sun', emoji: '☀️', x: 100 },
      { name: 'Grass', emoji: '🌿', x: 280 },
      { name: 'Grasshopper', emoji: '🦗', x: 460 },
      { name: 'Frog', emoji: '🐸', x: 640 },
      { name: 'Eagle', emoji: '🦅', x: 820 }
    ];

    organisms.forEach((org, i) => {
      const isFaded = breakPoint !== null && i >= breakPoint;
      ctx.globalAlpha = isFaded ? 0.2 : 1.0;

      // Draw organism
      ctx.font = '60px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(org.emoji, org.x, 250);

      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 14px Nunito';
      ctx.fillText(org.name, org.x, 300);

      // Draw Arrow if not last and not broken
      if (i < organisms.length - 1) {
        const arrowStart = org.x + 40;
        const arrowEnd = organisms[i + 1].x - 40;
        const isActive = progress > (i / organisms.length) && !isFaded && (breakPoint === null || i < breakPoint - 1);

        ctx.strokeStyle = isActive ? '#F39C12' : '#BDC3C7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(arrowStart, 250);
        ctx.lineTo(arrowEnd, 250);
        ctx.stroke();

        if (isActive) {
          // Animated energy pulse
          const pulsePos = arrowStart + ((Date.now() * 0.1) % (arrowEnd - arrowStart));
          ctx.fillStyle = '#F4D03F';
          ctx.beginPath();
          ctx.arc(pulsePos, 250, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    ctx.globalAlpha = 1.0;

    if (breakPoint !== null) {
      ctx.fillStyle = '#E74C3C';
      ctx.font = 'bold 18px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('The chain is BROKEN! Energy cannot flow.', 450, 400);
    } else if (progress > 0.9) {
      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 18px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Energy flows from producers to consumers!', 450, 400);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 320, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 350);
    }
  };

  // Renderer for ID 9: Earth Features
  const renderEarthFeatures = (ctx, progress) => {
    ctx.fillStyle = '#001440';
    ctx.fillRect(0, 0, 900, 540);

    const cx = 450;
    const cy = 270;
    const r = 180;

    // Stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < 50; i++) {
      const sx = (i * 97) % 900;
      const sy = (i * 137) % 540;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Globe Rotation
    const rotation = Date.now() * 0.0005;

    // Earth Base
    const earthGrad = ctx.createRadialGradient(cx - 40, cy - 40, 10, cx, cy, r);
    earthGrad.addColorStop(0, '#3498DB');
    earthGrad.addColorStop(1, '#1A2E5A');
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Map/Features
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Draw some continents that "rotate"
    for (let i = -1; i <= 1; i++) {
      const offset = (rotation % (Math.PI * 2)) + (i * Math.PI * 2);
      const lx = cx + Math.cos(offset) * r * 0.8;

      ctx.fillStyle = '#27AE60';
      ctx.beginPath();
      ctx.ellipse(lx, cy, r * 0.4, r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Features highlighting
    const features = [
      { name: 'Mountains', x: 400, y: 200, label: 'Tall landforms!' },
      { name: 'Rivers', x: 480, y: 300, label: 'Moving fresh water!' },
      { name: 'Oceans', x: 550, y: 250, label: 'Giant salt water!' },
      { name: 'Continents', x: 380, y: 320, label: 'Massive land areas!' }
    ];

    const activeIdx = Math.floor(progress * features.length);
    if (progress > 0 && activeIdx < features.length) {
      const f = features[activeIdx];

      // Highlight circle
      ctx.strokeStyle = '#F1C40F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.roundRect(f.x + 20, f.y - 40, 150, 45, 8);
      ctx.fill();

      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 16px Nunito';
      ctx.textAlign = 'left';
      ctx.fillText(f.name, f.x + 30, f.y - 22);
      ctx.font = '12px Nunito';
      ctx.fillText(f.label, f.x + 30, f.y - 7);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 450, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 480);
    }
  };

  // Renderer for ID 10: Moon Features
  const renderMoonFeatures = (ctx, progress) => {
    ctx.fillStyle = '#05070A';
    ctx.fillRect(0, 0, 900, 540);

    const cx = 350;
    const cy = 270;
    const r = 160;

    // Moon Base
    const moonGrad = ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, r);
    moonGrad.addColorStop(0, '#ECF0F1');
    moonGrad.addColorStop(1, '#7F8C8D');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Craters
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    const craters = [
      { x: cx - 50, y: cy - 60, sr: 20, name: 'Tycho Crater' },
      { x: cx + 60, y: cy - 20, sr: 30, name: 'Copernicus Crater' },
      { x: cx - 20, y: cy + 70, sr: 25, name: 'Kepler Crater' }
    ];

    craters.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.sr, 0, Math.PI * 2);
      ctx.fill();

      // Highlight sequentially
      const isActive = progress > (i / (craters.length + 1)) && progress < ((i + 1) / (craters.length + 1));
      if (isActive) {
        ctx.strokeStyle = '#F1C40F';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.sr + 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Nunito';
        ctx.textAlign = 'center';
        ctx.fillText(c.name, c.x, c.y + c.sr + 30);
      }
    });

    // Earth Size Comparison
    if (progress > 0.8) {
      const ex = 750;
      const ey = 270;
      const er = r * 3.7; // Earth is about 3.7x moon size

      ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
      ctx.setLineDash([10, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ex, ey, er, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(52, 152, 219, 0.8)';
      ctx.font = 'bold 20px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Earth (Size Comparison)', ex, ey);
      ctx.font = '14px Nunito';
      ctx.fillText('The Moon is much smaller than Earth!', ex, ey + 30);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 450, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 480);
    }
  };

  // Renderer for ID 11: Frame Structures
  const renderFrameStructures = (ctx, progress) => {
    ctx.fillStyle = '#F5E6B green'; // Mistake in previous edit, fixing to #F5FBEF
    ctx.fillStyle = '#F5FBEF';
    ctx.fillRect(0, 0, 900, 540);

    const transparency = progress > 0.2 ? Math.max(0.2, 1.2 - progress) : 1.0;
    const cx = 450, cy = 350;

    // Ground
    ctx.fillStyle = '#D4AC0D';
    ctx.fillRect(0, 400, 900, 140);

    // Internal Frame (Always visible but highlighted later)
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 6;

    // Vertical Poles
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const px = cx + Math.cos(angle) * 120;
      const py = cy + Math.sin(angle) * 40;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, py - 150);
      ctx.stroke();
    }

    // Triangular Roof Support (Glows at end)
    const isGlow = progress > 0.7;
    ctx.strokeStyle = isGlow ? '#F1C40F' : '#5D4037';
    ctx.shadowBlur = isGlow ? 15 : 0;
    ctx.shadowColor = '#F1C40F';

    // Conical roof struts
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const px = cx + Math.cos(angle) * 120;
      const py = cy + Math.sin(angle) * 40 - 150;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(cx, cy - 280);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Outer Covering
    ctx.globalAlpha = transparency;
    ctx.fillStyle = '#A1887F';
    // Walls
    ctx.beginPath();
    ctx.ellipse(cx, cy, 130, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(cx - 130, cy - 150, 260, 150);
    // Roof
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.moveTo(cx - 150, cy - 150);
    ctx.lineTo(cx, cy - 300);
    ctx.lineTo(cx + 150, cy - 150);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    if (progress > 0.5) {
      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 20px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Revealing the internal FRAME structure!', 450, 80);
      if (isGlow) {
        ctx.fillStyle = '#B03A2E';
        ctx.fillText('Triangular supports make it STRONG!', 450, 110);
      }
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 200, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 230);
    }
  };

  // Renderer for ID 12: Input and Output Energy
  const renderInputOutputEnergy = (ctx, progress) => {
    ctx.fillStyle = '#FFFDE7';
    ctx.fillRect(0, 0, 900, 540);

    const devices = [
      { name: 'Electric Iron', in: '⚡ Electrical', out: '🔥 Heat (Useful)', waste: '💨 Sound (Wasted)', icon: '🔌' },
      { name: 'Light Bulb', in: '⚡ Electrical', out: '💡 Light (Useful)', waste: '🔥 Heat (Wasted)', icon: '💡' },
      { name: 'Petrol Car', in: '⛽ Chemical', out: '🏎️ Kinetic (Useful)', waste: '🔊 Sound (Wasted)', icon: '🚗' }
    ];

    const idx = Math.floor(progress * 3);
    const subProg = (progress * 3) % 1;
    const device = devices[idx === 3 ? 2 : idx];

    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 24px Nunito';
    ctx.textAlign = 'center';
    ctx.fillText(device.name, 450, 60);

    const cx = 450, cy = 250;

    // Draw box for device
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.roundRect(cx - 80, cy - 80, 160, 160, 20);
    ctx.fill();
    ctx.strokeStyle = '#3498DB';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = '80px Arial';
    ctx.fillText(device.icon, cx, cy + 30);

    // Arrows
    const drawArrow = (x, y, tx, ty, color, label) => {
      const prog = Math.min(1, subProg * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (tx - x) * prog, y + (ty - y) * prog);
      ctx.stroke();

      if (prog > 0.8) {
        ctx.fillStyle = color;
        ctx.font = 'bold 14px Nunito';
        ctx.textAlign = 'center';
        ctx.fillText(label, tx, ty > y ? ty + 25 : ty - 15);
      }
    };

    // IN Arrow (Left)
    drawArrow(150, 250, 350, 250, '#3498DB', 'IN: ' + device.in);

    // OUT Useful (Right)
    if (subProg > 0.3) {
      drawArrow(550, 230, 750, 230, '#27AE60', 'OUT: ' + device.out);
    }

    // OUT Wasted (Right-Down)
    if (subProg > 0.5) {
      drawArrow(550, 270, 750, 350, '#E67E22', 'OUT: ' + device.waste);
    }

    // Play button hint
    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 420, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 450);
    }
  };

  // Renderer for ID 13: Living Things (Processes)
  const renderLivingLifeProcesses = (ctx, progress) => {
    ctx.fillStyle = '#E8F5E9';
    ctx.fillRect(0, 0, 900, 540);

    const processes = [
      { name: 'Growth', emoji: '📈', x: 250 },
      { name: 'Movement', emoji: '🏃', x: 450 },
      { name: 'Reproduction', emoji: '🐣', x: 650 }
    ];

    ctx.font = '100px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🌻', 300, 250);
    ctx.fillText('🐕', 600, 250);

    const activeIdx = Math.floor(progress * processes.length);
    processes.forEach((p, i) => {
      const isActive = i === activeIdx && progress > 0;
      ctx.globalAlpha = isActive ? 1.0 : 0.3;

      ctx.fillStyle = isActive ? '#1A2E5A' : '#7F8C8D';
      ctx.beginPath();
      ctx.roundRect(p.x - 80, 400, 160, 100, 15);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '40px Arial';
      ctx.fillText(p.emoji, p.x, 445);
      ctx.font = 'bold 16px Nunito';
      ctx.fillText(p.name, p.x, 480);
    });
    ctx.globalAlpha = 1.0;

    if (progress > 0.9) {
      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 22px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Living things carry out all life processes!', 450, 100);
    }

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 320, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 350);
    }
  };

  // Renderer for ID 14: Energy and Sound (Drum)
  const renderMakingSoundsDrum = (ctx, progress) => {
    ctx.fillStyle = '#FBFCFC';
    ctx.fillRect(0, 0, 900, 540);

    const cx = 450, cy = 270;
    const isVibrating = isAnimating;
    const vibration = isVibrating ? Math.sin(Date.now() * 0.05) * 5 : 0;

    ctx.fillStyle = '#A04000';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 50, 150, 40, 0, 0, Math.PI);
    ctx.fill();
    ctx.fillRect(cx - 150, cy - 50 + vibration, 300, 100);

    ctx.fillStyle = '#FAD7A0';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 50 + vibration, 150, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#873600';
    ctx.lineWidth = 4;
    ctx.stroke();

    if (isAnimating) {
      const waveProg = (progress * 5) % 1;
      ctx.strokeStyle = `rgba(46, 134, 193, ${1 - waveProg})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy - 50, 150 + waveProg * 200, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 22px Nunito';
    ctx.textAlign = 'center';
    ctx.fillText('Vibration produces sound!', 450, 100);

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 450, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 480);
    }
  };

  // Renderer for ID 15: Rocket Systems (Balloon)
  const renderRocketSystemsBalloon = (ctx, progress) => {
    ctx.fillStyle = '#F2F4F4';
    ctx.fillRect(0, 0, 900, 540);

    ctx.strokeStyle = '#BDC3C7';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 270);
    ctx.lineTo(800, 270);
    ctx.stroke();
    ctx.setLineDash([]);

    const startX = 200;
    const endX = 700;
    const currentX = startX + (endX - startX) * progress;

    if (isAnimating && progress < 0.9) {
      ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
      for (let i = 0; i < 5; i++) {
        const px = currentX - 60 - Math.random() * 50;
        const py = 270 + (Math.random() - 0.5) * 40;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = '#E74C3C';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(currentX - 80, 270);
      ctx.lineTo(currentX - 150, 270);
      ctx.stroke();
      ctx.fillStyle = '#E74C3C';
      ctx.font = 'bold 14px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Action: Air Backward', currentX - 120, 240);
    }

    ctx.fillStyle = '#E74C3C';
    ctx.beginPath();
    ctx.ellipse(currentX, 270, 60 - progress * 40, 40 - progress * 20, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isAnimating) {
      ctx.strokeStyle = '#27AE60';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(currentX + 80, 270);
      ctx.lineTo(currentX + 150, 270);
      ctx.stroke();
      ctx.fillStyle = '#27AE60';
      ctx.font = 'bold 14px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Reaction: Balloon Forward', currentX + 120, 310);
    }

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 350, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 380);
    }
  };

  // Renderer for ID 16: Musical Instruments (Guitar)
  const renderMusicalInstrumentsGuitar = (ctx, progress) => {
    ctx.fillStyle = '#FDEBD0';
    ctx.fillRect(0, 0, 900, 540);

    ctx.fillStyle = '#3E2723';
    ctx.beginPath();
    ctx.roundRect(50, 100, 800, 340, 20);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(450, 270, 100, 0, Math.PI * 2);
    ctx.fill();

    const speed = progress < 0.5 ? 0.05 : 0.15;
    const vibration = isAnimating ? Math.sin(Date.now() * speed) * (10 * (1 - progress)) : 0;

    ctx.strokeStyle = '#D4AC0D';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 270);
    ctx.quadraticCurveTo(450, 270 + vibration * 2, 800, 270);
    ctx.stroke();

    if (isAnimating) {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText(progress < 0.5 ? 'Low Pitch (Slow Vibration)' : 'High Pitch (Fast Vibration!)', 450, 150);
    }

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 460, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 490);
    }
  };

  // Renderer for ID 17: Earth's Orbit (365 Days)
  const renderEarthsOrbit365 = (ctx, progress) => {
    ctx.fillStyle = '#05070A';
    ctx.fillRect(0, 0, 900, 540);

    const cx = 450, cy = 270;
    const sunGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 60);
    sunGrad.addColorStop(0, '#F1C40F');
    sunGrad.addColorStop(1, '#D35400');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 200, 0, Math.PI * 2);
    ctx.stroke();

    const angle = progress * Math.PI * 2 - Math.PI / 2;
    const ex = cx + Math.cos(angle) * 200;
    const ey = cy + Math.sin(angle) * 200;

    ctx.fillStyle = '#3498DB';
    ctx.beginPath();
    ctx.arc(ex, ey, 20, 0, Math.PI * 2);
    ctx.fill();

    const mAngle = progress * Math.PI * 24;
    const mx = ex + Math.cos(mAngle) * 40;
    const my = ey + Math.sin(mAngle) * 40;
    ctx.fillStyle = '#BDC3C7';
    ctx.beginPath();
    ctx.arc(mx, my, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.roundRect(350, 40, 200, 60, 10);
    ctx.fill();
    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 24px Nunito';
    ctx.textAlign = 'center';
    ctx.fillText(Math.floor(progress * 365) + ' Days', 450, 78);

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 450, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 480);
    }
  };

  // Renderer for ID 18: Habitat Needs
  const renderHabitatNeeds = (ctx, progress) => {
    ctx.fillStyle = '#E8F6F3';
    ctx.fillRect(0, 0, 900, 540);

    const needs = [
      { name: 'Food', emoji: '🍎', x: 200 },
      { name: 'Water', emoji: '💧', x: 450 },
      { name: 'Shelter', emoji: '🏠', x: 700 }
    ];

    const isWoke = progress > 0.8;
    ctx.font = '120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🐘', 450, 300);
    if (!isWoke) {
      ctx.fillStyle = '#7F8C8D';
      ctx.font = 'bold 14px Nunito';
      ctx.fillText('Zzz...', 480, 220);
    } else {
      ctx.fillStyle = '#27AE60';
      ctx.font = 'bold 24px Nunito';
      ctx.fillText('Healthy & Active!', 450, 180);
    }

    needs.forEach((n, i) => {
      const isVisible = progress > (i / 4);
      ctx.globalAlpha = isVisible ? 1.0 : 0.1;

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.roundRect(n.x - 60, 400, 120, 100, 15);
      ctx.fill();
      ctx.strokeStyle = '#1A2E5A';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'black';
      ctx.font = '40px Arial';
      ctx.fillText(n.emoji, n.x, 445);
      ctx.font = 'bold 16px Nunito';
      ctx.fillText(n.name, n.x, 480);
    });
    ctx.globalAlpha = 1.0;

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 320, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 350);
    }
  };

  // Renderer for ID 19: Noise Pollution
  const renderNoisePollutionMeter = (ctx, progress) => {
    ctx.fillStyle = '#F4F6F7';
    ctx.fillRect(0, 0, 900, 540);

    ctx.fillStyle = '#BDC3C7';
    ctx.fillRect(0, 400, 900, 140);

    const cx = 450, cy = 480;
    const r = 200;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.arc(cx, cy, r, Math.PI, 0);
    ctx.fill();

    ctx.strokeStyle = '#27AE60';
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 20, Math.PI, Math.PI + Math.PI / 3);
    ctx.stroke();
    ctx.strokeStyle = '#F1C40F';
    ctx.beginPath();
    ctx.arc(cx, cy, r - 20, Math.PI + Math.PI / 3, Math.PI + 2 * Math.PI / 3);
    ctx.stroke();
    ctx.strokeStyle = '#C0392B';
    ctx.beginPath();
    ctx.arc(cx, cy, r - 20, Math.PI + 2 * Math.PI / 3, Math.PI * 2);
    ctx.stroke();

    const level = progress < 0.3 ? progress * 3 * 1.0 : (progress < 0.7 ? 1.0 : 1.0 - (progress - 0.7) * 3);
    const angle = Math.PI + level * Math.PI;
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * (r - 40), cy + Math.sin(angle) * (r - 40));
    ctx.stroke();

    ctx.fillStyle = '#1A2E5A';
    ctx.font = 'bold 24px Nunito';
    ctx.textAlign = 'center';
    ctx.fillText(level > 0.8 ? 'UNSAFE: Too Loud!' : 'SAFE: Quiet', 450, 100);

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 150, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 180);
    }
  };

  // Renderer for ID 20: Non-Living Things
  const renderNonLivingThings = (ctx, progress) => {
    ctx.fillStyle = '#FEF9E7';
    ctx.fillRect(0, 0, 900, 540);

    const items = [
      { name: 'Rock', emoji: '🪨', x: 200 },
      { name: 'River', emoji: '🌊', x: 450 },
      { name: 'Fire', emoji: '🔥', x: 700 }
    ];

    const processes = ['Growth', 'Reproduction', 'Breathing'];

    items.forEach((item, i) => {
      ctx.font = '80px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.emoji, item.x, 200);
      ctx.font = 'bold 18px Nunito';
      ctx.fillStyle = '#1A2E5A';
      ctx.fillText(item.name, item.x, 240);

      processes.forEach((p, pi) => {
        const py = 300 + pi * 60;
        const isShown = progress > ((i * processes.length + pi) / (items.length * processes.length));

        ctx.globalAlpha = isShown ? 1.0 : 0.1;
        ctx.font = '14px Nunito';
        ctx.textAlign = 'right';
        ctx.fillText(p + ':', item.x - 10, py);

        if (isShown) {
          ctx.fillStyle = '#E74C3C';
          ctx.font = 'bold 16px Nunito';
          ctx.textAlign = 'left';
          ctx.fillText('❌ NO', item.x + 5, py);
        }
        ctx.fillStyle = '#1A2E5A';
      });
      ctx.globalAlpha = 1.0;
    });

    if (progress > 0.95) {
      ctx.fillStyle = '#1A2E5A';
      ctx.font = 'bold 22px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Non-living things DO NOT carry out life processes!', 450, 60);
    }

    if (!isAnimating && progress <= 0) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
      ctx.beginPath();
      ctx.roundRect(350, 460, 200, 45, 22);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▶  Press Play', 450, 490);
    }
  };

  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Custom interactive renderers
    if (activeSim?.id === 2) {
      renderChangeOfState(ctx, temperature);
      return;
    } else if (activeSim?.id === 3) {
      renderPlantGrowth(ctx, animProgress);
      return;
    } else if (activeSim?.id === 4) {
      renderAnimalHabitats(ctx, animProgress);
      return;
    } else if (activeSim?.id === 5) {
      renderPlanetEarth(ctx, animProgress);
      return;
    } else if (activeSim?.id === 6) {
      renderEnergyAroundUs(ctx, animProgress);
      return;
    } else if (activeSim?.id === 7) {
      renderEnergyTransfer(ctx, animProgress);
      return;
    } else if (activeSim?.id === 8) {
      renderFoodChain(ctx, animProgress);
      return;
    } else if (activeSim?.id === 9) {
      renderEarthFeatures(ctx, animProgress);
      return;
    } else if (activeSim?.id === 10) {
      renderMoonFeatures(ctx, animProgress);
      return;
    } else if (activeSim?.id === 11) {
      renderFrameStructures(ctx, animProgress);
      return;
    } else if (activeSim?.id === 12) {
      renderInputOutputEnergy(ctx, animProgress);
      return;
    } else if (activeSim?.id === 13) {
      renderLivingLifeProcesses(ctx, animProgress);
      return;
    } else if (activeSim?.id === 14) {
      renderMakingSoundsDrum(ctx, animProgress);
      return;
    } else if (activeSim?.id === 15) {
      renderRocketSystemsBalloon(ctx, animProgress);
      return;
    } else if (activeSim?.id === 16) {
      renderMusicalInstrumentsGuitar(ctx, animProgress);
      return;
    } else if (activeSim?.id === 17) {
      renderEarthsOrbit365(ctx, animProgress);
      return;
    } else if (activeSim?.id === 18) {
      renderHabitatNeeds(ctx, animProgress);
      return;
    } else if (activeSim?.id === 19) {
      renderNoisePollutionMeter(ctx, animProgress);
      return;
    } else if (activeSim?.id === 20) {
      renderNonLivingThings(ctx, animProgress);
      return;
    }

    // Clear
    ctx.fillStyle = activeSim?.topicClass === 'earth' ? '#001440' :
      activeSim?.topicClass === 'energy' ? '#FFF7C8' :
        activeSim?.topicClass === 'living' ? '#E8F5E9' : '#F5E6C8';
    ctx.fillRect(0, 0, 900, 540);

    if (activeSim?.topicClass === 'earth') {
      ctx.fillStyle = 'white';
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc((i * 97) % 900, (i * 137) % 540, (i % 2) + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw interaction areas
    if (gameState === 'playing' && activeSim?.interactions) {
      activeSim.interactions.forEach((interaction, idx) => {
        const isActive = currentInteraction === interaction;

        // Vertical layout on mobile - stacked with proper spacing
        const x = isMobile ? (450 - interaction.width / 2) : interaction.x;
        const y = isMobile ? 60 + (idx * (interaction.height + 20)) : interaction.y;

        // Draw clickable area highlight
        ctx.strokeStyle = isActive ? '#FFD700' : 'rgba(255,255,255,0.5)';
        ctx.lineWidth = isActive ? 4 : 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(x, y, interaction.width, interaction.height);
        ctx.setLineDash([]);

        // Draw hint emoji/icon
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        const icons = ['🪹', '🕳️', '🐚', '🏠', '🪵', '🧊', '💧', '☁️', '🌱', '🌳', '🦁', '🐦', '🐪', '🐟', '🦓', '☀️', '🌍', '🌙', '⚡', '🎸'];
        ctx.fillText(icons[idx % icons.length],
          x + interaction.width / 2,
          y + interaction.height / 2 + 10);

        // Draw shelter/item name label with background pill
        const label = interaction.answer.split(' - ')[0];
        ctx.font = 'bold 14px Nunito, sans-serif';
        ctx.textAlign = 'center';
        const labelWidth = ctx.measureText(label).width + 20;
        const labelX = x + interaction.width / 2 - labelWidth / 2;
        const labelY = y - 24;

        // Background pill
        ctx.fillStyle = 'rgba(26, 46, 90, 0.85)';
        ctx.beginPath();
        ctx.roundRect(labelX, labelY, labelWidth, 22, 11);
        ctx.fill();

        // Label text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, x + interaction.width / 2, labelY + 16);
      });
    }

    // Draw fact box - adjusted for mobile vertical layout
    if (showFact && currentInteraction) {
      const boxY = isMobile ? 480 : 400;
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.beginPath();
      ctx.roundRect(50, boxY, 800, 120, 20);
      ctx.fill();

      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 18px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentInteraction.answer, 450, 430);

      ctx.fillStyle = 'white';
      ctx.font = '14px Nunito, sans-serif';

      const words = showFact.split(' ');
      let line = '';
      let y = 460;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > 700) {
          ctx.fillText(line, 450, y);
          line = words[n] + ' ';
          y += 18;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 450, y);
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      renderGame();
    }
  }, [gameState, currentInteraction, showFact]);

  // Render quiz
  const renderQuiz = () => {
    if (!activeSim || gameState !== 'quiz') return null;

    const currentQuestion = activeSim.quiz[quizAnswers.length];
    if (!currentQuestion) return null;

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <button
          onClick={goBack}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: '#FFD700',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#1A2E5A',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <HelpCircle size={32} color="#1A2E5A" />
            <h2 style={{ fontFamily: 'Nunito', color: '#1A2E5A', margin: 0 }}>
              Question {quizAnswers.length + 1} of {activeSim.quiz.length}
            </h2>
          </div>

          <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1A2E5A' }}>
            {currentQuestion.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(quizAnswers.length, idx)}
                disabled={showResult?.showing}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  background: 'white',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#1A2E5A',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult?.showing && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              borderRadius: '12px',
              background: showResult.correct ? '#D4EDDA' : '#F8D7DA',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {showResult.correct ?
                <><CheckCircle color="#28A745" /> <strong>Correct!</strong></> :
                <><XCircle color="#DC3545" /> <strong>Not quite!</strong></>
              }
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="header">
        <div className="logo-badge">
          <div className="logo-text">
            <span className="speccon">SpecCon</span><span className="academy">Academy</span>
          </div>
          <span className="logo-subtitle">Grade 4 · Natural Science · CAPS-Aligned</span>
        </div>
        <div className="header-title">Grade 4 Science Games</div>
        <div className="header-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFD700' }}>
            <Trophy size={20} />
            <span style={{ fontWeight: 700 }}>{completedSims.length}/10</span>
          </div>
          <span className="caps-badge">Play & Learn!</span>
        </div>
      </header>

      <main className="container">
        <div className={`sim-grid ${activeSim ? 'hidden' : ''}`}>
          {simulations.map(sim => (
            <div key={sim.id} className={`sim-card ${sim.topicClass}`}>
              <div className="sim-icon">{sim.icon}</div>
              <div className="sim-topic">{sim.topic}</div>
              <div className="sim-title">{sim.title}</div>
              {completedSims.includes(sim.id) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#3CB64A', fontSize: '0.8rem', fontWeight: 600 }}>
                  <CheckCircle size={14} /> Completed!
                </div>
              )}
              <button className="launch-btn" onClick={() => launchSim(sim)}>
                {completedSims.includes(sim.id) ? 'Play Again!' : 'Start Game!'}
              </button>
            </div>
          ))}
        </div>

        {activeSim && (
          <div className="sim-viewport active">
            {/* Game Intro Screen */}
            {gameState === 'intro' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{activeSim.icon}</div>
                  <h2 style={{ fontFamily: 'Nunito', fontSize: '1.8rem', color: '#1A2E5A', margin: 0 }}>
                    {activeSim.intro.title}
                  </h2>
                  <p style={{ color: '#64748B', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                    {activeSim.intro.description}
                  </p>
                </div>

                <div style={{
                  background: '#F0F7FF',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ fontFamily: 'Nunito', color: '#1A2E5A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={20} /> How to Play:
                  </h3>
                  <ol style={{ paddingLeft: '1.5rem', color: '#475569' }}>
                    {activeSim.intro.instructions.map((inst, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem', lineHeight: 1.5 }}>{inst}</li>
                    ))}
                  </ol>
                </div>

                <div style={{
                  background: '#FFF8E7',
                  borderRadius: '12px',
                  padding: '1rem',
                  borderLeft: '4px solid #FFD700',
                  marginBottom: '1.5rem'
                }}>
                  <strong style={{ color: '#F4831F' }}>🎯 Goal: </strong>
                  <span style={{ color: '#1A2E5A' }}>{activeSim.intro.goal}</span>
                </div>

                <button
                  onClick={startGame}
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    borderRadius: '30px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3CB64A, #2E8B3A)',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: 'Nunito',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(60, 182, 74, 0.4)'
                  }}
                >
                  <Play size={24} /> Let's Play!
                </button>
              </div>
            )}

            {/* Game Playing Screen */}
            {gameState === 'playing' && (
              <>
                <div className="viewport-header">
                  <button className="back-btn" onClick={goBack}>← Quit Game</button>
                  <div className="breadcrumb">
                    <span className="breadcrumb-topic">{activeSim.topic}</span>
                    <span className="breadcrumb-sep">→</span>
                    <span className="breadcrumb-title">{activeSim.title}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {activeSim.id === 2 && (
                      <>
                        <button
                          onClick={() => {
                            if (!isAnimating && temperature <= -18) {
                              setIsAnimating(true);
                            }
                          }}
                          disabled={isAnimating || temperature > -18}
                          style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: isAnimating || temperature > -18 ? '#CBD5E1' : '#3CB64A',
                            color: 'white',
                            fontWeight: 700,
                            cursor: isAnimating || temperature > -18 ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Play size={16} /> Play
                        </button>
                        <button
                          onClick={() => {
                            setTemperature(-20);
                            setIsAnimating(false);
                            if (animationRef.current) clearInterval(animationRef.current);
                          }}
                          style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: '#1A2E5A',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <RefreshCw size={16} /> Reset
                        </button>
                      </>
                    )}
                    {(activeSim.id >= 3 && activeSim.id <= 20) && (
                      <>
                        <button
                          onClick={() => {
                            if (!isAnimating && animProgress < 1) {
                              setIsAnimating(true);
                            }
                          }}
                          disabled={isAnimating || animProgress >= 1}
                          style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: isAnimating || animProgress >= 1 ? '#CBD5E1' : '#3CB64A',
                            color: 'white',
                            fontWeight: 700,
                            cursor: isAnimating || animProgress >= 1 ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Play size={16} /> Play
                        </button>
                        <button
                          onClick={() => {
                            setAnimProgress(0);
                            setAnimPhase(0);
                            setBreakPoint(null);
                            setIsAnimating(false);
                            if (animationRef.current) clearInterval(animationRef.current);
                          }}
                          style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: '#1A2E5A',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <RefreshCw size={16} /> Reset
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setGameState('quiz')}
                      style={{
                        padding: '0.6rem 1.5rem',
                        borderRadius: '20px',
                        border: 'none',
                        background: '#F4831F',
                        color: 'white',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Take Quiz! <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="canvas-container" style={{ position: 'relative' }}>
                  <canvas
                    ref={canvasRef}
                    className="simulation-canvas"
                    width="900"
                    height="540"
                    onClick={handleCanvasClick}
                    style={{ cursor: 'pointer' }}
                  />
                  {renderQuiz()}
                </div>

                <div className="label-bar">
                  <p className="label-text" style={{ textAlign: 'center' }}>
                    {activeSim.id === 2
                      ? `🌡️ Watch ice melt into water and evaporate into steam! Temperature: ${Math.round(temperature)}°C`
                      : `👆 Click on each item to learn about it! There are ${activeSim.interactions.length} things to discover.`
                    }
                  </p>
                </div>
              </>
            )}

            {/* Quiz Screen */}
            {gameState === 'quiz' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <button
                  onClick={goBack}
                  className="back-btn"
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <HelpCircle size={48} color="#1A2E5A" style={{ marginBottom: '1rem' }} />
                  <h2 style={{ fontFamily: 'Nunito', fontSize: '1.8rem', color: '#1A2E5A' }}>
                    Test Your Knowledge!
                  </h2>
                  <p style={{ color: '#64748B' }}>Answer {activeSim.quiz.length} questions to complete this game!</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeSim.quiz.map((q, qIdx) => (
                    <div key={qIdx} style={{
                      padding: '1.5rem',
                      borderRadius: '12px',
                      background: quizAnswers.length > qIdx ? '#F0F7FF' : '#F8FAFC',
                      border: '2px solid #E2E8F0'
                    }}>
                      <p style={{ fontWeight: 600, color: '#1A2E5A', marginBottom: '1rem' }}>
                        {qIdx + 1}. {q.question}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleQuizAnswer(qIdx, oIdx)}
                            disabled={quizAnswers.length !== qIdx}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              border: quizAnswers[qIdx] === oIdx ?
                                (oIdx === q.correct ? '2px solid #3CB64A' : '2px solid #F44336') :
                                '2px solid #E2E8F0',
                              background: quizAnswers[qIdx] === oIdx ?
                                (oIdx === q.correct ? '#D4EDDA' : '#F8D7DA') :
                                'white',
                              cursor: quizAnswers.length === qIdx ? 'pointer' : 'default',
                              fontWeight: 500
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {quizAnswers[qIdx] !== undefined && (
                        <p style={{
                          marginTop: '0.5rem',
                          color: quizAnswers[qIdx] === q.correct ? '#3CB64A' : '#F44336',
                          fontWeight: 600
                        }}>
                          {quizAnswers[qIdx] === q.correct ? '✓ Correct!' : `✗ The answer was: ${q.options[q.correct]}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Screen */}
            {gameState === 'complete' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '3rem',
                maxWidth: '500px',
                margin: '0 auto',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
                <h2 style={{ fontFamily: 'Nunito', fontSize: '2rem', color: '#1A2E5A', marginBottom: '1rem' }}>
                  Congratulations!
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#64748B', marginBottom: '1.5rem' }}>
                  You completed <strong>{activeSim.title}</strong>!
                </p>

                <div style={{
                  background: '#FFF8E7',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#F4831F' }}>
                    <Star size={24} fill="#F4831F" />
                    <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{score}/{activeSim.quiz.length}</span>
                    <Star size={24} fill="#F4831F" />
                  </div>
                  <p style={{ color: '#64748B', marginTop: '0.5rem' }}>
                    {score === activeSim.quiz.length ? 'Perfect Score! 🌟' :
                      score >= activeSim.quiz.length / 2 ? 'Great Job! 👍' : 'Keep Learning! 📚'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={startGame}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '2px solid #E2E8F0',
                      background: 'white',
                      color: '#1A2E5A',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <RefreshCw size={18} /> Play Again
                  </button>
                  <button
                    onClick={goBack}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#3CB64A',
                      color: 'white',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Next Game! <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p><span className="footer-brand">© 2026 SpecCon Academy</span> · CAPS-Aligned Content · specconacademy.co.za</p>
      </footer>
    </>
  );
}

export default App;
