//DOM elements
const signInEmailInput = document.getElementById('signinEmail');
const signInPasswordInput = document.getElementById('signinPassword');
const signInButton = document.getElementById('submit');

//Functions
//Function to fetch the user's email and password
const signIn = async () => {
  try {
    //Get the user's email and password
    const email = signInEmailInput.value;
    const password = signInPasswordInput.value;
    const data = { email, password };

    const response = await fetch('http://127.0.0.1:8000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const sessionUserData = await response.json();

    return sessionUserData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Function to submit the user's email and password
const signInSubmit = async () => {
  if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
    const sessionUserData = await signIn();
    if (sessionUserData.hasOwnProperty('status')) {
      errorAlert(sessionUserData.status);
    } else {
      const sessionUserDataStr = JSON.stringify(sessionUserData);
      localStorage.setItem('sessionUserData', sessionUserDataStr);
      form.reset();
      Object.keys(validationFields[`${form.id}Fields`]).forEach(
        (attribute) => (validationFields[`${form.id}Fields`][attribute] = false)
      );
      window.location.href = '../html/index.html';
    }
  } else {
    errorAlert('Debe ingresar su correo y contraseña para iniciar sesión.');
  }
};

//Event listeners
signInButton.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
    signInSubmit();
  } catch (error) {
    console.log(error);
  }
});
