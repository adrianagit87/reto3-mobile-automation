/**
 * Helpers de gestos cross-platform (W3C Actions API).
 * Appium 2/3 deprecó TouchAction — esto es el camino moderno.
 */

type Direction = 'up' | 'down' | 'left' | 'right';

export async function swipe(direction: Direction, percent = 0.6): Promise<void> {
  const { width, height } = await browser.getWindowSize();
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  const dy = Math.floor((height * percent) / 2);
  const dx = Math.floor((width * percent) / 2);

  const points: Record<Direction, { start: [number, number]; end: [number, number] }> = {
    up:    { start: [cx, cy + dy], end: [cx, cy - dy] },
    down:  { start: [cx, cy - dy], end: [cx, cy + dy] },
    left:  { start: [cx + dx, cy], end: [cx - dx, cy] },
    right: { start: [cx - dx, cy], end: [cx + dx, cy] },
  };

  const { start, end } = points[direction];

  await browser.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: start[0], y: start[1] },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration: 100 },
      { type: 'pointerMove', duration: 600, x: end[0], y: end[1] },
      { type: 'pointerUp', button: 0 },
    ],
  }]);

  await browser.releaseActions();
}

export const swipeUp = () => swipe('up');
export const swipeDown = () => swipe('down');
export const swipeLeft = () => swipe('left');
export const swipeRight = () => swipe('right');
