//Variables
//Stores the form of the page the user is in
const uploadPictureForm = document.querySelector('form');
let imageDisplay;
let uploadPictureButton;

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

    case 'assetTransferRequestValidation':
      const assetImageInput1 = document.getElementById('uploadPictureAsset1');
      const assetImageDisplay1 = document.getElementById('assetImageDisplay1');
      const assetImageInput2 = document.getElementById('uploadPictureAsset2');
      const assetImageDisplay2 = document.getElementById('assetImageDisplay2');

      //Event Listeners
      assetImageInput1.addEventListener('change', function (e) {
        assetImageDisplay1.src = URL.createObjectURL(e.target.files[0]);
      });

      assetImageInput2.addEventListener('change', function (e) {
        assetImageDisplay2.src = URL.createObjectURL(e.target.files[0]);
      });
      break;
  }
};

//Creates the widget to upload images
const cloudinaryWidget = cloudinary.createUploadWidget(
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

//Function calls
changeImageElements();

//Event Listeners
uploadPictureButton.addEventListener(
  'click',
  () => {
    cloudinaryWidget.open();
  },
  false
);
