const rules = [
    {
        id: '01',
        title: 'choose a category',
        description: 'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.'
    },
    {
        id: '02',
        title: 'guess letters',
        description: "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses."
    },
    {
        id: '03',
        title: 'win or lose',
        description: 'You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.'
    }
];

export default rules;