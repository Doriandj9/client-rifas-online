const NUMBER_REG_EXPRE = /(^09[0-9]{8})\b/;
const EMAIL_REG_EXPRE = /([\w]+)@([a-z]+)\.([a-z])/;
const CEDULA_REG_EXPRE = /\b(?<province>^[01][1-9]|[2][0-4]|30|10|20)(?<tercer>[0-6])(?<number>[0-9]{7})\b/;
const DIGIT_REG_EXPRE = /[0-9]/;
const CHARACTERS_LETTERS_SPECIALS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?a-zA-ZÁ-Úá-ú´]/;
const CHARACTERS_NUMBERS_SPECIALS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;

export {NUMBER_REG_EXPRE, EMAIL_REG_EXPRE,CEDULA_REG_EXPRE,DIGIT_REG_EXPRE,CHARACTERS_LETTERS_SPECIALS,CHARACTERS_NUMBERS_SPECIALS};