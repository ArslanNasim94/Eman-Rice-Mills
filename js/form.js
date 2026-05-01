const inquiryForm = document.querySelector("#inquiry-form");

function setError(field, message) {
  const group = field.closest(".form-group");
  const error = group?.querySelector(".field-error");
  if (error) error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validatePhone(phone) {
  return /^(\+92|0)?3\d{9}$/.test(phone.replace(/[\s-]/g, ""));
}

if (inquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const requestedProduct = params.get("product");
  if (requestedProduct) {
    const productSelect = inquiryForm.querySelector("#product");
    if (productSelect) productSelect.value = requestedProduct;
  }

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = {
      name: inquiryForm.querySelector("#name"),
      phone: inquiryForm.querySelector("#phone"),
      city: inquiryForm.querySelector("#city"),
      product: inquiryForm.querySelector("#product"),
    };

    let isValid = true;
    Object.values(fields).forEach((field) => setError(field, ""));

    if (!fields.name.value.trim()) {
      setError(fields.name, "Please enter your full name.");
      isValid = false;
    }

    if (!validatePhone(fields.phone.value)) {
      setError(fields.phone, "Enter a valid Pakistani mobile number, e.g. +92 345 1010035.");
      isValid = false;
    }

    if (!fields.city.value.trim()) {
      setError(fields.city, "Please enter your city or location.");
      isValid = false;
    }

    if (!fields.product.value) {
      setError(fields.product, "Please choose a product.");
      isValid = false;
    }

    const message = inquiryForm.querySelector(".form-message");
    if (!isValid) {
      if (message) {
        message.textContent = "Please correct the highlighted fields.";
        message.style.color = "#b42318";
      }
      return;
    }

    const button = inquiryForm.querySelector("button[type='submit']");
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    window.setTimeout(() => {
      if (message) {
        message.textContent = "Thank you! We'll reach out within 24 hours.";
        message.style.color = "#1f7a3f";
      }
      inquiryForm.reset();
      if (button) {
        button.disabled = false;
        button.textContent = "Send Inquiry →";
      }
    }, 750);
  });
}
