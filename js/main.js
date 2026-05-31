//                         Modal Inputs
var contactImageInput = document.getElementById("contactImage");
var fullNameInput = document.getElementById("fullName");
var phoneNumberInput = document.getElementById("phoneNumber");
var emailAddressInput = document.getElementById("emailAddress");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");
var searchInput = document.getElementById("search");

//                         Counts elements

var CountPElement = document.getElementById("counts");
var totalCountElement = document.getElementById("totalCount");
var favoritesCountElement = document.getElementById("favoritesCount");
var emergencyCountElement = document.getElementById("emergencyCount");

//                         Sections
var favoritesContacts = document.getElementById("favoritesContacts");
var emergenciesContacts = document.getElementById("emergenciesContacts");

var addbtn = document.getElementById("addbttn");

//                         Global Arrays
var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
var emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

var currentEditIndex = null;
var isUpdate = false;

var errTitle;
var errMsg;
var regex = {
  name: /^[a-zA-Z\s]{2,50}$/,
  phone: /^01[0125][0-9]{8}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

displayContacts(contacts);
displayStats();
displayEmergency();
displayFavorities();
CountPElement.innerHTML = contacts.length;

function displayStats() {
  totalCountElement.innerHTML = contacts.length;

  favoritesCountElement.innerHTML = favorites.length;

  emergencyCountElement.innerHTML = emergencies.length;
}

function displayEmergency() {
  if (!emergencies.length) {
    emergenciesContacts.innerHTML = `<div
                  class="empty position-absolute top-50 start-50 translate-middle "
                >
                  <p class="text-center">No emergency contacts</p>
                </div>`;
    return;
  }
  var cartona = ``;
  for (var i = 0; i < emergencies.length; i++) {
    cartona += `
<div class="contact d-flex gap-2 mb-3 align-items-center ">

<div class="contact-image">
                        ${
                          emergencies[i].contactImage
                            ? `<img
                          class="w-100"
                          src="./images/${emergencies[i].contactImage}"
                          alt="contact Image"
                        />`
                            : `<span>${extractName(emergencies[i].fullName)}</span>
                        `
                        }
                      </div>
                  <div class="me-auto">
                    <h4 class="m-0">${emergencies[i].fullName}</h4>
                    <p class="m-0">${emergencies[i].phoneNumber}</p>
                  </div>
                  <span class="phone d-flex align-items-center justify-content-center">
                    <a href="tel:${emergencies[i].phoneNumber}">
                      <i class="fas fa-phone"></i>
                    </a>
                  </span>
                </div>    `;
  }

  emergenciesContacts.innerHTML = cartona;
}
function displayFavorities() {
  if (!favorites.length) {
    favoritesContacts.innerHTML = `<div
                  class="empty position-absolute top-50 start-50 translate-middle"
                >
                  <p class="text-center">No favorites yet</p>
                </div>`;
    return;
  }
  var cartona = ``;
  for (var i = 0; i < favorites.length; i++) {
    cartona += `<div class="contact d-flex gap-2  mb-3">
                 <div class="contact-image">
                        ${
                          favorites[i].contactImage
                            ? `<img
                          class="w-100"
                          src="./images/${favorites[i].contactImage}"
                          alt="contact Image"
                        />`
                            : `<span>${extractName(favorites[i].fullName)}</span>
                        `
                        }
                      </div>

                  <div class="me-auto">
                    <h4 class="m-0">${favorites[i].fullName}</h4>
                    <p class="m-0">${favorites[i].phoneNumber}</p>
                  </div>
                  <span class="phone d-flex align-items-center justify-content-center">
                    <a href="tel:${favorites[i].phoneNumber}">
                      <i class="fas fa-phone"></i>
                    </a>
                  </span>
                </div>    `;
  }

  favoritesContacts.innerHTML = cartona;
}
function displayContacts(list) {
  if (!list.length) {
    document.getElementById("contacts").innerHTML = `
          <div class="empty py-5 text-center">
            <span class="mx-auto mb-3 d-flex justify-content-center align-items-center">
              <i class="fas fa-2x fa-address-book"></i>
            </span>
            <p class="fw-medium fs-6 mb-2">No contacts found</p>
            <p>Click "Add Contact" to get started</p>
          </div>
  `;
    return;
  }
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += `
              <div class="col-12 col-sm-6">
                <div
                  class="bg-white rounded-3 shadow-lg d-flex flex-column gap-2 h-100"
                >
                  <div class="p-3">
                    <div
                      class="contact-head mt-1 d-flex align-items-center gap-3"
                    >
                      <div class="contact-image">
                        ${
                          list[i].contactImage
                            ? `<img
                          class="w-100"
                          src="./images/${list[i].contactImage}"
                          alt="contact Image"
                        />`
                            : `<span>${extractName(list[i].fullName)}</span>
                        `
                        }
                      </div>
                      <div>
                        <h3 class="mt-0">${list[i].fullName}</h3>
                        <div class="d-flex align-items-center gap-2">
                          <span
                            class="phone d-flex align-items-center justify-content-center"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </span>
                          <p class="m-0">${list[i].phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                    ${(() => {
                      return list[i].emailAddress
                        ? `
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <span
                        class="email d-flex align-items-center justify-content-center"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </span>
                      <p class="m-0">${list[i].emailAddress}</p>
                    </div>
                    `
                        : ``;
                    })()} ${(() => {
                      return list[i].address
                        ? `
                    <div class="d-flex align-items-center gap-2">
                      <span
                        class="location d-flex align-items-center justify-content-center"
                      >
                        <i class="fa-solid fa-location-dot"></i>
                      </span>
                      <p class="m-0">${list[i].address}</p>
                    </div>
                    `
                        : ``;
                    })()}
                    <div class="optional-catigories">
                      ${(() => {
                        switch (list[i].group) {
                          case "family":
                            return `<span class="px-2 py-1 family">${list[i].group}</span>`;
                          case "friends":
                            return `<span class="px-2 py-1 friends"
                        >${list[i].group}</span
                      >`;
                          case "work":
                            return `<span class="px-2 py-1 work"
                        >${list[i].group}</span
                      >`;
                          case "school":
                            return `<span class="px-2 py-1 school"
                        >${list[i].group}</span
                      >`;
                          case "other":
                            return `<span class="px-2 py-1 other"
                        >${list[i].group}</span
                      >`;
                          default:
                            return ``;
                        }
                      })()} ${
                        list[i].emergency
                          ? `<span class="px-2 py-1 emergency"
                        ><i class="fa-solid fa-heart-pulse me-1"></i
                        >emergency</span
                      >`
                          : ``
                      }
                    </div>
                  </div>
                  <div class="footer-icons d-flex gap-2">
                    <button class="border border-0 p-0">
                      <span
                        class="phone d-flex align-items-center justify-content-center"
                      >
                        <a href="tel:${list[i].phoneNumber}">
                          <i class="fas fa-phone"></i>
                        </a>
                      </span>
                    </button>
                    <button class="border border-0 p-0">
                      <span
                        class="envelope d-flex align-items-center justify-content-center"
                      >
                        <a href="mailto:${list[i]?.emailAddress}">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </span>
                    </button>

                    <div class="actions ms-auto ">
                      <button  class="favorite border border-0" 
                      onclick="${
                        list[i].favorite
                          ? `removeFavorite(${list.length<contacts.length?list[i].mainIndex:i}) `
                          : `addFavorite(${list.length<contacts.length?list[i].mainIndex:i})`
                      }"
                      
                      ">
                        <i class="${list[i].favorite ? "fa-solid" : "fa-regular"} fa-star"></i>
                      </button>
                      <button  class="emergency border border-0"  onclick="${
                        list[i].emergency
                          ? `removeEmergency(${list.length<contacts.length?list[i].mainIndex:i})`
                          : `addEmergency(${list.length<contacts.length?list[i].mainIndex:i})`
                      }""><i class="${list[i].emergency ? "fa-solid" : "fa-regular"} fa-${list[i].emergency ? "heart-pulse" : "heart"}"></i></button>
                      <button id="footerEditBtn" class="edit border border-0" data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"   onclick="uploadData(${list.length<contacts.length?list[i].mainIndex:i})"><i class="fas fa-pen"></i></button>
                      <button id="footerDeleteBtn" class="delete border border-0"   onclick="deleteContact(${list.length<contacts.length?list[i].mainIndex:i})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              
    `;
  }
  document.getElementById("contacts").innerHTML = cartona;
  var favoriteBtns = document.querySelectorAll("button.favorite");
  var emergencyBtns = document.querySelectorAll("button.emergency");
  for (var index = 0; index < favoriteBtns.length; index++) {
    favoriteBtns[index].addEventListener("click", function (e) {
      const icon = e.currentTarget.firstElementChild;
      if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    });
  }
  for (var index = 0; index < emergencyBtns.length; index++) {
    emergencyBtns[index].addEventListener("click", function (e) {
      const icon = e.currentTarget.firstElementChild;
      if (icon.classList.contains("fa-heart")) {
        icon.classList.remove("fa-heart");
        icon.classList.add("fa-heart-pulse");
      } else {
        icon.classList.remove("fa-heart-pulse", "fa-regular");
        icon.classList.add("fa-heart", "fa-solid");
      }
    });
  }
}
function addEmergency(index) {
  contacts[index].emergencyIndex = emergencies.length;
  contacts[index].emergency = true;
  emergencies.push(contacts[index]);
  localStorage.setItem("emergencies", JSON.stringify(emergencies));
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts(contacts);
  displayStats();
  displayEmergency();
  displayFavorities();
}
function removeEmergency(index) {
  emergencies.splice(contacts[index].emergencyIndex, 1);
  contacts[index].emergencyIndex = undefined;
  contacts[index].emergency = false;
  localStorage.setItem("emergencies", JSON.stringify(emergencies));
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts(contacts);
  displayStats();
  displayEmergency();
  displayFavorities();
}
function addFavorite(index) {
  contacts[index].favoriteIndex = favorites.length;
  contacts[index].favorite = true;
  favorites.push(contacts[index]);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts(contacts);
  displayStats();
  displayEmergency();
  displayFavorities();
}
function removeFavorite(index) {
  favorites.splice(contacts[index].favoriteIndex, 1);
  contacts[index].favoriteIndex = undefined;
  contacts[index].favorite = false;
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts(contacts);
  displayStats();
  displayEmergency();
  displayFavorities();
}
function addContact() {
  if (
    validInputes(regex.name, fullNameInput) &&
    validInputes(regex.phone, phoneNumberInput) &&
    validNumberDuplicate(phoneNumberInput.value) &&
    (emailAddressInput.value
      ? validInputes(regex.email, emailAddressInput)
      : true)
  ) {
    Swal.fire({
      title: "Added!",
      icon: "success",
      text: "Contact has been added successfully.",
      draggable: true,
      timer: 2000,
    });

    var contact = {
      contactImage:
        contactImageInput.files.length > 0
          ? contactImageInput.files[0].name
          : "",
      fullName: fullNameInput.value,
      phoneNumber: phoneNumberInput.value,
      emailAddress: emailAddressInput.value,
      address: addressInput.value,
      group: groupInput.value,
      notes: notesInput.value,
      favorite: favoriteInput.checked,
      emergency: emergencyInput.checked,
    };
    if (contact.favorite) {
      contact.favoriteIndex = favorites.length;
      favorites.push(contact);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    if (contact.emergency) {
      contact.emergencyIndex = emergencies.length;
      emergencies.push(contact);
      localStorage.setItem("emergencies", JSON.stringify(emergencies));
    }
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayContacts(contacts);
    displayStats();
    displayEmergency();
    displayFavorities();
    CountPElement.innerHTML = contacts.length;
    resetInputs();
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("staticBackdrop"),
    );

    modal.hide();
  } else {
    writeErrorPopUp();
    Swal.fire({
      icon: "error",
      title: errTitle,
      text: errMsg,
    });
  }
}
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contacts[index].fullName} ? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C62222",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        timer: 2000,
      });
      if (contacts[index].favorite) {
        favorites.splice(contacts[index].favoriteIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      if (contacts[index].emergency) {
        emergencies.splice(contacts[index].emergencyIndex, 1);
        localStorage.setItem("emergencies", JSON.stringify(emergencies));
      }

      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));

      displayContacts(contacts);
      displayStats();
      displayEmergency();
      displayFavorities();
      CountPElement.innerHTML = contacts.length;
    }
  });
}
function updateContact(index) {
  if (
    validInputes(regex.name, fullNameInput) &&
    validInputes(regex.phone, phoneNumberInput) &&
    validNumberDuplicate(phoneNumberInput.value) &&
    (emailAddressInput.value
      ? validInputes(regex.email, emailAddressInput)
      : true)
  ) {
    Swal.fire({
      title: "Updated!",
      icon: "success",
      text: "Contact has been updated successfully.",
      draggable: true,
      timer: 2000,
    });
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("staticBackdrop"),
    );

    modal.hide();

    var contact = {
      contactImage:
        contactImageInput.files.length > 0
          ? contactImageInput.files[0].name
          : contacts[index].contactImage,
      fullName: fullNameInput.value,
      phoneNumber: phoneNumberInput.value,
      emailAddress: emailAddressInput.value,
      address: addressInput.value,
      group: groupInput.value,
      notes: notesInput.value,
      favorite: favoriteInput.checked,
      emergency: emergencyInput.checked,
    };

    contacts.splice(index, 1, contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts(contacts);
      resetInputs();

  } else {
    writeErrorPopUp();
    Swal.fire({
      icon: "error",
      title: errTitle,
      text: errMsg,
    });
  }
}
function saveContact() {
  if (isUpdate) {
    updateContact(currentEditIndex);
  } else {
    addContact();
  }
}
function uploadData(index) {
  isUpdate = true;
  currentEditIndex = index;
  fullNameInput.value = contacts[index].fullName;
  phoneNumberInput.value = contacts[index].phoneNumber;
  emailAddressInput.value = contacts[index].emailAddress;
  addressInput.value = contacts[index].address;
  groupInput.value = contacts[index].group;
  notesInput.value = contacts[index].notes;
  favoriteInput.checked = contacts[index].favorite;
  emergencyInput.checked = contacts[index].emergency;
  document.getElementById("staticBackdropLabel").innerHTML = "Update Contact";
  document.getElementById("addbtn").innerHTML = "Update Contact";
}
function searchContacts(searchInput) {
  var token = searchInput.value;
  var filteredContacts = [];

  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].fullName.toLowerCase().includes(token.toLowerCase()) ||
      contacts[i].phoneNumber.toLowerCase().includes(token.toLowerCase()) ||
      contacts[i].emailAddress.toLowerCase().includes(token.toLowerCase())
    ) {
      contacts[i].mainIndex=i;
      filteredContacts.push(contacts[i]);
    }
  }
  displayContacts(filteredContacts);
}
function resetInputs() {
  ((contactImageInput.value = ""), (fullNameInput.value = ""));
  phoneNumberInput.value = "";
  emailAddressInput.value = "";
  addressInput.value = "";
  groupInput.value = "";
  notesInput.value = "";
  favoriteInput.checked = false;
  emergencyInput.checked = false;
  fullNameInput.classList.remove("is-invalid", "is-valid");
  phoneNumberInput.classList.remove("is-invalid", "is-valid");
  emailAddressInput.classList.remove("is-invalid", "is-valid");
  fullNameInput.nextElementSibling.classList.replace("d-block", "d-none");
  phoneNumberInput.nextElementSibling.classList.replace("d-block", "d-none");
  emailAddressInput.nextElementSibling.classList.replace("d-block", "d-none");
  isUpdate = false;
  currentEditIndex = null;
  document.getElementById("staticBackdropLabel").innerHTML = "Add New Contact";
  document.getElementById("addbtn").innerHTML = "Save Contact";
}
function extractName(fullName) {
  var words = fullName.trim().split(" ");
  var firstLetter = words[0].charAt(0).toUpperCase();
  if (words.length > 1) {
    var lastLetter = words[words.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }
  return firstLetter;
}
function validInputes(regex, input) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
function validNumberDuplicate(number) {
  if (currentEditIndex !== null && number==contacts[currentEditIndex].phoneNumber) {
    return true;
  }
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].phoneNumber == number) {
      return false;
    }
  }
  return true;
}
function writeErrorPopUp() {
  switch (false) {
    case validInputes(regex.name, fullNameInput):
      if (fullNameInput.value === "") {
        errTitle = "Missing Name";
        errMsg = "Please enter a name for the contact!";
      } else {
        errTitle = "Invalid Name";
        errMsg =
          "Name should contain only letters and spaces (2-50 characters)";
      }
      break;
    case validInputes(regex.phone, phoneNumberInput):
      if (phoneNumberInput.value === "") {
        errTitle = "Missing phone";
        errMsg = "Please enter a phone number for the contact!";
      } else {
        errTitle = "Invalid phone";
        errMsg =
          "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)";
      }
      break;
    case validNumberDuplicate(phoneNumberInput.value):
      errTitle = "Duplicate Phone Number";
      errMsg = "A contact with this phone number already exists: nada ahmed";
      break;
    case validInputes(regex.email, emailAddressInput):
      errTitle = "Invalid Email";
      errMsg = "Please enter a valid email address";
      break;
    default:
      break;
  }
}
