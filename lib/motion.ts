/**
 * JS mirror of animation tokens from styles/tokens.css.
 * If you change values here, update tokens.css too (and vice versa).
 */

export const ease = {
  move: [0.3, 0, 0.05, 1] as const, // --ease-move
  fade: "linear" as const,           // --ease-fade
};

export const duration = {
  fast:       0.1,  // --duration-fast:       100ms
  fade:       0.3,  // --duration-fade:       300ms
  moveSm:     0.25, // --duration-move-sm:    250ms
  moveMd:     0.35, // --duration-move-md:    350ms
  moveLg:     0.5,  // --duration-move-lg:    500ms
  pageExit:   0.2,  // --duration-page-exit:  200ms
  pageEnter:  0.4,  // --duration-page-enter: 400ms
};

export const stagger = {
  1: 0.05, // --stagger-1: 50ms
  2: 0.09, // --stagger-2: 90ms
  3: 0.12, // --stagger-3: 120ms
  4: 0.14, // --stagger-4: 140ms
} as const;
