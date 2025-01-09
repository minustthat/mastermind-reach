const buildURL = (difficulty: string) => {
    let num;
    let max;
    switch (difficulty) {
        case 'easy':
            num = 4;
            max = 7
            break;
        case 'medium':
            num = 6
            max = 8
            break;
        case 'hard':
            num = 8
            max = 9;
            break;
    }
    return `https://www.random.org/integers?num=${num}&min=0&max=${max}&col=1&base=10&format=plain`
    // I don't think additional error handling will be needed here, as there will be buttons linked to the difficulty level and I can force string inputs there.
}
export const generateNumbers = async (difficulty: string): Promise<string | undefined> => {
    const url = buildURL(difficulty);
    try {
        let res = await fetch(url)
        return await res.text()
    } catch (err: unknown) {
        console.log(`Error: ${err}`)
    }
}
// num is the only differentiating factor, so just make it a variable according to the difficulty.