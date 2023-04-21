//DOM variables
const registerUser = document.getElementById('submit');

//Normal functions
//Function to get the values of the form fields
const getFormFields = () => {
  const formData = new FormData(signupForm);
  const bodyContent = {};
  formData.forEach((value, key) => {
    bodyContent[key] = value;
  });
  return bodyContent;
};

//Async functions
// Function to register a new user
const registerNewUser = async (body) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log('user: ', response);
  } catch (error) {
    console.log(error);
  }
};

//Event listeners

<<<<<<< Updated upstream
registerUser.addEventListener('click', async (event) => {
  event.preventDefault();
  // Validates the fields of the form
  if (Object.values(validationFields.signupFormFields).every(Boolean)) {
    await registerNewUser(getFormFields());
    successAlert(
      'Registro exitoso',
      'Su solicitud para crear una cuenta ha sido enviada. En caso de ser aprobada le llegará una contraseña temporal al correo electónico registrado.'
    );
    form.reset();
    const imageDisplaySignup = document.getElementById('imageDisplay');
    imageDisplaySignup.src = '../images/profile_picture.png';
    Object.keys(validationFields.signupFormFields).forEach(
      (attribute) => (validationFields.signupFormFields[attribute] = false)
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
  }
=======
registerUser.addEventListener('click', async () => {
    // Validates the fields of the form
    
    if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        
        await registerNewUser(getFormFields(nextId));
        
        successAlert(
          'Registro exitoso',
          'Su solicitud para crear una cuenta ha sido enviada. En caso de ser aprobada le llegará una contraseña temporal al correo electónico registrado.'
        );
        form.reset();
        const imageDisplaySignup = document.getElementById('imageDisplay');
        imageDisplaySignup.src = '../images/profile_picture.png';
        Object.keys(validationFields[`${form.id}Fields`]).forEach(
          (attribute) =>
            (validationFields[`${form.id}Fields`][attribute] = false)
        );
      } else {
        
        errorAlert('Hay campos obligatorios sin llenar.');
      }

>>>>>>> Stashed changes
});
