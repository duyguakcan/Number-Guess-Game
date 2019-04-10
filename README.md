# Number-Guess-Game
Against computer AI number guess game. Also known as "Mastermind" but with numbers.

## There are 2 parts of the game:

1- Computer guesses the number in your mind

2- You guess the number in computer's mind (or cpu)

## Rules:

1- The number in mind should be 4 digit and each digit should be different than the others.

2- When a person guesses number the rival says how many positive and how many negative the guess has

  a- Positive number means there are that much digits are placed at right place
  
  b- Negative number means there are that much digits exist but the placement is wrong.
  
  ###### Example: 
  
  Number in mind => 1234
  
  Guess => 1240
  
  Result => +2 (because 2 digits at right place), -1 (because 1 digit which is '4' exists but at wrong place)
  
3- If a person guesses right, then it is win condition.

## Might be interesting for you:

1- When computer is guessing, it uses genetic algorithm to create new guess. It takes around 30-40 guesses

## References:
https://www.geeksforgeeks.org/genetic-algorithms/
https://pdfs.semanticscholar.org/0a9e/a477abb8e3c286b77cef2b68da582d720e20.pdf
http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.496.276&rep=rep1&type=pdf
