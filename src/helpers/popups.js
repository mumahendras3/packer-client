import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { shortenString } from './shortenString';

function showError(errorResponseObject) {
  const { message } = errorResponseObject;
  const options = {
    icon: 'error',
    titleText: 'Error',
    html: `<p class="text-danger">${message}</p>`
  };
  if (message === 'One or more invalid inputs encountered') {
    const { errors } = errorResponseObject;
    let swalHtmlBody = `<p>${message}:</p>`;
    errors.forEach(error => {
      swalHtmlBody += `<p class="text-danger">${error}</p>`;
    });
    options.html = swalHtmlBody;
  }
  Swal.fire(options);
}

function showWarning(warningResponseObject) {
  const { message } = warningResponseObject;
  const options = {
    icon: 'warning',
    titleText: 'Warning',
    html: `<p class="text-warning">${message}</p>`
  };
  Swal.fire(options);
}

function showSuccess(successResponseObject) {
  const {
    message,
    email,
    loggingIn,
    loggingOut,
    title,
    content,
    bookmarkedPost,
    newlyBookmarked
  } = successResponseObject;
  const options = {
    icon: 'success',
    titleText: 'Success',
    html: `<p class="text-success">${message}</p>`
  };
  if (email) {
    options.html = `
      <p class="text-success">
        ${email} has been successfully registered
      </p>
      <p>You may now log in</p>
    `;
  }
  if (loggingIn) {
    options.html = `
      <p class="text-success">
        Log-in successful
      </p>
      <p>Welcome to Packer!</p>
    `;
  }
  if (loggingOut) {
    options.html = `
      <p class="text-success">
        Log-out successful
      </p>
      <p>See you again soon!</p>
    `;
  }
  if (title && content) {
    options.html = `
      <p class="text-success">
        Post successfully added
      </p>
      <p>Title: ${shortenString(title, 20)}</p>
      <p>Content: ${shortenString(content, 25)}</p>
    `;
  }
  if (bookmarkedPost && newlyBookmarked) {
    const { title, content } = bookmarkedPost;
    options.html = `
      <p class="text-success">
        Post successfully bookmarked
      </p>
      <p>Title: ${shortenString(title, 20)}</p>
      <p>Content: ${shortenString(content, 25)}</p>
    `;
  }
  Swal.fire(options);
}

export { showError, showWarning, showSuccess };