
// ==========================================
// 📜 EPIC STORY GENERATOR
// Version 2.0 - Mode Specific Stories
// ==========================================

export const generateEpicStory = (choices, adventureMode) => {
    const isApprentice = adventureMode === 'apprentice';
    const isLegend = adventureMode === 'legend';

    const prettify = (str) => {
        if (!str) return '';
        return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    const getVal = (key) => {
        const c = choices[key];
        if (!c) return '';
        if (c.type === 'text') return c.value || '';
        if (c.type === 'drawing') return 'the hero';
        const val = typeof c === 'string' ? c : (c.label || '');
        return prettify(val);
    };

    // Vocabulary Tier helper
    const v = (simple, normal, fancy) => {
        if (isApprentice) return simple;
        if (isLegend) return fancy;
        return normal;
    };

    const heroType = getVal('hero');
    const worldType = getVal('world');
    const troubleType = getVal('trouble');
    const victoryType = getVal('victory');
    const endingType = getVal('ending');

    // Helpers to expand text count
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ---------------------------------------------------------
    // 📚 EXPANSION PACKS
    // ---------------------------------------------------------

    const weatherDescriptions = [
        v("The sun was bright.", "The sun hung low in the sky, casting long shadows.", "The golden orb descended, dragging shadows across the ancient earth."),
        v("A nice wind blew.", "A gentle breeze whispered through the trees.", "A spectral gale murmured secrets of forgotten lore through the canopy."),
        v("Clouds looked cool.", "Clouds gathered on the horizon, painting the sky.", "Tempestuous clouds massed upon the horizon, a canvas of bruising purple."),
        v("It was a good day.", "The air was crisp and cool.", "The atmosphere crackled with a portentous energy."),
        v("Birds were singing.", "Birds sang melodies that guided the way.", "Avian choirs sang dirges that seemed to prophesy the path ahead."),
        v("The ground was hard.", "The ground beneath was firm.", "The terra firma was unyielding, aged by eons of history."),
        v("Sun light hit the trees.", "Rays of sunlight pierced through the canopy.", "Spears of luminescence pierced the verdant gloom."),
        v("It felt like a big day.", "It was a day that felt momentous.", "The very epoch seemed to hold its breath in anticipation."),
        v("Rain was coming.", "The smell of rain was distant but promising.", "The ozone scent of an approaching deluge hung heavy."),
        v("Nature was quiet.", "Nature seemed to be watching.", "The natural world stood as a silent sentinel.")
    ];

    const travelDescriptions = [
        v("They walked a lot.", "They walked for miles, observing the landscape.", "They traversed leagues, surveying the shifting topography."),
        v("It was a long trip.", "The journey was long, but their spirit remained.", "The odyssey was arduous, yet their resolve was indomitable."),
        v("They went over hills.", "Over hills and through valleys they traveled.", "Before them lay an undulating sea of peaks and dales."),
        v("They walked far.", "Each step took them further from home.", "Every stride severed them further from the sanctuary of origin."),
        v("The road was bumpy.", "The road was rough, filled with stones.", "The path was treacherous, strewn with the detritus of ages."),
        v("They drank water.", "They paused only to drink from cool streams.", "Respite was found only in the crystal waters of mountain rills."),
        v("Animals ran away.", "Wildlife scurried away as they approached.", "Fauna fled before their encroaching presence."),
        v("Walking was fun.", "The rhythm of walking became a meditation.", "The cadence of their march became a trance-like mantra."),
        v("Days went by.", "Hours turned into days as the quest continued.", "Time blurred as the sun wheeled overhead in its eternal cycle."),
        v("They climbed up.", "They climbed steep ridges.", "They ascended precipitous scarps that defied gravity.")
    ];

    const thoughtDescriptions = [
        v("The hero thought about the quest.", "The hero pondered the weight of their quest.", "The hero contemplated the gravity of their ordained burden."),
        v("They felt brave.", "Doubts crept in, but were quickly banished.", "Insidious doubts whispered, yet were exiled by sheer will."),
        v("Will they win?", "Would they prevail? The question lingered.", "Would victory be claimed? The query hung like mist."),
        v("They missed home.", "Memories of home brought a warm comfort.", "Nostalgic visions of the hearth provided a fleeting solace."),
        v("They stayed focused.", "Focus was key; a single mistake could be bad.", "Absolute concentration was paramount; error invited doom."),
        v("They remembered stories.", "They recalled the legends of old heroes.", "They invoked the sagas of antediluvian champions."),
        v("They felt strong.", "What defines a true hero? Strength or heart?", "Is heroism forged in sinew, or in the crucible of the soul?"),
        v("The world was big.", "The burden of the world felt heavy.", "The atlas of the world rested ponderously upon them."),
        v("They imagined winning.", "They visualized victory clearly.", "They manifested the triumph in their mind's eye."),
        v("They were not scared.", "Fear was present, but courage is acting anyway.", "Fear was a constant specter, but valor is its master.")
    ];

    const generateBlock = (sourceArray, count = 10) => {
        let block = [];
        for (let i = 0; i < count; i++) {
            block.push(rand(sourceArray));
        }
        return block.join(" ");
    };

    // ---------------------------------------------------------
    // 📖 CHAPTERS
    // ---------------------------------------------------------

    const generateChapter1 = () => {
        const intro = v(
            `Once upon a time in ${worldType}, there was a hero.`,
            `It began in the realm of ${worldType}, a place of beauty.`,
            `In the annals of the ${worldType}, a prophecy stirred.`
        );
        const heroDesc = v(
            `The ${heroType} was very brave and kind.`,
            `Here lived a ${heroType}, known for their skill and spirit.`,
            `A ${heroType} of peerless renown dwelt here, a paragon of might.`
        );
        const filler = generateBlock(weatherDescriptions, isApprentice ? 5 : 15);
        return [intro, filler, heroDesc, v("They were ready.", "They were preparing for something.", "Destiny awaited.")].join(" ");
    };

    const generateChapter2 = () => { // The Call
        const event = v(
            `But then, ${troubleType} started causing trouble!`,
            `One day, signs of ${troubleType} began to appear.`,
            `The tranquility was shattered when the omen of ${troubleType} manifested.`
        );
        const filler = generateBlock(weatherDescriptions, isApprentice ? 5 : 15);
        return [event, filler, v("Something had to be done.", "The hero knew they had to act.", "Action was the only recourse.")].join(" ");
    };

    const generateChapter3 = () => { // The Journey
        const travel = v(
            `So the ${heroType} went on a trip.`,
            `The road to face the ${troubleType} was long.`,
            `The pilgrimage to confront the ${troubleType} was fraught with peril.`
        );
        const filler = generateBlock(travelDescriptions, isApprentice ? 8 : 20);
        return [travel, filler, v("They walked a long way.", "They pressed on.", "They persevered against the odds.")].join(" ");
    };

    const generateChapter4 = () => { // The Conflict
        const confrontation = v(
            `They found the ${troubleType}.`,
            `Finally, they arrived at the darkness of ${troubleType}.`,
            `At the nadir of the world, they beheld the ${troubleType} in its horror.`
        );
        const filler = generateBlock(thoughtDescriptions, isApprentice ? 5 : 20);
        return [confrontation, filler, v("It was scary.", "It was a moment of truth.", "The crucible of combat beckoned.")].join(" ");
    };

    const generateChapter5 = () => { // The Victory
        const action = v(
            `The hero used ${victoryType}! It worked!`,
            `The ${heroType} decided to use ${victoryType}! Brilliant!`,
            `With a strategem of genius, they unleashed ${victoryType}!`
        );
        return [action, v("They won!", "The threat was gone.", "The adversary was vanquished.")].join(" ");
    };

    const generateChapter6 = () => { // Resolution
        const resolve = v(
            `Everyone was happy. The end.`,
            `Peace returned to ${worldType}. ${endingType}`,
            `Harmony was restored to the ${worldType}. ${endingType}`
        );
        const moral = rand([
            v("Be brave!", "Courage is key.", "Valor is the shield of the just."),
            v("Be nice.", "Kindness matters.", "Benevolence creates its own reward.")
        ]);
        return [resolve, `MORAL: ${moral}`].join(" ");
    };

    // ---------------------------------------------------------
    // 🚀 ASSEMBLY
    // ---------------------------------------------------------
    if (isApprentice) {
        return [generateChapter1(), generateChapter3(), generateChapter5()];
    } else if (isLegend) {
        // Detailed 6 chapters
        return [
            generateChapter1(), generateChapter2(), generateChapter3(),
            generateChapter4(), generateChapter5(), generateChapter6()
        ];
    } else {
        // Explorer (Standard 5 chapters)
        return [
            generateChapter1(), generateChapter2(), generateChapter3(),
            generateChapter5(), generateChapter6()
        ];
    }
};

// ==========================================
// 🧠 COMPREHENSION GENERATOR
// ==========================================

export const generateComprehension = (choices, adventureMode) => {
    const isApprentice = adventureMode === 'apprentice';
    const isLegend = adventureMode === 'legend';

    const prettify = (str) => {
        if (!str) return '';
        return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };
    const getVal = (key) => typeof choices[key] === 'string' ? choices[key] : (choices[key]?.label || '');

    const hero = prettify(getVal('hero'));
    const world = prettify(getVal('world'));
    const victory = prettify(getVal('victory'));

    // BASIC QUESTIONS (For Everyone)
    const q1 = { id: 1, type: 'mcq', question: `Who is the hero?`, options: [hero, 'A Frog', 'A Rock'].sort(() => Math.random() - 0.5), correctAnswer: hero };
    const q2 = { id: 2, type: 'mcq', question: `Where is the story?`, options: [world, 'Mars', 'A Box'].sort(() => Math.random() - 0.5), correctAnswer: world };
    const q3 = { id: 3, type: 'fill-blank', question: `The hero used ________ to win.`, options: [victory, 'Cheese', 'Sleep'], correctAnswer: victory };

    if (isApprentice) {
        return [q1, q2, q3];
    }

    // ADVANCED QUESTIONS
    const q4 = { id: 4, type: 'synonym', question: `Synonym for "Brave"?`, options: ['Courageous', 'Scared', 'Weak'], correctAnswer: 'Courageous' };
    const q5 = { id: 5, type: 'punctuation', question: `Correct sentence?`, options: [`${hero} won!`, `${hero} won`], correctAnswer: `${hero} won!` };

    if (isLegend) {
        const q6 = { id: 6, type: 'open-ended', question: `What would you do as the hero?`, correctAnswer: 'Any answer' };
        return [q1, q2, q3, q4, q5, q6];
    }

    // Explorer gets 5
    return [q1, q2, q3, q4, q5];
};
