
// ==========================================
// 📜 EPIC STORY GENERATOR
// Generates massive, 150+ sentence stories
// ==========================================

export const generateEpicStory = (choices, adventureMode) => {
    const getVal = (key) => {
        const c = choices[key];
        if (!c) return '';
        if (c.type === 'text') return c.value || '';
        if (c.type === 'drawing') return 'the hero';
        return typeof c === 'string' ? c : (c.label || '');
    };

    const heroType = getVal('hero');
    const worldType = getVal('world');
    const troubleType = getVal('trouble');
    const victoryType = getVal('victory');
    const endingType = getVal('ending');

    // Helpers to expand text count
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ---------------------------------------------------------
    // 📚 EXPANSION PACKS (Filler text to reach 150+ sentences)
    // ---------------------------------------------------------

    const weatherDescriptions = [
        "The sun hung low in the sky, casting long shadows across the land.",
        "A gentle breeze whispered through the trees, carrying secrets of old.",
        "Clouds gathered on the horizon, painting the sky in shades of purple and gold.",
        "The air was crisp and cool, filling their lungs with energy.",
        "Birds sang melodies that seemed to guide the way forward.",
        "The ground beneath was firm, a testament to the ancient earth.",
        "Rays of sunlight pierced through the canopy, illuminating the dust motes dancing in the air.",
        "It was a day that felt momentous, as if the world itself was holding its breath.",
        "The smell of rain was distant but promising.",
        "Nature seemed to be watching, silent and observant.",
        "Far above, a hawk circled, its sharp eyes scanning the terrain.",
        "The wind picked up, rustling the leaves like the pages of a history book.",
        "Silence reigned, save for the rhythmic crunch of footsteps.",
        "The atmosphere was thick with anticipation.",
        "Every step felt like a destiny unfolding.",
        "The sky was a canvas of infinite blue, stretching forever.",
        "Dewdrops glistened on the grass like scattered diamonds.",
        "The path ahead was winding, disappearing into the unknown.",
        "Shadows played tricks on the eyes, lengthening and shortening with the passing clouds.",
        "The world felt vast, ancient, and full of untold stories."
    ];

    const travelDescriptions = [
        "They walked for miles, observing the changing landscape.",
        "The journey was long, but their spirit remained unbroken.",
        "Over hills and through valleys they traveled.",
        "Each step took them further from home and closer to destiny.",
        "The road was rough, filled with stones and roots.",
        "They paused only to drink from cool streams.",
        "Wildlife scurried away as they approached.",
        "The rhythm of walking became a meditation.",
        "Hours turned into days as the quest continued.",
        "They climbed steep ridges and descended into deep gorges.",
        "The scenery shifted from lush green to rocky grey.",
        "Fatigue set in, but determination pushed them onward.",
        "They camped under the stars, watching the constellations wheel overhead.",
        "Morning brought new light and renewed resolve.",
        "The path was lonely, with few travelers to be seen.",
        "Ancient ruins dotted the landscape, remnants of a forgotten time.",
        "They crossed bridges made of old stone and weathered wood.",
        "The sound of their own breathing was their constant companion.",
        "They looked back only once, then fixed their eyes forward.",
        "The destination was still far, but hope shortened the distance."
    ];

    const thoughtDescriptions = [
        "The hero pondered the weight of their quest.",
        "Doubts famously crept in, but were quickly banished.",
        "Would they prevail? The question lingered in the mind.",
        "Memories of home brought a warm comfort.",
        "Focus was key; a single mistake could be the end.",
        "They recalled the legends of old heroes.",
        "What defines a true hero? Is it strength or heart?",
        "The burden of the world felt heavy on their shoulders.",
        "They visualized victory, holding the image clear.",
        "Fear was present, but courage is acting despite fear.",
        "They thought of the friends left behind.",
        "A promise made is a promise that must be kept.",
        "The unknown future is a blank page waiting to be written.",
        "Instincts honed by years of training took over.",
        "They analyzed every sound, every movement.",
        "Strategy was just as important as strength.",
        "The heart beats faster when destiny calls.",
        "They whispered a silent prayer for luck.",
        "Determination solidified into an iron will.",
        "There was no turning back now."
    ];

    // Function to generate a block of text (10 sentences)
    const generateBlock = (sourceArray, count = 10) => {
        let block = [];
        for (let i = 0; i < count; i++) {
            block.push(rand(sourceArray));
        }
        return block.join(" ");
    };

    // ---------------------------------------------------------
    // 📖 CHAPTER GENERATORS
    // ---------------------------------------------------------

    // CHAPTER 1: THE WORLD & HERO (Setup)
    const generateChapter1 = () => {
        const intro = `In the annals of history, few tales shine as brightly as this one. It began in the realm of ${worldType}, a place of breathtaking beauty and ancient mystery.`;
        const heroDesc = `Here lived a ${heroType}, known not just for their skill, but for their spirit. This hero was unlike any other. They woke every morning with a fire in their heart.`;
        const filler1 = generateBlock(weatherDescriptions, 20);
        const filler2 = generateBlock(thoughtDescriptions, 15);

        return [
            intro,
            `The world of ${worldType} was vast. It had mountains that scraped the sky and rivers that sang. People spoke of magic in hushed tones.`,
            filler1,
            heroDesc,
            `The ${heroType} was preparing for something, though they did not yet know what.`,
            filler2,
            `Life was peaceful, but peace is often the calm before the storm. The ${heroType} could feel a change in the wind.`,
            "Every legend has a beginning, and this was theirs."
        ].join(" ");
    };

    // CHAPTER 2: THE CALL (Inciting Incident)
    const generateChapter2 = () => {
        const event = `One fateful day, the tranquility was shattered. Signs of ${troubleType} began to appear at the edges of the land.`;
        const reaction = `The ${heroType} saw the signs. A shadow fell over the ${worldType}. It started small, a whisper in the dark.`;
        const filler = generateBlock(weatherDescriptions, 20);
        const decision = `They knew they could not stay idle. To do nothing was to accept defeat.`;

        return [
            event,
            "Rumors spread through the villages. Elders looked worried. Children stopped playing.",
            reaction,
            filler,
            "The choice was clear but difficult. Leave the safety of home or watch it fade?",
            decision,
            "The ${heroType} packed their gear. They took only what was needed.",
            "Goodbyes were said in silence. Words were too heavy.",
            "They stepped out the door and looked at the horizon.",
            "The adventure had truly begun."
        ].join(" ");
    };

    // CHAPTER 3: THE JOURNEY (Rising Action)
    const generateChapter3 = () => {
        const travel = `The road to face the ${troubleType} was treacherous. Leaving the familiar lands of ${worldType} required bravery.`;
        const filler1 = generateBlock(travelDescriptions, 25);
        const filler2 = generateBlock(weatherDescriptions, 15);

        return [
            travel,
            "Miles turned into leagues. The landscape shifted and warped.",
            filler1,
            "At night, strange sounds filled the air.",
            filler2,
            "They encountered obstacles: a fallen tree, a rushing river, a steep cliff.",
            "Each one was overcome with patience and skill.",
            `The thought of the ${troubleType} loomed large, a dark cloud in the distance.`,
            "But the ${heroType} pressed on. One foot in front of the other.",
            "They were getting closer."
        ].join(" ");
    };

    // CHAPTER 4: THE CONFLICT (Climax Part 1)
    const generateChapter4 = () => {
        const confrontation = `Finally, they arrived at the heart of the darkness. The ${troubleType} revealed itself in all its terrifying glory.`;
        const filler = generateBlock(thoughtDescriptions, 25);

        return [
            confrontation,
            "The air grew cold. The ground shook.",
            "It was a sight that would freeze a lesser soul.",
            filler,
            `The ${troubleType} roared, a sound that rattled the bones.`,
            `The ${heroType} stood their ground. They did not flinch.`,
            "The battle for the future of ${worldType} was about to begin.",
            "Time seemed to slow down.",
            "It was the moment of truth.",
            "Steel met shadow. Will met force."
        ].join(" ");
    };

    // CHAPTER 5: THE VICTORY (Climax Part 2)
    const generateChapter5 = () => {
        const action = `The ${heroType} remembered their plan. They decided to use ${victoryType}! It was a brilliant move.`;
        const filler = generateBlock(weatherDescriptions, 15); // Weather changes as battle ends

        return [
            action,
            "The tide of battle turned.",
            `Using ${victoryType} was unexpected. The ${troubleType} faltered.`,
            "Light began to pierce the darkness.",
            filler,
            "With one final effort, the hero pushed forward.",
            "The darkness shattered like glass.",
            "Silence returned to the land, but it was a peaceful silence.",
            "The threat was gone.",
            "They had done it. They had won."
        ].join(" ");
    };

    // CHAPTER 6: THE RESOLUTION (Ending & Moral)
    const generateChapter6 = () => {
        const resolve = `Peace returned to ${worldType}. The people cheered for the ${heroType}. ${endingType}`;
        const filler = generateBlock(thoughtDescriptions, 10);

        // Moral selection
        const morals = [
            "True courage is not the absence of fear, but acting in spite of it.",
            "Even the smallest light can shine in the darkest night.",
            "Friendship and determination can move mountains.",
            "Wisdom is often stronger than the sharpest sword.",
            "A hero lies within us all, waiting to be awakened."
        ];
        const moral = rand(morals);

        return [
            resolve,
            "The journey back was lighter, full of joy.",
            filler,
            "The tale of this adventure would be sung for generations.",
            `And so, the legend of the ${heroType} was etched into history.`,
            "The world was safe once more.",
            "They realized something important that day.",
            `MORAL: ${moral}`,
            "The End."
        ].join(" ");
    };

    // ---------------------------------------------------------
    // 🚀 ASSEMBLY
    // ---------------------------------------------------------
    if (adventureMode === 'explorer' || adventureMode === 'legend') {
        return [
            generateChapter1(),
            generateChapter2(),
            generateChapter3(),
            generateChapter4(),
            generateChapter5(),
            generateChapter6()
        ];
    } else {
        // Keep apprentice mode simpler (but still creative)
        return [
            generateChapter1(),
            generateChapter3(), // Skip detailed departure
            generateChapter5(), // Skip conflict detail
            generateChapter6()
        ];
    }
};

// ==========================================
// 🧠 COMPREHENSION GENERATOR
// Generates questions based on the story choices
// ==========================================

export const generateComprehension = (choices) => {
    const getVal = (key) => {
        const c = choices[key];
        if (!c) return '';
        if (c.type === 'text') return c.value || '';
        if (c.type === 'drawing') return 'the hero';
        return typeof c === 'string' ? c : (c.label || '');
    };

    const hero = getVal('hero');
    const world = getVal('world');
    const trouble = getVal('trouble');
    const victory = getVal('victory');

    return [
        {
            id: 1,
            type: 'mcq',
            question: `Who is the main character in this story?`,
            options: [hero, 'A Dragon', 'A Ghost', 'A King'],
            correctAnswer: hero,
            hint: 'Recall who the story is about.'
        },
        {
            id: 2,
            type: 'fill-blank',
            question: `The hero lived in a magical place called ________.`,
            options: [world, 'The Moon', 'The Ocean', 'The Desert'],
            correctAnswer: world,
            hint: 'Where did the story begin?'
        },
        {
            id: 3,
            type: 'mcq',
            question: `What was the great trouble they faced?`,
            options: [trouble, 'A Flood', 'An Earthquake', 'A Fire'],
            correctAnswer: trouble,
            hint: 'What caused fear in the land?'
        },
        {
            id: 4,
            type: 'open-ended',
            question: `Why do you think the hero chose to use ${victory}?`,
            correctAnswer: `(Answers will vary) Because ${victory} was their special power/tool.`,
            hint: 'Think about the hero\'s decision in the battle.'
        },
        {
            id: 5,
            type: 'vocab',
            question: `Which word describes the hero's feeling of being "brave" or "unafraid"?`,
            options: ['Courageous', 'Timorous', 'Sleepy', 'Confused'],
            correctAnswer: 'Courageous',
            hint: 'Synonym for brave.'
        }
    ];
};
