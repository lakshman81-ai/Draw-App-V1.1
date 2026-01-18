
// ==========================================
// 📜 EPIC STORY GENERATOR
// Version 3.0 - Extended Stories (250-350 words)
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

    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ---------------------------------------------------------
    // 📚 EXPANDED DESCRIPTIONS (for 250-350 word stories)
    // ---------------------------------------------------------

    const settingDescriptions = [
        v("The sun was bright and warm.", "The sun hung low in the sky, casting long golden shadows across the land.", "The celestial orb descended gracefully, painting the ancient earth with amber hues."),
        v("Birds sang sweet songs.", "Birds sang melodies that echoed through the air.", "Avian choirs performed symphonies that resonated through the ethereal atmosphere."),
        v("Flowers bloomed everywhere.", "Colorful flowers dotted the landscape with beauty.", "Resplendent blossoms adorned the terrain like precious jewels scattered by nature."),
        v("The wind felt nice.", "A gentle breeze carried the scent of adventure.", "A zephyr whispered ancient secrets from distant realms."),
        v("Trees stood tall.", "Mighty trees reached toward the heavens.", "Colossal arbors stretched their limbs skyward in silent reverence."),
        v("The sky was blue.", "The sky stretched endlessly in brilliant blue.", "The firmament unfurled in an infinite expanse of cerulean majesty."),
        v("Rivers flowed gently.", "Crystal rivers wound through the valleys.", "Pristine waterways meandered through verdant vales like silver ribbons."),
        v("Mountains looked big.", "Mountains rose majestically in the distance.", "Towering peaks pierced the clouds with their snow-capped summits."),
        v("It was peaceful.", "Peace and tranquility filled the air.", "An atmosphere of serene harmony pervaded every corner of the realm."),
        v("Everything was pretty.", "Beauty surrounded every corner of this world.", "Breathtaking splendor graced every vista and hidden alcove.")
    ];

    const journeyDescriptions = [
        v("They walked for a long time.", "The journey was long and filled with discoveries.", "The odyssey stretched across countless horizons, each step revealing new wonders."),
        v("They saw many things.", "Along the way, they encountered amazing sights.", "Their passage unveiled marvels that defied imagination and inspired awe."),
        v("They crossed a bridge.", "They crossed an ancient stone bridge.", "They traversed a weathered span of carved stone, worn by centuries of travelers."),
        v("They climbed a hill.", "They climbed a steep hill that tested their strength.", "They ascended a formidable escarpment that challenged their resolve and endurance."),
        v("They rested under a tree.", "They paused to rest beneath a great oak tree.", "They sought respite beneath the protective canopy of an ancient sentinel tree."),
        v("They found a path.", "A hidden path revealed itself through the woods.", "A concealed trail materialized through the dense undergrowth, beckoning them forward."),
        v("They kept going.", "Despite the challenges, they pressed forward.", "In spite of the adversities, their determination propelled them ever onward."),
        v("They felt tired but strong.", "Exhaustion was present, but their spirit remained unbroken.", "Fatigue weighed upon them, yet their indomitable spirit burned ever brighter."),
        v("They helped each other.", "They supported one another through every difficulty.", "They bolstered each other's courage through every tribulation and trial."),
        v("They never gave up.", "Giving up was never an option for them.", "Surrender was a concept utterly foreign to their valiant hearts.")
    ];

    const emotionDescriptions = [
        v("The hero felt brave.", "Courage swelled within the hero's heart.", "Valor surged through every fiber of the hero's being."),
        v("They were a bit scared.", "Fear was present, but bravery conquered it.", "Trepidation lurked in the shadows, but was vanquished by unwavering courage."),
        v("They thought about home.", "Thoughts of home gave them strength.", "Cherished memories of their homeland fortified their weary spirit."),
        v("They missed their friends.", "They longed for the company of friends.", "They yearned for the camaraderie of beloved companions left behind."),
        v("They felt hopeful.", "Hope shone brightly in their eyes.", "Radiant hope illuminated their countenance like a beacon."),
        v("They believed in themselves.", "Self-belief was their greatest weapon.", "Unwavering faith in their own abilities was their mightiest armament."),
        v("They were determined.", "Determination filled every step they took.", "Resolute determination infused their every action with purpose."),
        v("They dreamed of winning.", "Victory was their constant dream.", "Triumph was the vision that sustained them through darkness."),
        v("They planned carefully.", "Every move was planned with care.", "Each stratagem was meticulously crafted with precision."),
        v("They stayed focused.", "Focus guided them through challenges.", "Unwavering concentration steered them through perilous moments.")
    ];

    const actionDescriptions = [
        v("They jumped over rocks.", "Leaping over obstacles, they showed amazing skill.", "With acrobatic prowess, they vaulted over impediments with breathtaking grace."),
        v("They ran very fast.", "Speed was their ally as they raced forward.", "Velocity became their companion as they surged forward with incredible swiftness."),
        v("They dodged danger.", "Quick reflexes helped them avoid danger.", "Lightning-fast reflexes enabled them to evade peril with practiced ease."),
        v("They solved a puzzle.", "A tricky puzzle was solved with cleverness.", "An intricate conundrum was unraveled through ingenious reasoning."),
        v("They found a clue.", "An important clue was discovered.", "A crucial revelation was unearthed that illuminated their path."),
        v("They made a new friend.", "Unexpected friendship was formed along the way.", "An unforeseen alliance blossomed, strengthening their cause."),
        v("They learned something new.", "Valuable lessons were learned on the journey.", "Profound wisdom was acquired through the crucible of experience."),
        v("They discovered a secret.", "A hidden secret was revealed to them.", "An ancient mystery was unveiled before their astonished eyes."),
        v("They showed great courage.", "Courage was displayed in the face of fear.", "Exemplary bravery was exhibited when confronting overwhelming odds."),
        v("They worked together.", "Teamwork made them stronger.", "Collaborative effort amplified their collective strength exponentially.")
    ];

    // Generate a descriptive paragraph
    const generateParagraph = (arrays, sentenceCount) => {
        const sentences = [];
        const allArrays = [...arrays];
        for (let i = 0; i < sentenceCount; i++) {
            const arr = allArrays[i % allArrays.length];
            sentences.push(rand(arr));
        }
        return sentences.join(' ');
    };

    // ---------------------------------------------------------
    // 📖 CHAPTERS (Enhanced for 250-350 words total)
    // ---------------------------------------------------------

    const generateChapter1 = () => {
        const intro = v(
            `Once upon a time, in a place called ${worldType}, there lived a special hero.`,
            `Long ago, in the magnificent realm of ${worldType}, an extraordinary tale began to unfold.`,
            `In the storied annals of ${worldType}, where legends are born and prophecies whisper through the ages, destiny awakened.`
        );
        const heroDesc = v(
            `This hero was a ${heroType}. The ${heroType} was very brave and kind to everyone they met.`,
            `Here dwelt a remarkable ${heroType}, renowned throughout the land for their incredible courage and boundless compassion.`,
            `Within these hallowed grounds resided a ${heroType} of peerless renown, a paragon whose valor and benevolence were spoken of in reverent tones.`
        );
        const setting = generateParagraph([settingDescriptions, emotionDescriptions], isApprentice ? 4 : isLegend ? 8 : 6);
        const closer = v(
            "Each day brought new adventures and wonderful surprises. The hero was ready for anything!",
            "Days were filled with wonder and discovery, each sunrise promising new possibilities. Something momentous was stirring.",
            "The tapestry of daily existence was woven with threads of wonder and anticipation. The cosmos itself seemed to tremble with portent."
        );
        return [intro, heroDesc, setting, closer].join(' ');
    };

    const generateChapter2 = () => {
        const event = v(
            `But one day, something unexpected happened! ${troubleType} began causing problems for everyone.`,
            `However, tranquility was shattered when ominous signs of ${troubleType} emerged, casting shadows over the peaceful land.`,
            `Yet fate, that capricious weaver of destinies, had other designs. The dire specter of ${troubleType} manifested, threatening all that was cherished.`
        );
        const details = generateParagraph([settingDescriptions, emotionDescriptions], isApprentice ? 3 : isLegend ? 7 : 5);
        const realization = v(
            "People were worried and scared. Someone needed to help! The hero knew what must be done.",
            "Anxiety spread like wildfire through the populace. The need for a champion was urgent, and the hero understood their calling.",
            "Consternation gripped the inhabitants of the realm. The clarion call for a savior resonated, and the hero acknowledged their sacred duty."
        );
        return [event, details, realization].join(' ');
    };

    const generateChapter3 = () => {
        const departure = v(
            `So the brave ${heroType} set out on a big adventure. It was time to face ${troubleType}!`,
            `With determination burning in their heart, the ${heroType} embarked upon their perilous quest to confront ${troubleType}.`,
            `Girded with resolve and armed with purpose, the ${heroType} commenced their epic pilgrimage to vanquish ${troubleType}.`
        );
        const journey = generateParagraph([journeyDescriptions, actionDescriptions, settingDescriptions], isApprentice ? 5 : isLegend ? 10 : 7);
        const preparation = v(
            "The journey was long but the hero kept going. They learned and grew stronger every day.",
            "The expedition tested their limits, yet with each challenge overcome, their strength and wisdom flourished.",
            "The odyssey extracted its toll, yet through tribulation came transformation; they emerged more formidable with each passing trial."
        );
        return [departure, journey, preparation].join(' ');
    };

    const generateChapter4 = () => {
        const confrontation = v(
            `Finally, the ${heroType} found ${troubleType}! It was scary but the hero stood tall.`,
            `At last, the ${heroType} stood before the manifestation of ${troubleType}. Despite the fear, they remained steadfast.`,
            `The moment of reckoning arrived as the ${heroType} beheld ${troubleType} in all its terrible majesty. Fear clawed at their heart, yet they stood resolute.`
        );
        const battle = generateParagraph([emotionDescriptions, actionDescriptions], isApprentice ? 4 : isLegend ? 8 : 6);
        const tension = v(
            "The hero took a deep breath. It was time to be brave and do what needed to be done!",
            "Drawing upon reserves of courage, the hero prepared for the ultimate confrontation. This was the moment of truth.",
            "Summoning the totality of their valor, the hero steeled themselves for the climactic encounter. Destiny hung in the balance."
        );
        return [confrontation, battle, tension].join(' ');
    };

    const generateChapter5 = () => {
        const action = v(
            `The ${heroType} used ${victoryType} and it worked perfectly! The problem was solved!`,
            `With brilliant strategy, the ${heroType} employed ${victoryType}, turning the tide of battle decisively in their favor!`,
            `With masterful cunning, the ${heroType} unleashed ${victoryType}, a stratagematic masterstroke that shattered the opposition!`
        );
        const victory = generateParagraph([emotionDescriptions, actionDescriptions], isApprentice ? 3 : isLegend ? 6 : 4);
        const celebration = v(
            "Everyone cheered! The hero had won! It was a wonderful day that nobody would ever forget.",
            "Jubilant celebrations erupted throughout the land. The hero had triumphed, and their victory would be remembered for generations.",
            "Exultant festivities resounded across the realm. The hero's magnificent triumph was destined to echo through eternity."
        );
        return [action, victory, celebration].join(' ');
    };

    const generateChapter6 = () => {
        const peace = v(
            `Peace returned to ${worldType}. Everyone was safe and happy again. ${endingType}`,
            `Harmony was restored to ${worldType}. The land flourished once more, and joy filled every heart. ${endingType}`,
            `Tranquility reclaimed its rightful dominion over ${worldType}. The realm prospered anew, and jubilation permeated every soul. ${endingType}`
        );
        const reflection = generateParagraph([emotionDescriptions, settingDescriptions], isApprentice ? 3 : isLegend ? 5 : 4);
        const moral = v(
            "The hero learned that being brave and kind always wins. And they all lived happily ever after. THE END.",
            "Through this adventure, a timeless truth was reaffirmed: courage paired with compassion creates true heroes. And so, peace reigned forevermore. THE END.",
            "This epic saga illuminated an eternal verity: valor tempered with benevolence forges authentic legends. Thus concluded a tale for the ages. THE END."
        );
        return [peace, reflection, moral].join(' ');
    };

    // ---------------------------------------------------------
    // 🚀 ASSEMBLY (Returns array of chapter paragraphs)
    // ---------------------------------------------------------
    if (isApprentice) {
        // 3 chapters, simpler language, ~250 words total
        return [generateChapter1(), generateChapter3(), generateChapter5()];
    } else if (isLegend) {
        // 6 detailed chapters, ~350 words total
        return [
            generateChapter1(), generateChapter2(), generateChapter3(),
            generateChapter4(), generateChapter5(), generateChapter6()
        ];
    } else {
        // Explorer: 5 chapters, ~300 words total
        return [
            generateChapter1(), generateChapter2(), generateChapter3(),
            generateChapter5(), generateChapter6()
        ];
    }
};

// ==========================================
// 🧠 COMPREHENSION GENERATOR (Mode-Based Difficulty)
// Apprentice: Easiest, with hints (Grade 3-4)
// Explorer: Medium, with some hints (Grade 3-4)
// Legend: Hardest, no hints (Grade 3-4)
// ==========================================

export const generateComprehension = (choices, adventureMode) => {
    const isApprentice = adventureMode === 'apprentice';
    const isExplorer = adventureMode === 'explorer';
    const isLegend = adventureMode === 'legend';

    const prettify = (str) => {
        if (!str) return '';
        return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };
    const getVal = (key) => typeof choices[key] === 'string' ? choices[key] : (choices[key]?.label || '');
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const hero = prettify(getVal('hero')) || 'The Hero';
    const world = prettify(getVal('world')) || 'The World';
    const trouble = prettify(getVal('trouble')) || 'The Problem';
    const victory = prettify(getVal('victory')) || 'Clever Strategy';
    const ending = prettify(getVal('ending')) || 'Happy Ending';

    // Wrong answer pools - More confusing for Legend mode
    const wrongHeroesEasy = ['A Frog', 'A Rock', 'A Cloud'];
    const wrongHeroesHard = ['A Dragon', 'A Robot', 'A Pirate', 'A Ghost', 'A Fish', 'A Knight', 'A Wizard'];

    const wrongPlacesEasy = ['Mars', 'A Box', 'Under the Sea'];
    const wrongPlacesHard = ['The Moon', 'A Cave', 'The Desert', 'The Arctic', 'A Volcano', 'The Forest'];

    const wrongProblemsEasy = ['Lost Homework', 'Broken Toy', 'No Internet'];
    const wrongProblemsHard = ['Missing Socks', 'Rainy Day', 'Flat Tire', 'Lost Map', 'Hungry Dragon', 'Dark Storm'];

    const wrongActionsEasy = ['By Sleeping', 'By Eating', 'By Running Away'];
    const wrongActionsHard = ['By Dancing', 'By Singing', 'By Magic', 'By Luck', 'By Accident', 'By Hiding'];

    // Select wrong answers based on mode
    const getWrong = (easyPool, hardPool, count = 3) => {
        const pool = isLegend ? [...easyPool, ...hardPool] : easyPool;
        return shuffle(pool).slice(0, count);
    };

    // Hint generator - only for Apprentice and Explorer
    const getHint = (answer, mode) => {
        if (isLegend) return null; // No hints for Legend
        const firstLetter = answer.charAt(0).toUpperCase();
        const length = answer.length;
        if (isApprentice) {
            // Full hint for Apprentice
            return `💡 Hint: Starts with "${firstLetter}" and has ${length} letters`;
        } else if (isExplorer) {
            // Partial hint for Explorer
            return `💡 Hint: Starts with "${firstLetter}"`;
        }
        return null;
    };

    // QUESTION POOLS with difficulty markers
    // Apprentice: Simple questions, full hints
    // Explorer: Medium questions, partial hints
    // Legend: Tricky questions, no hints, more distractors

    const mcqQuestionPool = [
        // EASY - Memory (Apprentice friendly)
        { q: `Who is the main hero of this story?`, correct: hero, wrongEasy: wrongHeroesEasy, wrongHard: wrongHeroesHard, cat: 'Memory', diff: 'easy' },
        { q: `Where does this story take place?`, correct: world, wrongEasy: wrongPlacesEasy, wrongHard: wrongPlacesHard, cat: 'Memory', diff: 'easy' },
        { q: `What problem did the hero face?`, correct: trouble, wrongEasy: wrongProblemsEasy, wrongHard: wrongProblemsHard, cat: 'Memory', diff: 'easy' },
        { q: `How did the hero win?`, correct: victory, wrongEasy: wrongActionsEasy, wrongHard: wrongActionsHard, cat: 'Memory', diff: 'easy' },

        // MEDIUM - Understanding (Explorer level)
        { q: `Why did the hero go on a journey?`, correct: 'To solve the problem', wrongEasy: ['For vacation', 'To sleep'], wrongHard: ['For no reason', 'To eat food', 'To play games'], cat: 'Understanding', diff: 'medium' },
        { q: `What lesson does this story teach us?`, correct: 'Be brave and kind', wrongEasy: ['Stay home', 'Give up'], wrongHard: ['Be mean', 'Run away', 'Be lazy'], cat: 'Understanding', diff: 'medium' },
        { q: `How did the hero feel after winning?`, correct: 'Happy and proud', wrongEasy: ['Sad', 'Confused'], wrongHard: ['Tired and bored', 'Angry', 'Scared'], cat: 'Understanding', diff: 'medium' },

        // HARD - Critical Thinking (Legend level)
        { q: `What made the hero truly special?`, correct: 'Their courage', wrongEasy: ['Their hat'], wrongHard: ['Their shoes', 'Their bag', 'Nothing special', 'Their speed'], cat: 'Critical Thinking', diff: 'hard' },
        { q: `Why is this story meaningful?`, correct: 'It teaches good values', wrongEasy: ['For fun'], wrongHard: ['It is not important', 'No reason', 'Just because', 'Random'], cat: 'Critical Thinking', diff: 'hard' },
        { q: `What could have happened if hero gave up?`, correct: 'Problem would remain', wrongEasy: ['Nothing'], wrongHard: ['Hero would win anyway', 'Story would end', 'Everyone happy', 'No change'], cat: 'Critical Thinking', diff: 'hard' },

        // Vocabulary (varies by mode)
        { q: `What is another word for "brave"?`, correct: 'Courageous', wrongEasy: ['Scared', 'Weak'], wrongHard: ['Lazy', 'Shy', 'Tired', 'Slow'], cat: 'Vocabulary', diff: 'medium' },
        { q: `What is another word for "happy"?`, correct: 'Joyful', wrongEasy: ['Sad', 'Angry'], wrongHard: ['Tired', 'Bored', 'Upset', 'Nervous'], cat: 'Vocabulary', diff: 'medium' },
        { q: `"Victory" means:`, correct: 'Winning', wrongEasy: ['Losing'], wrongHard: ['Sleeping', 'Eating', 'Running', 'Hiding'], cat: 'Vocabulary', diff: 'medium' },
    ];

    const fillBlankPool = [
        { q: `The brave hero was a _________.`, correct: hero, cat: 'Recall', diff: 'easy' },
        { q: `The story happened in _________.`, correct: world, cat: 'Recall', diff: 'easy' },
        { q: `The hero used _________ to win.`, correct: victory, cat: 'Recall', diff: 'medium' },
        { q: `The trouble was _________.`, correct: trouble, cat: 'Recall', diff: 'medium' },
        { q: `At the end, there was _________.`, correct: ending, cat: 'Recall', diff: 'medium' },
        { q: `The problem was solved by _________.`, correct: victory, cat: 'Recall', diff: 'hard' },
        { q: `The adventure started in _________.`, correct: world, cat: 'Recall', diff: 'hard' },
    ];

    const descriptivePool = [
        { q: `What would YOU do if you were the hero?`, placeholder: 'If I were the hero, I would...', cat: 'Creative', diff: 'easy' },
        { q: `Describe the hero in your own words.`, placeholder: 'The hero is...', cat: 'Creative', diff: 'easy' },
        { q: `What was the most exciting part?`, placeholder: 'The most exciting part was...', cat: 'Creative', diff: 'medium' },
        { q: `How would you change the ending?`, placeholder: 'I would change the ending by...', cat: 'Creative', diff: 'medium' },
        { q: `What lesson did you learn from this story?`, placeholder: 'I learned that...', cat: 'Reflection', diff: 'hard' },
        { q: `Why is courage important in life?`, placeholder: 'Courage is important because...', cat: 'Reflection', diff: 'hard' },
    ];

    // Filter questions by difficulty based on mode
    const filterByDifficulty = (pool, mcqCount, fillCount, descCount) => {
        if (isApprentice) {
            // Apprentice: Mostly easy, some medium
            return {
                mcq: shuffle(pool.filter(q => q.diff === 'easy' || q.diff === 'medium')).slice(0, mcqCount),
                fill: shuffle(fillBlankPool.filter(q => q.diff === 'easy' || q.diff === 'medium')).slice(0, fillCount),
                desc: shuffle(descriptivePool.filter(q => q.diff === 'easy')).slice(0, descCount)
            };
        } else if (isExplorer) {
            // Explorer: Mix of easy, medium, some hard
            return {
                mcq: shuffle(pool.filter(q => q.diff !== 'impossible')).slice(0, mcqCount),
                fill: shuffle(fillBlankPool).slice(0, fillCount),
                desc: shuffle(descriptivePool.filter(q => q.diff !== 'hard')).slice(0, descCount)
            };
        } else {
            // Legend: All difficulties including hard
            return {
                mcq: shuffle(pool).slice(0, mcqCount),
                fill: shuffle(fillBlankPool).slice(0, fillCount),
                desc: shuffle(descriptivePool).slice(0, descCount)
            };
        }
    };

    // BUILD QUESTIONS
    const questions = [];
    let id = 1;

    // Mode-specific question counts
    const counts = isApprentice ? { mcq: 5, fill: 3, desc: 2 }
        : isExplorer ? { mcq: 6, fill: 4, desc: 2 }
            : { mcq: 7, fill: 5, desc: 3 }; // Legend gets all 15

    const selected = filterByDifficulty(mcqQuestionPool, counts.mcq, counts.fill, counts.desc);

    // MCQ Questions
    selected.mcq.forEach(mq => {
        const wrongAnswers = getWrong(mq.wrongEasy, mq.wrongHard, 3);
        const hint = getHint(mq.correct, adventureMode);
        questions.push({
            id: id++,
            type: 'mcq',
            category: mq.cat,
            difficulty: mq.diff,
            question: mq.q,
            options: shuffle([mq.correct, ...wrongAnswers]),
            correctAnswer: mq.correct,
            hint: hint,
            showHint: !isLegend // Show hints for Apprentice and Explorer
        });
    });

    // Fill-blank Questions
    selected.fill.forEach(fq => {
        const hint = getHint(fq.correct, adventureMode);
        questions.push({
            id: id++,
            type: 'fill-blank',
            category: fq.cat,
            difficulty: fq.diff,
            question: fq.q,
            correctAnswer: fq.correct,
            hint: hint,
            showHint: !isLegend
        });
    });

    // Descriptive Questions
    selected.desc.forEach(dq => {
        questions.push({
            id: id++,
            type: 'descriptive',
            category: dq.cat,
            difficulty: dq.diff,
            question: dq.q,
            placeholder: dq.placeholder,
            correctAnswer: 'Any thoughtful answer',
            hint: isApprentice ? '💡 Hint: Write at least 2 sentences!' : (isExplorer ? '💡 Write your thoughts!' : null),
            showHint: !isLegend
        });
    });

    // Shuffle and return
    return shuffle(questions).map((q, idx) => ({ ...q, id: idx + 1 }));
};

