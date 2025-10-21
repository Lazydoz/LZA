document.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.matches && target.matches('.modal .close')) {
    // Find the nearest modal element
    const modal = target.closest('.modal');
    if (modal) modal.style.display = 'none';
  }
});
