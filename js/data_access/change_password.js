//DOM elements
const changePasswordButton = document.getElementById('submit');
const currentPassword = document.getElementById('userCurrentPassword');
const newPassword = document.getElementById('userNewPassword');
const newPasswordConfirm = document.getElementById('userNewPasswordConfirm');
const inputs = document.querySelectorAll('form input');

//Function to update the user Password
const updateUserPassword = async (id, body) => {
  try {
    const response = await fetch(
      `http://localhost:8000/users/update-pass/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Function to check if the new password is valid
const validateNewPassword = () => {
  const newPasswordError = document.getElementById('userNewPasswordError');
  const regex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*).{8,40}$');
  const message =
    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.';

  if (!regex.test(newPassword.value)) {
    newPasswordError.innerHTML = message;
    newPasswordError.classList.add('formInputErrorActive');
  } else {
    newPasswordError.innerHTML = '';
    newPasswordError.classList.remove('formInputErrorActive');
  }
};

//Function to check if the new password and the confirmation are the same
const validateNewPasswordConfirm = () => {
  const userNewPasswordConfirmError = document.getElementById(
    'userNewPasswordConfirmError'
  );
  const message = 'Las contraseñas no coinciden';

  if (newPassword.value !== newPasswordConfirm.value) {
    userNewPasswordConfirmError.innerHTML = message;
    userNewPasswordConfirmError.classList.add('formInputErrorActive');
  } else {
    userNewPasswordConfirmError.innerHTML = '';
    userNewPasswordConfirmError.classList.remove('formInputErrorActive');
  }
};

//Event listeners
newPassword.addEventListener('blur', () => {
  validateNewPassword();
  validateNewPasswordConfirm();
});

newPassword.addEventListener('keyup', () => {
  validateNewPassword();
  validateNewPasswordConfirm();
});

newPassword.addEventListener('click', () => {
  validateNewPassword();
  validateNewPasswordConfirm();
});

newPasswordConfirm.addEventListener('blur', validateNewPasswordConfirm);
newPasswordConfirm.addEventListener('keyup', validateNewPasswordConfirm);
newPasswordConfirm.addEventListener('click', validateNewPasswordConfirm);

changePasswordButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    validateNewPassword();
    validateNewPasswordConfirm();
    const userId = sessionUserData.id;

    const userPasswords = {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    };

    const updateUserPassResponse = await updateUserPassword(
      userId,
      userPasswords
    );

    if (updateUserPassResponse.hasOwnProperty('status')) {
      errorAlert(updateUserPassResponse.status);
    } else {
      successAlert('Éxito', 'Contraseña actualizada.');
    }
  } catch (error) {
    console.log(error);
  }
});
