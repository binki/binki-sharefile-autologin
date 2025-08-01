// ==UserScript==
// @name binki-sharefile-autologin
// @version 1.0.1
// @match https://auth.sharefile.io/*
// @require https://github.com/binki/binki-userscript-when-element-query-selector-async/raw/0a9c204bdc304a9e82f1c31d090fdfdf7b554930/binki-userscript-when-element-query-selector-async.js
// @require https://github.com/binki/binki-userscript-when-input-completed/raw/19b92186c42958221c62d0cf1171e2655e7a7514/binki-userscript-when-input-completed.js
// ==/UserScript==

// Used to try to limit activation to when we were on relevant pages by checking the URL. However, some pages did page-reload-free navigation between them. Instead, just launch all of our handlers without checking the URL to keep things simple. See #1.

// Username. This is skipped if the user chose to have the email remembered, so run this as a fire-and-forget.
(async () => {
  const rememberMeInput = await whenElementQuerySelectorAsync(document.body, '#login-form_remember');
  if (!rememberMeInput.checked) rememberMeInput.click();
  await whenInputCompletedAsync(await whenElementQuerySelectorAsync(document.body, '#login-form_username'));
  document.querySelector('[data-testid=CredentialsLoginButton]').click();
})();
// Password
(async () => {
  await whenInputCompletedAsync(await whenElementQuerySelectorAsync(document.body, '#login-form_password'));
  document.querySelector('[data-testid=CredentialsLoginButton]').click();
})();
// Authenticator choices: Text Message, Voice Call, Authenticator. Assuming the last option is always Authenticator which is the
// preferred option.
(async () => {
  const options = await whenElementQuerySelectorAsync(document.body, '[data-testid=ResendCodeVerificationOptions]');
  options.querySelector(':scope > button:last-of-type').click();
})();
// Authenticator entry.
(async () => {
  const iTrustThisComputerInput = await whenElementQuerySelectorAsync(document.body, '#mfa-phone-code-form_trustThisDevice');
  if (!iTrustThisComputerInput.checked) iTrustThisComputerInput.click();
  await whenInputCompletedAsync(await whenElementQuerySelectorAsync(document.body, '#code'));
  document.querySelector('[data-testid=SubmitButton]').click();
})();
