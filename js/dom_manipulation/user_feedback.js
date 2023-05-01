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

const successAlertRedirect = function (alertTitle, message, url) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: 'success',
    confirmButtonText: 'Aceptar',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = url;
    }
  });
};

const forgotPasswordAlert = function () {
  Swal.fire({
    title: 'Recuperación de contraseña',
    text: 'Ingrese su correo electrónico para recuperar su contraseña.',
    input: 'email',
    inputPlaceholder: 'Correo electrónico',
    confirmButtonText: 'Enviar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#974724',
    preConfirm: async () => {
      const userEmail = Swal.getPopup().querySelector('input').value;
      const userExists = await checkUserExists({ email: userEmail });

      if (!userExists.status) {
        Swal.showValidationMessage(
          'El correo ingresado no se encuentra registrado.'
        );
      } else {
        return { email: userEmail };
      }
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const updatePassword = await forgotPasswordUpdate(result.value);

      if (updatePassword.status) {
        successAlert(
          'Recuperación de contraseña',
          'Se ha enviado un correo electrónico con las instrucciones para recuperar su contraseña.'
        );
      }
    }
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

const changePassword = (
  showCancelButton,
  allowEscapeKey,
  allowOutsideClick
) => {
  Swal.fire({
    title: 'Cambio de contraseña',
    html: '<div class="swalInputAlert"><label for="currentPassInput" class="swal2-label">Contraseña actual: *</label><input id="currentPassInput" class="swal2-input" type="password"><label for="newPassInput" class="swal2-label">Contraseña nueva: *</label><input id="newPassInput" class="swal2-input" type="password"><label for="newPassConfirmInput" class="swal2-label">Confirmar contraseña nueva: *</label><input id="newPassConfirmInput" class="swal2-input" type="password"></div>',
    focusConfirm: false,
    confirmButtonText: 'Cambiar contraseña',
    showCancelButton: showCancelButton,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#974724',
    allowOutsideClick: allowOutsideClick,
    allowEscapeKey: allowEscapeKey,
    preConfirm: async () => {
      const currentPass =
        Swal.getPopup().querySelector('#currentPassInput').value;
      const newPass = Swal.getPopup().querySelector('#newPassInput').value;
      const newPassConfirm = Swal.getPopup().querySelector(
        '#newPassConfirmInput'
      ).value;
      const regex = new RegExp(
        '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*).{8,40}$'
      );

      //Current password validation
      const currentPassCheck = await checkUserPassword(sessionUserData.id, {
        currentPassword: currentPass,
      });

      if (
        currentPassCheck.hasOwnProperty('status') &&
        !currentPassCheck.status
      ) {
        Swal.showValidationMessage('La contraseña actual es incorrecta.');
      } else if (
        currentPass === '' ||
        newPass === '' ||
        newPassConfirm === ''
      ) {
        Swal.showValidationMessage(`Todos los campos son obligatorios.`);
      } else if (!regex.test(newPass)) {
        Swal.showValidationMessage(
          `La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.`
        );
      } else if (newPass !== newPassConfirm) {
        Swal.showValidationMessage(`Las contraseñas no coinciden.`);
      }
      return { currentPassword: currentPass, newPassword: newPass };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const changePass = await changeUserPassword(
        sessionUserData.id,
        result.value
      );

      if (changePass.hasOwnProperty('status') && !changePass.status) {
        Swal.showValidationMessage('La contraseña actual es incorrecta.');
      } else {
        Swal.fire('Éxito', 'Contraseña modificada con éxito.', 'success');
      }
    }
  });
};
