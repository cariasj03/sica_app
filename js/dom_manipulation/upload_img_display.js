//Variables
//Stores the form of the page the user is in
const uploadPictureForm = document.querySelector('form');
let imageDisplay;
let imageDisplay2;
let uploadPictureButton;
let uploadPictureButton2;

//Function to change the image display depending on the page the user is in
const changeImageElements = () => {
  switch (uploadPictureForm.id) {
    case 'myProfileForm':
      imageDisplay = document.getElementById('profilePictureDisplay');
      uploadPictureButton = document.getElementById(
        'profilePictureUploadButton'
      );
      break;

    case 'signupForm':
      imageDisplay = document.getElementById('imageDisplay');
      uploadPictureButton = document.getElementById('userProfilePicture');
      break;

    case 'userInfoForm':
      imageDisplay = document.getElementById('userPictureDisplay');
      uploadPictureButton = document.getElementById('editUserPictureButton');
      break;

    case 'assetTransferRequestForm':
      imageDisplay = document.getElementById('transferImageDisplay1');
      imageDisplay2 = document.getElementById('transferImageDisplay2');
      uploadPictureButton = document.getElementById('transferUploadButton1');
      uploadPictureButton2 = document.getElementById('transferUploadButton2');

      uploadPictureButton2.addEventListener(
        'click',
        () => {
          cloudinaryWidget2.open();
        },
        false
      );

      break;
  }
};

//Creates the widget to upload images
const cloudinaryWidget1 = cloudinary.createUploadWidget(
  {
    cloudName: 'cariasj',
    uploadPreset: 'cariasj',
    sources: [
      'camera',
      'google_drive',
      'facebook',
      'dropbox',
      'instagram',
      'local',
    ],
    clientAllowedFormats: ['png', 'jpeg', 'jpg'],
    showAdvancedOptions: false,
    cropping: false,
    multiple: true,
    defaultSource: 'local',
    styles: {
      palette: {
        window: '#FFFFFF',
        windowBorder: '#90A0B3',
        tabIcon: '#D86634',
        menuIcons: '#5A616A',
        textDark: '#000000',
        textLight: '#FFFFFF',
        link: '#D86634',
        action: '#687448',
        inactiveTabIcon: '#57613C',
        error: '#F44235',
        inProgress: '#ADC178',
        complete: '#20B832',
        sourceBg: '#E4EBF1',
      },
      fonts: { default: { active: true } },
    },
  },
  (err, result) => {
    if (!err && result && result.event === 'success') {
      console.log('Imagen subida con éxito', result.info);
      imageDisplay.src = result.info.secure_url;
    }
  }
);

//Creates the widget to upload images
const cloudinaryWidget2 = cloudinary.createUploadWidget(
  {
    cloudName: 'cariasj',
    uploadPreset: 'cariasj',
    sources: [
      'camera',
      'google_drive',
      'facebook',
      'dropbox',
      'instagram',
      'local',
    ],
    clientAllowedFormats: ['png', 'jpeg', 'jpg'],
    showAdvancedOptions: false,
    cropping: false,
    multiple: true,
    defaultSource: 'local',
    styles: {
      palette: {
        window: '#FFFFFF',
        windowBorder: '#90A0B3',
        tabIcon: '#D86634',
        menuIcons: '#5A616A',
        textDark: '#000000',
        textLight: '#FFFFFF',
        link: '#D86634',
        action: '#687448',
        inactiveTabIcon: '#57613C',
        error: '#F44235',
        inProgress: '#ADC178',
        complete: '#20B832',
        sourceBg: '#E4EBF1',
      },
      fonts: { default: { active: true } },
    },
  },
  (err, result) => {
    if (!err && result && result.event === 'success') {
      console.log('Imagen subida con éxito', result.info);
      imageDisplay2.src = result.info.secure_url;
    }
  }
);

//Function calls
changeImageElements();

//Event Listeners
uploadPictureButton.addEventListener(
  'click',
  () => {
    cloudinaryWidget1.open();
  },
  false
);
