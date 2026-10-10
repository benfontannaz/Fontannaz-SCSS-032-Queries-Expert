/**
 * Cookie consent manager (no external service, no request before consent).
 *
 * Region (from the visitor's time zone, so no IP look-up is needed):
 * - "us"    United States: opt-out model (US state privacy laws, e.g. California CCPA/CPRA). Optional content is
 *           active unless the visitor opts out; the Global Privacy Control browser signal counts as an opt-out.
 * - "optin" everywhere else (EU/EEA GDPR + ePrivacy, UK GDPR, Swiss nFADP, Brazil LGPD, Canada / Quebec Law 25,
 *           and any other or unknown region): nothing optional is loaded before an explicit "Accept".
 *
 * Categories:
 * - necessary: always on. Only the choice itself, kept in this browser (localStorage "fc-consent").
 * - external:  external media = the live Google Maps map in the footer (Google sets its own cookies). Without it,
 *              a map picture served from this website is shown instead.
 *
 * Optional content is declared in the page and only activated when its category is allowed:
 *   <iframe data-consent="external" data-src="https://...">              (src set on consent, removed on refusal)
 *   <script type="text/plain" data-consent="external" src|text>          (executed on consent)
 *   <div class="consent-placeholder" data-consent-placeholder="external"> (shown while the category is refused)
 * Links or buttons with [data-consent-open] (or href="#cookie-settings") reopen the settings.
 * The choice is asked again after 12 months or when CONSENT_VERSION changes.
 */
(function () {
  var STORAGE_KEY = "fc-consent";
  var CONSENT_VERSION = 1;
  var MAX_AGE_DAYS = 365;
  var CATEGORIES = ["external"];

  // United States time zones (IANA): the only opt-out region
  var US_ZONES = /^(America\/(New_York|Detroit|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Nome|Yakutat|Metlakatla|Adak|Boise|Menominee|Indiana\/.*|Kentucky\/.*|North_Dakota\/.*)|Pacific\/Honolulu|US\/.*)$/;

  var root = document.documentElement;
  var region = detectRegion();
  var gpc = navigator.globalPrivacyControl === true;
  var banner = null;

  function detectRegion() {
    var zone = "";
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (e) {}
    return US_ZONES.test(zone) ? "us" : "optin";
  }

  // ---- stored choice -------------------------------------------------------------------------------------------
  function read() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!data || data.version !== CONSENT_VERSION) return null;
      if (Date.now() - new Date(data.date).getTime() > MAX_AGE_DAYS * 864e5) return null;
      return data;
    } catch (e) {
      return null; // storage blocked (private mode): the banner is shown again on each visit
    }
  }

  function save(choices) {
    var data = { version: CONSENT_VERSION, date: new Date().toISOString(), region: region, gpc: gpc, choices: choices };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    return data;
  }

  // choices in force: the stored ones, or the region default before any choice
  function current() {
    var data = read();
    if (data) return data.choices;
    var allowed = region === "us" && !gpc; // US: active unless opted out (GPC = opt-out); elsewhere: off
    var choices = {};
    CATEGORIES.forEach(function (c) {
      choices[c] = allowed;
    });
    return choices;
  }

  // ---- apply: activate / deactivate the optional content ------------------------------------------------------
  function apply(choices) {
    document.querySelectorAll("[data-consent]").forEach(function (el) {
      var allowed = !!choices[el.getAttribute("data-consent")];
      if (el.tagName === "IFRAME") {
        if (allowed && !el.getAttribute("src")) el.setAttribute("src", el.getAttribute("data-src"));
        if (!allowed && el.getAttribute("src")) el.removeAttribute("src"); // unloads the embedded page
      } else if (el.tagName === "SCRIPT" && el.type === "text/plain" && allowed && !el.dataset.consentDone) {
        var s = document.createElement("script");
        if (el.src) s.src = el.src;
        else s.text = el.text;
        el.dataset.consentDone = "1";
        el.parentNode.insertBefore(s, el.nextSibling);
      }
    });
    document.querySelectorAll("[data-consent-placeholder]").forEach(function (el) {
      el.hidden = !!choices[el.getAttribute("data-consent-placeholder")];
    });
    root.classList.toggle("consent-external-on", !!choices.external);
    // sections sized by script (js/services-height.js) are measured again
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new CustomEvent("fc:consent", { detail: choices }));
  }

  function decide(choices) {
    save(choices);
    apply(choices);
    close();
  }

  function all(value) {
    var choices = {};
    CATEGORIES.forEach(function (c) {
      choices[c] = value;
    });
    return choices;
  }

  // ---- banner ---------------------------------------------------------------------------------------------------
  function texts() {
    if (region === "us") {
      return {
        title: "Your privacy choices",
        intro:
          "This website uses only what it needs to work. The interactive map in the footer is provided by Google Maps, which may set cookies that Google can use for advertising. Under US state privacy laws (for example California), this can be a “sharing” of personal information, and you can opt out: a map picture is then shown instead." +
          (gpc ? " Your browser sends a Global Privacy Control signal: we treat it as an opt-out." : ""),
        accept: "Allow all",
        reject: "Do Not Sell or Share My Personal Information",
      };
    }
    return {
      title: "Cookies and privacy",
      intro:
        "This website uses only what it needs to work. With your consent, the map in the footer is an interactive Google Maps map, for which Google sets cookies and receives your IP address (also in the USA); otherwise a map picture is shown. You can accept, refuse, or choose, and change your choice at any time with “Cookie settings” at the bottom of the page.",
      accept: "Accept all",
      reject: "Reject all",
    };
  }

  function build() {
    var t = texts();
    var choices = current();
    banner = document.createElement("div");
    banner.className = "consent-banner consent-banner--" + region;
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "consent-title");
    banner.setAttribute("aria-describedby", "consent-intro");
    banner.innerHTML =
      '<div class="consent-banner__inner">' +
      '<h2 class="consent-banner__title" id="consent-title">' + t.title + "</h2>" +
      '<p class="consent-banner__intro" id="consent-intro">' + t.intro + "</p>" +
      '<div class="consent-banner__details" hidden>' +
      '<label class="consent-banner__option"><input type="checkbox" checked disabled /> ' +
      "<span><strong>Necessary</strong> – remembers your choice in this browser. Always on.</span></label>" +
      '<label class="consent-banner__option"><input type="checkbox" data-category="external"' +
      (choices.external ? " checked" : "") +
      " /> <span><strong>External media</strong> – interactive Google Maps map (Google Ireland / Google LLC; cookies, IP address). Off: a map picture is shown.</span></label>" +
      "</div>" +
      '<p class="consent-banner__links"><a href="privacy-policy.html">Privacy Policy</a> · <a href="cookie-policy.html">Cookie Policy</a> · <a href="legal-notice.html">Legal Notice</a></p>' +
      '<div class="consent-banner__buttons">' +
      '<button type="button" class="consent-banner__button" data-action="reject">' + t.reject + "</button>" +
      '<button type="button" class="consent-banner__button" data-action="customize">Customize</button>' +
      '<button type="button" class="consent-banner__button" data-action="save" hidden>Save my choices</button>' +
      '<button type="button" class="consent-banner__button" data-action="accept">' + t.accept + "</button>" +
      "</div></div>";

    banner.addEventListener("click", function (e) {
      var action = e.target.getAttribute && e.target.getAttribute("data-action");
      if (action === "accept") decide(all(true));
      else if (action === "reject") decide(all(false));
      else if (action === "customize") {
        banner.querySelector(".consent-banner__details").hidden = false;
        banner.querySelector('[data-action="save"]').hidden = false;
        e.target.hidden = true;
        banner.querySelector("[data-category]").focus();
      } else if (action === "save") {
        var picked = {};
        banner.querySelectorAll("[data-category]").forEach(function (box) {
          picked[box.getAttribute("data-category")] = box.checked;
        });
        decide(picked);
      }
    });
    document.body.appendChild(banner);
  }

  function open() {
    if (banner) banner.remove();
    build();
    var first = banner.querySelector("button");
    if (first) first.focus();
  }

  function close() {
    if (banner) banner.remove();
    banner = null;
  }

  // ---- start ----------------------------------------------------------------------------------------------------
  function init() {
    root.classList.add("consent-region-" + region);
    apply(current());
    if (!read()) open(); // no valid choice yet: ask (US: notice with opt-out; elsewhere: opt-in)

    document.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest('[data-consent-open], a[href="#cookie-settings"]');
      if (link) {
        e.preventDefault();
        open();
        return;
      }
      // "Interactive Google map" button over the map picture: allows that category only
      var load = e.target.closest && e.target.closest("[data-consent-allow]");
      if (load) {
        var choices = current();
        choices[load.getAttribute("data-consent-allow")] = true;
        decide(choices);
      }
    });
    if (location.hash === "#cookie-settings") open(); // link from the legal pages
  }

  window.FCConsent = { open: open, get: current, region: region };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
