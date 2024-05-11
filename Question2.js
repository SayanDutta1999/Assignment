/*
    Given a string S, write a program in javascript to shift each alphabet to the next
    alphabet and every third alphabet should shift to next 2nd alphabet. The alphabets
    should maintain case.
    
    Example: Given S = “Boy”, the result should be “Cpa” (If any alphabet hits z, it should
    go with circular pattern and start with a).
    
    Given S = “The Brown Fox”, the result should be “Uig Csqxo Gpz” (Note: every third
    alphabet should not count space and should reset count on each new word)

*/

// Answer

const shiftHelper = function(index, count, charArray){

    // Each letter of the string is stored as 0 based indexing.
    
    /*
        When count is 0 ,it is the starting of a new word.
    */ 
    if(count === 0){

        // First letter of a each new word staring with a capital letter.
        // If the first is Z which is the last letter in English Alphabet.
        // so, after shifting Z to next alphabet it has to be letter A.

        if(charArray[index] === 'Z'){

            // find the position of the first letter of current index by subtracting ASCII value from
            // the current letter to  ASCII value of capital A.
            let position = charArray[index].charCodeAt() - 'A'.charCodeAt(); // 25

            // Add 1 with the position of current letter to shift the next of it.
            // and % 26 for 0 based index position.
            let nextAlphabet = (position + 1) % 26;  // (25 + 1) % 26 = 26 % 26 = 0

            // Replace the current letter with the next letter of it
            // // 0 + 65 = 65 is the ASCII value of capital A
            charArray[index] = String.fromCharCode(nextAlphabet + 'A'.charCodeAt());
            // increase count for maintain the 3 letter to shift it's next 2nd letter. 
            count++;
        }else{
            // below code do the same as the if statement does, but else execute when the 1st 
            // letter is not Z.
            let position = charArray[index].charCodeAt() - 'A'.charCodeAt();
            let nextAlphabet = (position + 1) % 26;
            charArray[index] = String.fromCharCode(nextAlphabet + 'A'.charCodeAt());
            count++;
        }
    }
        // When the count is 2 which is the 3rd letter of the current word,
        // every 3rd alphabet should shift to next 2nd alphabet.
    else if(count === 2){
            // If the letter is small 'z' and it is also the 3rd alphabet.
            // so, it should shift to next 2nd alphabet.
            if(charArray[index] === 'z'){
                let position = charArray[index].charCodeAt() - 'a'.charCodeAt(); // 25
                let nextAlphabet = (position + 2) % 26; // (25 + 2) % 26 = 27 % 26 = 1
                // 1 + 65 = 66 is B in ASCII code
                charArray[index] = String.fromCharCode(nextAlphabet + 'a'.charCodeAt()); 
                count++;
            }else{
                // below code do the same as the if statement does, but else execute when 
                // the 3rd letter is not z.
                let position = charArray[index].charCodeAt() - 'a'.charCodeAt();
                let nextAlphabet = (position + 2) % 26;
                charArray[index] = String.fromCharCode(nextAlphabet + 'a'.charCodeAt());
                count++;
            }  
    }else{
        // For remaining letter this part of code does the same as above code block.
        let position = charArray[index].charCodeAt() - 'a'.charCodeAt();
        let nextAlphabet = (position + 1) % 26;
        charArray[index] = String.fromCharCode(nextAlphabet + 'a'.charCodeAt());
        count++;
    }
}

// shiftLetters function return the same string after shifting all the alphabets to 
// it's specific position
const shiftLetters = (str)=>{
    // Convert the input string into a character array using split function
    // to store each character at each index.
    const charArray = str.split('');
    let result = "";
    let count1 = 0;
    /*  
        Checking whether the input string contains any blank space or not
        if it doesn't contain any blank space then the string contain a single word
        and executes the if statement.
    */
    if(str.search(' ') < 0){
        for(let i = 0; i < charArray.length; i++){
            // shiftHelper function handle the shifting mechanism
            shiftHelper(i, count1++, charArray);
        }
        // store the shifted string into resulting string variable.
        // join function join each character of character array with string literal and
        // return the string.
        result += charArray.join("");
    }else{
        // When string contains space,  which states that the string 
        // contains more than one words. To store each word with all spaces 
        // words array is declared.
        let words = [];
        let subString = ""; // To store each words and spaces at a time.
        let count2 = 0; // handle the 3rd letter of each words.
       
        // Traversing the character array to extract each words and spaces 
        // and store it into words array.
        for(let i = 0; i < charArray.length; i++){
            // If the character is not a blank space, add it to the subString
            if(charArray[i] != ' '){
                subString = subString.concat(charArray[i]);
            }else{
                // if the character is a blank space 
                // Checking if subString length is greater than 0 , 
                // then if already store a word.
                if(subString.length > 0){
                    words.push(subString); // push 1st word into words array

                    // reinitialize the subString with blank string or space again
                    subString = ""; 
                }
                // push the blank string or space into words array.
                words.push(subString); 
            }
        }
        
        // Push the last word into words array.
        words.push(subString);
        
        // Traversing the words array 
        for(let j = 0; j < words.length; j++){
            // Split the 1st word into character array
            let word = words[j].split('');
            // if it is not a blank space
            if(word.length > 0){
                // Traversing each word from the words array
                for(let k = 0; k < word.length; k++){
                     // shiftHelper function handle the shifting mechanism
                    shiftHelper(k, count2++, word);
                }
                // After shifting all the character of the input string
                // Concatenate the shifted string with result string variable 
                // by covert the word into string using join method.
                result += word.join("");
            }else{
                // Concatenate blank space after each letter being shifted to 
                // it's specific position
                result += " ";
                // set count to 0 when it is a blank space
                count2 = 0;   
            }   
        }
    }
    
    // return the result string
    return result;
}

// Input Strings
console.log(shiftLetters("Boy")); 
console.log(shiftLetters("The Brown Fox"));
