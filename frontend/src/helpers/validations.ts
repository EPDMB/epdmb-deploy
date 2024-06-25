import { ILoginFormErrors, IRegisterFormErrors } from "@/types";

export async function registerValidations(
  values: any
): Promise<IRegisterFormErrors> {
  const errors: IRegisterFormErrors = {};
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  try {
    // Name Validations
    if (!values.name) {
      errors.name = "Por favor escribe tu nombre";
    } else if (!regexName.test(values.name)) {
      errors.name = "El nombre solo puede tener letras y espacios";
    }
    // Lastname Validations
    if (!values.lastname) {
      errors.lastname = "Por favor escribe tu apellido";
    } else if (!regexName.test(values.lastname)) {
      errors.lastname = "El apellido solo puede tener letras y espacios";
    }

    // Email Validations
    if (!values.email) {
      errors.email = "Por favor escribe tu email";
    } else if (!regexEmail.test(values.email)) {
      errors.email =
        "El email solo puede contener letras, números, puntos y guiones";
    }

    // Address Validations
    if (!values.address) {
      errors.address = "Por favor ingresa tu dirección";
    }

    // Phone Validations
    if (!values.phone) {
      errors.phone = "Por favor ingresa tu teléfono";
    }
    // else if (isNaN(Number(values.phone))) {
    //   errors.phone = "The phone can only contain numbers";
    // }

    // DNI Validations
    if (!values.dni) {
      errors.dni = "Por favor ingresa tu dni";
    } else if (isNaN(Number(values.dni))) {
      errors.dni = "El DNI solo pueden ser números";
    }

    // Password Validations
    if (!values.password) {
      errors.password = "Por favor ingresa tu contraseña";
    } else if (values.password.length < 5) {
      errors.password = "La contraseña no puede ser menor a 5 caracteres";
    }

    //Password Repeat Validations
    if (!values.passwordRepeat) {
      errors.passwordRepeat = "Por favor ingresa la contraseña otra vez";
    } else if (values.passwordRepeat !== values.password) {
      errors.passwordRepeat = "Las contraseñas deben ser iguales";
    }

    return errors;
  } catch (error: any) {
    console.error(error.message);
    return errors;
  }
}

export const loginValidations = async (values: any) => {
  try {
    const errors: ILoginFormErrors = {};
    if (!values.email) {
      errors.email = "Por favor ingresa el email";
    }
    if (!values.password) {
      errors.password = "Por favor ingresa la contraseña";
    }

    return errors;
  } catch (error: any) {
    console.error(error.message);
  }
};
