import * as readline from 'readline';

// Create an interface for reading lines from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for their name
const askName = (): Promise<string> => {
    return new Promise((resolve) => {
        rl.question('What is your name? ', (name: string) => {
            resolve(name);
        });
    });
};

// Function to prompt user for their age
const askAge = (): Promise<number> => {
    return new Promise((resolve) => {
        rl.question('How old are you? ', (age: string) => {
            resolve(parseInt(age));
        });
    });
};

// Main logic of the app
const startApp = async () => {
    try {
        const name = await askName();  // Get user's name
        const age = await askAge();    // Get user's age

        console.log(`Hello, ${name}! You are ${age} years old.`);

        // Calculate age in 10 years
        const ageIn10Years = age + 10;
        console.log(`In 10 years, you will be ${ageIn10Years} years old.`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the readline interface when done
        rl.close();
    }
};

// Start the app
startApp();
