/**
 * Contact form: sends the form content by email through FormSubmit (https://formsubmit.co),
 * a form-to-email service that works on static hosting (no PHP needed).
 *
 * The first message sent after this change triggers an activation email from FormSubmit to that address:
 * the "Activate Form" link in it must be clicked once, then every message is delivered.
 *
 * The SEND button is a link (not a submit button): a click on it, or the Enter key in a field (form submit),
 * checks the fields and posts them to the FormSubmit AJAX endpoint. The old rd-mailform plugin (it posted to the
 * template author's server, with an empty PHP handler here) still shapes the fields but no longer sends anything.
 */
(function () {
  // FormSubmit random alias of the email address (keeps the address out of the page source)
  var ENDPOINT = "https://formsubmit.co/ajax/641c58001294eb303fd5dac64400c32e";
  var EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function init() {
    var form = document.querySelector(".section-contact form.mailform");
    if (!form) return;
    var button = form.querySelector(".boutton--grey-contact");
    var status = form.querySelector(".contact-form-status");

    function field(name) {
      var el = form.querySelector('[name="' + name + '"]');
      return el ? el.value.trim() : "";
    }

    function showStatus(text, isError) {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle("contact-form-status--error", !!isError);
    }

    function send(e) {
      e.preventDefault();
      e.stopImmediatePropagation(); // the old rd-mailform plugin must not post the form as well

      if (button.getAttribute("aria-disabled") === "true") return; // already sending

      var data = {
        name: field("name"),
        phone: field("phone"),
        email: field("email"),
        subject: field("subject"),
        message: field("message"),
      };

      if (field("_honey")) return; // spam robot: the hidden field is only filled by robots
      if (!data.name || !data.email || !data.subject || !data.message) {
        showStatus("Please fill in your name, email, subject and message.", true);
        return;
      }
      if (!EMAIL_FORMAT.test(data.email)) {
        showStatus("Please enter a valid email address.", true);
        return;
      }

      // FormSubmit options: email subject, reply-to the visitor, table layout of the fields
      data._subject = "Website contact: " + data.subject;
      data._replyto = data.email;
      data._template = "table";

      button.setAttribute("aria-disabled", "true");
      showStatus("Sending…", false);

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return { success: "false", message: "HTTP " + response.status };
            })
            .then(function (json) {
              if (!response.ok || String(json.success) !== "true") {
                // FormSubmit answered but did not send (e.g. the form still needs its activation)
                throw new Error(json.message || "HTTP " + response.status);
              }
            });
        })
        .then(function () {
          form.reset();
          showStatus("Thank you, your message has been sent. I will get back to you soon.", false);
        })
        .catch(function (error) {
          // the reason is shown and logged: FormSubmit's own answer (activation needed, refused origin...)
          // or a network error (no connection, blocked request)
          console.error("Contact form not sent:", error);
          showStatus(
            "Sorry, the message could not be sent" +
              (error && error.message ? " (" + error.message + ")" : "") +
              ". Please email me at benjamin.fontannaz@gmail.com.",
            true
          );
        })
        .then(function () {
          button.removeAttribute("aria-disabled");
        });
    }

    button.addEventListener("click", send);
    // Enter key in a field: capture phase, so it runs before the rd-mailform plugin handler (stopped above)
    form.addEventListener("submit", send, true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
