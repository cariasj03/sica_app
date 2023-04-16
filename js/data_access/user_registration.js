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

registerUser.addEventListener('click', async () => {
    // Validates the fields of the form
    if (
        Object.values(validationFields.userRegistrationFormFields).every(Boolean)
    ) {
        // Make the request to the server
        await registerNewUser(getFormFields());
        // Show user feedback
        submitBtn();
    }
});
