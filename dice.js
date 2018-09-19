// Dice lists gotten from http://www.bananagrammer.com/2013/10/the-boggle-cube-redesign-and-its-effect.html
boggleClassic = [
    'A A C I O T',
    'A B I L T Y',	
    'A B J M O Qu',	
    'A C D E M P',	
    'A C E L R S',	
    'A D E N V Z',	
    'A H M O R S',	
    'B I F O R X',	
    'D E N O S W',	
    'D K N O T U',	
    'E E F H I Y',	
    'E G K L U Y',
    'E G I N T V',	
    'E H I N P S',	
    'E L P S T U',	
    'G I L R U W'	
]

boggle2013 = [
    'A A E E G N',
    'A B B J O O',
    'A C H O P S',
    'A F F K P S',
    'A O O T T W',
    'C I M O T U',
    'D E I L R X',
    'D E L R V Y',
    'D I S T T Y',
    'E E G H N W',
    'E E I N S U',
    'E H R T V W',
    'E I O S S T',
    'E L R T T Y',
    'H I M N U Qu',
    'H L N N R Z'
];

// Non-cryptographic random number generator that can be seeded
// (https://stackoverflow.com/a/19303725)
function RNG(seed){
    var s = seed;

    this.next = function(range){
        var x = Math.sin(s++) * 10000;
        x = x - Math.floor(x);

        if(!range) return x;

        return Math.floor(x*range)
    }

    this.seed = seed;
}

function getLetterList(seed){
    // Make a random number generator, potentially with given seed
    let rng = new RNG(seed || Math.floor(Math.random() * 10000));

    // Decide if classic or 2013 redesign dice
    let diceSet;
    if(rng.next(2))
        diceSet = boggleClassic;
    else
        diceSet = boggle2013;

    let dice = [];
    // Pick dice order (indexes)
    while(dice.length < 16){
        let nextDie = rng.next(diceSet.length);

        if(dice.includes(nextDie))
            continue;

        dice.push(nextDie);
    }

    // Transform indexes into values
    dice = dice.map(index=>diceSet[index]);

    // For each die, pick a side
    dice = dice.map(dieValues=>{
        let letters = dieValues.split(' ');
        let selectedIndex = rng.next(letters.length);
        return letters[selectedIndex];
    })

    // Secretly save seed in case we need it
    dice._seed = rng.seed;

    return dice;
}