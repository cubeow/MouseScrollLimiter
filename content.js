// CONFIGURATION
// 1.0 is normal speed. 0.3 means 30% speed. Decrease this to make it even slower.
const SCROLL_MULTIPLIER = 0.3; 

window.addEventListener('wheel', (event) => {
  // 1. Stop the browser's default, fast scroll behavior
  event.preventDefault(); 

  // 2. Multiply the intended scroll distance by your speed limit
  const slowedScrollY = event.deltaY * SCROLL_MULTIPLIER;
  const slowedScrollX = event.deltaX * SCROLL_MULTIPLIER;

  // 3. Find the scrollable area under the mouse (fixes issues with sidebars/chat boxes)
  const targetElement = getScrollableParent(event.target);

  // 4. Apply the slowed-down scroll
  if (targetElement) {
    targetElement.scrollBy({ top: slowedScrollY, left: slowedScrollX, behavior: 'auto' });
  } else {
    window.scrollBy({ top: slowedScrollY, left: slowedScrollX, behavior: 'auto' });
  }
}, { passive: false }); // Required to allow preventDefault()


// Helper function: Finds the specific box you are hovering over so nested scrolling works
function getScrollableParent(node) {
  if (node == null || node === document.body || node === document.documentElement) {
    return null; 
  }
  
  // Check if the current element has a scrollbar
  if (node.scrollHeight > node.clientHeight) {
    const overflowY = window.getComputedStyle(node).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return node;
    }
  }
  
  // If not, check its parent
  return getScrollableParent(node.parentNode);
}