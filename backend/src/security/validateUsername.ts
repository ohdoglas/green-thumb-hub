
export default function isValidUsername(username: string) {
    const regex = /^[a-zA-Z0-9._-]{3,20}$/;
    return regex.test(username);
}

// Exemplos de uso:
console.log(isValidUsername("user123"));  // true
console.log(isValidUsername("user 123")); // false
console.log(isValidUsername("us"));       // false (muito curto)
console.log(isValidUsername("user-name")); // true (se permitido)

