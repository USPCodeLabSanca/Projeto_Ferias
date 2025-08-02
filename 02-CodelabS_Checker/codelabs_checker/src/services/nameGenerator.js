const { rightNameChecker } = require("./nameChecker");

const nameGenerator = () => {

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const getRandomElement = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const strategies = [
        
        () => {
            let base = 'codelab';
            const insertions = getRandomNumber(1, 3);
            for (let i = 0; i < insertions; i++) {
                const position = getRandomNumber(1, base.length - 1);
                const randomLetter = getRandomElement(letters);
                base = base.slice(0, position) + randomLetter + base.slice(position);
            }
            return base;
        },
        
        
        () => {
            let base = 'codelab';
            const start = getRandomNumber(0, base.length - 2);
            const end = getRandomNumber(start + 1, base.length);
            const part = base.slice(start, end);
            const reversed = part.split('').reverse().join('');
            return base.slice(0, start) + reversed + base.slice(end);
        },
        
        () => {
            let base = 'codelab';
            const duplications = getRandomNumber(1, 2);
            for (let i = 0; i < duplications; i++) {
                const position = getRandomNumber(0, base.length - 1);
                const letter = base[position];
                base = base.slice(0, position) + letter + letter + base.slice(position + 1);
            }
            return base;
        },
    ];

    const selectedStrategy = getRandomElement(strategies);
    let name = null;
    let isValid = false;
    do {
        name = selectedStrategy();
        isValid = rightNameChecker(name).isValid;
        console.log(name, isValid);
    } while (isValid);

    return {
        name,
    };
};

module.exports = nameGenerator;