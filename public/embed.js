(function() {
  // Get the current script tag
  const script = document.currentScript;
  const cardSlug = script.getAttribute('data-card-slug');

  if (!cardSlug) {
    console.error('ContactCard: data-card-slug attribute is required');
    return;
  }

  // Get the origin from the script src
  const scriptSrc = script.src;
  const origin = new URL(scriptSrc).origin;

  // Create iframe container
  const container = document.createElement('div');
  container.id = `contactcard-${cardSlug}`;
  container.style.cssText = 'width: 100%; max-width: 400px; margin: 0 auto;';

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = `${origin}/card/${cardSlug}`;
  iframe.style.cssText = 'width: 100%; height: 400px; border: none; border-radius: 8px;';
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('title', 'Contact Card');

  container.appendChild(iframe);

  // Insert the container after the script tag
  script.parentNode.insertBefore(container, script.nextSibling);
})();
