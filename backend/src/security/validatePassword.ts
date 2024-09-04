export default function validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
}

// validatePassword verifica se a senha atende aos seguintes critérios:

// Contém pelo menos uma letra maiúscula.
// Contém pelo menos um número.
// Contém pelo menos um caractere especial.
// Tem no mínimo 6 caracteres de comprimento.
