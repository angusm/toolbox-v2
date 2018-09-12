/**
 * A function that does nothing regardless of what you give it.
 * As with returnUntouched this is a function created to be imported solely to
 * have a name and clearly identify the intention in code. This could easily
 * be replaced by (...a: any[]) => {} to the same effect, but hopefully noop
 * makes it clear to the reader that this was deliberate and intentional.
 */
function noop(...args: any[]): any {}

export {noop};
