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

/* 
===========>header animation
*/
TweenMax.to(".effect3d", 1.5, {
  textShadow:
    "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15)",
  ease: Sine.easeInOut,
});
