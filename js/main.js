var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var submitBtn = document.getElementById("submitBtn");
var UpdateBtn = document.getElementById("UpdateBtn");
var searchNamde = document.getElementById("search");
var modal = document.getElementById("modalShown");
var close = document.getElementById("closeBtn");
var globalIndex = 0;
var bookmarkerContainer = [];
if (localStorage.getItem("bookMarkers") !== null) {
  bookmarkerContainer = JSON.parse(localStorage.getItem("bookMarkers"));
  displayData();
}
function addBookmark() {
  if (validationInput(bookmarkName) && validationInput(bookmarkUrl)) {
    var bookmark = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    bookmarkerContainer.push(bookmark);
    localStorage.setItem("bookMarkers", JSON.stringify(bookmarkerContainer));
    displayData();
    clearInputs();
  } else {
    modal.classList.remove("d-none");
  }
}

function clearInputs() {
  bookmarkName.value = null;
  bookmarkUrl.value = null;
  bookmarkName.classList.remove("is-valid");
  bookmarkUrl.classList.remove("is-valid");
}

function displayData() {
  var cartona = "";
  for (i = 0; i < bookmarkerContainer.length; i++) {
    if (bookmarkerContainer[i].url.startsWith("https://")) {
      cartona += `
    <tr data-aos="fade-up" data-aos-offset="50">
          <td>
          <p class="td-middel">
          ${i + 1}
          </p>
          </td>
          <td>
          <p class="td-middel">
          ${bookmarkerContainer[i].name}
          </p>
          </td>              
          <td>
          <p class="td-middel">
          <a href="${bookmarkerContainer[i].url}/" target="_blank">
            <button class="btn-visit bg-primary position-relative start-50 translate-middle-x">
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Visit</span>
            </button>            
          </a>
          </p>
          </td>
          <td>
            <div class="btn-options d-md-flex justify-content-center gap-2">
            <button class="btn btn-delete bg-danger text-white" onclick="delBookMark(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
            <button class="btn btn-update bg-warning text-white" onclick="updateBookmark(${i})">
              <i class="fa fa-pencil"></i>
              Update
            </button>
          </div>
          </td>
      </tr>
    `;
    } else if (bookmarkerContainer[i].url.startsWith("www.")) {
      cartona += `
    <tr data-aos="fade-up" data-aos-offset="50">
    <td>
    <p class="td-middel">
    ${i + 1}
    </p>
    </td>
    <td>
    <p class="td-middel">
    ${bookmarkerContainer[i].name}
    </p>
    </td>              
    <td>
    <p class="td-middel">
      <a href="https://${bookmarkerContainer[i].url}/" target="_blank">
        <button class="btn-visit bg-primary position-relative start-50 translate-middle-x">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Visit</span>
        </button>            
      </a>
    </p>
    </td>         
          <td>
            <div class="btn-options d-md-flex justify-content-center gap-2">
            <button class="btn btn-delete bg-danger text-white" onclick="delBookMark(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
            <button class="btn btn-update bg-warning text-white" onclick="updateBookmark(${i})">
              <i class="fa fa-pencil"></i>
              Update
            </button>
          </div>
          </td>
      </tr>
    `;
    } else {
      cartona += `
    <tr data-aos="fade-up" data-aos-offset="50">
    <td>
    <p class="td-middel">
    ${i + 1}
    </p>
    </td>
    <td>
    <p class="td-middel">
    ${bookmarkerContainer[i].name}
    </p>
    </td>              
    <td>
    <p class="td-middel">
      <a href="https://www.${bookmarkerContainer[i].url}/" target="_blank">
        <button class="btn-visit bg-primary position-relative start-50 translate-middle-x">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Visit</span>
        </button>            
      </a>
    </p>
    </td>
          <td>
            <div class="btn-options d-md-flex justify-content-center gap-2">
            <button class="btn btn-delete bg-danger text-white" onclick="delBookMark(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
            <button class="btn btn-update bg-warning text-white" onclick="updateBookmark(${i})">
              <i class="fa fa-pencil"></i>
              Update
            </button>
          </div>
          </td>
      </tr>
    `;
    }
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

function delBookMark(index) {
  bookmarkerContainer.splice(index, 1);
  localStorage.setItem("bookMarkers", JSON.stringify(bookmarkerContainer));
  displayData();
}

function searching() {
  var text = searchNamde.value;
  var cartona = "";
  for (i = 0; i < bookmarkerContainer.length; i++) {
    if (
      bookmarkerContainer[i].name
        .toLocaleLowerCase()
        .startsWith(text.toLocaleLowerCase())
    ) {
      cartona += `
    <tr data-aos="fade-up" data-aos-offset="50">
          <td>${i + 1}</td>
          <td>${bookmarkerContainer[i].name}</td>              
          <td>
            <a href="https://www.${
              bookmarkerContainer[i].url
            }/" target="_blank">
              <button class="btn-visit bg-primary position-relative start-50 translate-middle-x">
                <div class="svg-wrapper-1">
                  <div class="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Visit</span>
              </button>            
            </a>
          </td>
          <td>
            <div class="btn-options d-md-flex justify-content-center gap-2">
            <button class="btn btn-delete btn-outline-danger" onclick="delBookMark(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
            <button class="btn btn-update btn-outline-warning" onclick="updateBookmark(${i})">
              <i class="fa fa-pencil"></i>
              Update
            </button>
          </div>
          </td>
      </tr>
    `;
    }
  }
  document.getElementById("tableContent").innerHTML = cartona;
}
function updateBookmark(index) {
  globalIndex = index;
  bookmarkName.value = bookmarkerContainer[index].name;
  bookmarkUrl.value = bookmarkerContainer[index].url;
  UpdateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
}
function upDateBookmark() {
  if (validationInput(bookmarkName) && validationInput(bookmarkUrl)) {
    var bookmark = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    bookmarkerContainer.splice(globalIndex, 1, bookmark);
    localStorage.setItem("bookMarkers", JSON.stringify(bookmarkerContainer));
    displayData();
    UpdateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    clearInputs();
  } else {
    modal.classList.remove("d-none");
  }
}
function validationInput(elemnt) {
  var regex = {
    bookmarkName: /^[A-Z]\w{3,10}$/,
    bookmarkUrl: /^(https:\/\/|www\.|[A-Z]|[a-z])(www\.)?\w{3,10}\.com$/,
  };
  var textInput = elemnt.value;
  if (regex[elemnt.id].test(textInput)) {
    elemnt.classList.add("is-valid");
    elemnt.classList.remove("is-invalid");
    return true;
  } else {
    elemnt.classList.add("is-invalid");
    elemnt.classList.remove("is-valid");
    return false;
  }
}
function closeModal() {
  modal.classList.add("d-none");
}
