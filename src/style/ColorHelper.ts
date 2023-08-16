export const generateRandomHexColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    const randomNumberStr = randomNumber.toString(16);
    const randColor = randomNumberStr.padStart(6, '0');   
    return `#${randColor.toUpperCase()}`
}