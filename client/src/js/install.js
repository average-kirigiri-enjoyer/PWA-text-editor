const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let installPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) =>
{
  console.log('beforeinstallprompt event fired:', event);
  installPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () =>
{
  installPrompt.prompt();

  const promptResponse = await installPrompt.userChoice;

  if (promptResponse.outcome === 'accepted')
  {
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
    installPrompt = null;
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) =>
{
  console.log('App Installed;', event);
});