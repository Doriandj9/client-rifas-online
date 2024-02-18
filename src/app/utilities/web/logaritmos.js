export const generatePassword = () => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

 let pass = 'Hayu';
 for(let i = 0; i <= 2; i++){
     const number = Math.round(Math.random() * 9);
     const numberLetter = Math.floor(Math.random() * letters.length);

     pass += String(number) + letters[numberLetter] ?? '&';
 }


 return pass;   

};
