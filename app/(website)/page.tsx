// This route group file intentionally delegates to the root page.
// The homepage is served by app/page.tsx which includes its own Navbar and Footer.
// Route group layouts (website)/layout.tsx only wraps /about, /competitions, /winners.
export { default } from '../page';
