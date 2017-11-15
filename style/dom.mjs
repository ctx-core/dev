export function $px__rem(rem=1) {
  return rem * parseFloat(
    getComputedStyle(
      document.documentElement
    )
    .fontSize
  );
}
export function $rem__px(px=16) {
  return px / $px__rem(1)
}