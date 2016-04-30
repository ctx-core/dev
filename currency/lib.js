import {clone} from "ctx-core/object/lib";
export function currency$format() {
  const ctx = clone(...arguments)
      , usd$amount = Math.round(parseFloat(ctx.value));
  return isNaN(usd$amount) ? "" : "$" + Math.round(parseFloat(ctx.value));
}