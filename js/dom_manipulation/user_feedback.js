const errorAlert = function (message) {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
};

const successAlert = function (alertTitle, message) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: 'success',
    confirmButtonText: 'Aceptar',
  });
};

const infoAlert = function (alertTitle, message) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: 'info',
    confirmButtonText: 'Aceptar',
  });
};

const confirmationAlert = function (
  alertTitle,
  acceptedTitle,
  acceptedMessage,
  redirectURL,
  fuctionToExecute
) {
  Swal.fire({
    title: alertTitle,
    text: 'Esta acción no se puede deshacer. ¿Desea continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#687448',
    cancelButtonColor: '#974724',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'No, cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fuctionToExecute();
      Swal.fire(acceptedTitle, acceptedMessage, 'success').then(() => {
        window.location.href = redirectURL;
      });
    }
  });
};

/* //Function to update the user Password
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
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const changePasswordMyProfile = async function (changePass) {
  const { value: formValues } = await Swal.fire({
    title: 'Cambio de contraseña',
    html: '<div class="swalInputAlert"><label for="swal-input1">Contraseña actual:</label><input id="swal-input1" class="swal2-input" type="password"><label for="swal-input2">Contraseña nueva:</label><input id="swal-input2" class="swal2-input" type="password"></div>',
    focusConfirm: false,
    confirmButtonText: 'Cambiar contraseña',
    preConfirm: () => {
      const currentPassword = document.getElementById('swal-input1').value;
      const newPassword = document.getElementById('swal-input2').value;

      const userPasswords = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      return userPasswords;
    },
    inputValidator: (formValues) => {
      return new Promise((resolve) => {
        // 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character minimun)
        const regex = new RegExp(
          '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*).{8,40}$'
        );
        if (regex.test(formValues.newPassword)) {
          resolve();
        } else {
          resolve(
            'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.'
          );
        }
      });
    },
  });
}; */

/*   const userPass = JSON.stringify(formValues);
  const userPassChange = updateUserPassword(sessionUserData.id, userPass);

  console.log(formValues);
  if (formValues) {
    Swal.fire({ title: JSON.stringify(formValues) });
  }
}; */

/* inputValidator: (value) => {
  return new Promise((resolve) => {
    // 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character minimun)
    const regex = new RegExp(
      '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*).{8,40}$'
    );
    if (regex.test(value)) {
      resolve();
    } else {
      resolve(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.'
      );
    }
  });
},

.then(async (result) => {
  if (result.isConfirmed) {
    const currentUserId = sessionUserData.id;
    const changePass = result.value;

    const body = {
      password: changePass,
    };

    await updateUserInformation(currentUserId, body);

    Swal.fire('Éxito', 'Contraseña modificada con éxito.', 'success');
  } */
