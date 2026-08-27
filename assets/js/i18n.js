/**
 * Shared UI strings for both language versions of every employee card.
 * Person-specific translated fields (name, position, address, company)
 * live in each employee's config.js instead, since those vary per person.
 */
window.BATJIN_CARD_STRINGS = {
  en: {
    save: "SAVE CONTACT",
    saveAriaLabel: function (name) { return "Save " + name + " as a contact"; },
    call: "Call",
    email: "Email",
    location: "Location",
    share: "Share",
    labelPhone: "Phone",
    labelEmail: "Email",
    labelWebsite: "Website",
    labelAddress: "Address",
    footerTagline: "Currency Exchange",
    copied: "Copied to clipboard",
  },
  mn: {
    save: "ХАРИЛЦАГЧ ХАДГАЛАХ",
    saveAriaLabel: function (name) { return name + "-г харилцагчаар хадгалах"; },
    call: "Залгах",
    email: "Имэйл",
    location: "Байршил",
    share: "Хуваалцах",
    labelPhone: "Утас",
    labelEmail: "И-мэйл",
    labelWebsite: "Вэбсайт",
    labelAddress: "Хаяг",
    footerTagline: "Валют арилжаа",
    copied: "Холбоос хуулагдлаа",
  },
};
