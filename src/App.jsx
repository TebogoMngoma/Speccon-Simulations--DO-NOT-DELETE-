import { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, CheckCircle, XCircle, Star, Trophy, HelpCircle, BookOpen, RefreshCw } from 'lucide-react';

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
      { x: 100, y: 300, width: 100, height: 80, answer: 'Nest - A SHELL structure made of twigs, circular shape provides strength!', fact: 'Birds weave twigs together to create a strong, flexible nest that protects eggs and babies.' },
      { x: 250, y: 300, width: 100, height: 80, answer: 'Burrow - A FRAME structure dug into the ground!', fact: 'Animals dig tunnels underground to create safe homes protected from predators and weather.' },
      { x: 400, y: 300, width: 100, height: 80, answer: 'Shell - A natural SHELL structure!', fact: 'Snails and turtles carry their homes on their backs! The shell protects them from danger.' },
      { x: 550, y: 300, width: 100, height: 80, answer: 'Kennel - A FRAME structure with walls and roof!', fact: 'Dog houses use wooden frames to create a sheltered space for pets.' },
      { x: 700, y: 300, width: 100, height: 80, answer: 'Kraal - A FRAME structure of fenced circles!', fact: 'Farmers in South Africa have used kraals for thousands of years to protect animals.' }
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
  { id: 11, topic: 'Structures & Materials', topicClass: 'structures', title: 'Indigenous Frame Structures', icon: '🏘️',
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
  { id: 12, topic: 'Energy & Sound', topicClass: 'energy', title: 'Input and Output Energy', icon: '🔌',
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
  { id: 13, topic: 'Living Things', topicClass: 'living', title: 'Living Things', icon: '🌳',
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
  { id: 14, topic: 'Energy & Sound', topicClass: 'energy', title: 'Making Sounds (Drum)', icon: '🥁',
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
  { id: 15, topic: 'Structures & Materials', topicClass: 'structures', title: 'Rocket Systems (Balloon)', icon: '🎈',
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
  { id: 16, topic: 'Energy & Sound', topicClass: 'energy', title: 'Musical Instruments (Guitar)', icon: '🎸',
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
  { id: 17, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'Earth\'s Orbit (365 Days)', icon: '🗓️',
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
  { id: 18, topic: 'Living Things', topicClass: 'living', title: 'Habitat Needs', icon: '🐘',
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
  { id: 19, topic: 'Energy & Sound', topicClass: 'energy', title: 'Noise Pollution', icon: '🔊',
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
  { id: 20, topic: 'Living Things', topicClass: 'living', title: 'Non-Living Things', icon: '🪨',
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
  { id: 21, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'Our Closest Star (The Sun)', icon: '☀️',
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
  { id: 22, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'Phases of the Moon', icon: '🌛',
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
  { id: 23, topic: 'Structures & Materials', topicClass: 'structures', title: 'Properties of Materials', icon: '🧱',
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
  { id: 24, topic: 'Structures & Materials', topicClass: 'structures', title: 'Raw vs Manufactured Materials', icon: '🪵',
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
  { id: 25, topic: 'Energy & Matter', topicClass: 'structures', title: 'Solids, Liquids and Gases', icon: '💨',
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
  { id: 26, topic: 'Living Things', topicClass: 'living', title: 'Structure of Animals', icon: '🦁',
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
  { id: 27, topic: 'Living Things', topicClass: 'living', title: 'Structure of Plants', icon: '🌻',
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
  { id: 28, topic: 'Structures & Materials', topicClass: 'structures', title: 'Struts and Frame Structures', icon: '🔺',
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
  { id: 29, topic: 'Earth, Moon & Sun', topicClass: 'earth', title: 'The Sun and Life', icon: '🌻',
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
  { id: 30, topic: 'Energy & Matter', topicClass: 'structures', title: 'The Water Cycle', icon: '💧',
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
  { id: 31, topic: 'Energy & Sound', topicClass: 'energy', title: 'Vibrations and Sound (Ruler)', icon: '📏',
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
  { id: 32, topic: 'Structures & Materials', topicClass: 'structures', title: 'Ways to Strengthen Materials', icon: '📦',
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
  const canvasRef = useRef(null);

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
  };

  const handleCanvasClick = (e) => {
    if (!activeSim || gameState !== 'playing') return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = 900 / rect.width;
    const scaleY = 540 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if click matches any interaction area
    for (let i = 0; i < activeSim.interactions.length; i++) {
      const interaction = activeSim.interactions[i];
      if (x >= interaction.x && x <= interaction.x + interaction.width &&
          y >= interaction.y && y <= interaction.y + interaction.height) {
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
  };

  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

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
        
        // Draw clickable area highlight
        ctx.strokeStyle = isActive ? '#FFD700' : 'rgba(255,255,255,0.5)';
        ctx.lineWidth = isActive ? 4 : 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(interaction.x, interaction.y, interaction.width, interaction.height);
        ctx.setLineDash([]);

        // Draw hint emoji/icon
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        const icons = ['🪹', '🕳️', '🐚', '🏠', '🪵', '🧊', '💧', '☁️', '🌱', '🌳', '🦁', '🐦', '🐪', '🐟', '🦓', '☀️', '🌍', '🌙', '⚡', '🎸'];
        ctx.fillText(icons[idx % icons.length], 
          interaction.x + interaction.width / 2, 
          interaction.y + interaction.height / 2 + 10);
        
        // Click prompt
        if (!isActive) {
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.font = 'bold 12px Nunito, sans-serif';
          ctx.fillText('Click!', interaction.x + interaction.width/2, interaction.y - 5);
        }
      });
    }

    // Draw fact box
    if (showFact && currentInteraction) {
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.beginPath();
      ctx.roundRect(50, 400, 800, 120, 20);
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
      ctx.fillText(showFact, 450, 460);
      
      ctx.fillStyle = '#3CB64A';
      ctx.font = 'bold 12px Nunito, sans-serif';
      ctx.fillText('Keep clicking to learn more!', 450, 500);
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
                    👆 Click on each item to learn about it! There are {activeSim.interactions.length} things to discover.
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
