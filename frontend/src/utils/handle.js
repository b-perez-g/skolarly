/**
 * Invierte un valor booleano
 */
export const toggleVisibility = (value) => {
    return !value;
};

/**
 * Maneja longitud y caracteres del rut
 */
export const handleRut = (e) => {
    let inputValue = e.target.value;
    //eliminar caracteres no numéricos
    inputValue = inputValue.replace(/\D/g, '');
    // Limitar la longitud del rut
    if (inputValue.length > 9) {
      inputValue = inputValue.slice(0, 9);
    }
    // guion antes del último número
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(0, -1) + '-' + inputValue.slice(-1);
    }
    return inputValue;
  };

/**
 * Maneja longitud y caracteres de la contraseña de ingreso
 */
  export const handleInputPassword = (e) => {
    const newValue = e.target.value;
    if (/^[A-Za-z0-9ñÑ]+$/.test(newValue) || newValue === "") {
        if (newValue.length >= 0 && newValue.length <= 12)
            return newValue;
    }
    return null;
  };