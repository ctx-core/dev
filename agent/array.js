/**
 * Agent methods for array data.
 * @module ctx-core/agent/array
 */
import {assign,keys} from "ctx-core/object/lib";
import {array$remove,array$concat} from "ctx-core/array/lib";
import {ensure__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/agent/array";
/**
 * Assigns an agent that acts on an array value.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {agent$ctx} agent$ctx
 * @param {string} agent$ctx.key - agent key in ctx
 * @returns {module:ctx-core/object/lib~ctx} The ctx with the array agent in agent$ctx.key
 */
export function agent__array(ctx) {
  log(`${logPrefix}|agent__array`);
  let agent = ensure__agent(...arguments);
  const scope = agent.scope;
  assign(agent, {
    push: push,
    remove: remove,
    clear: clear
  });
  clear();
  return agent;
  function push(...push$ctx$$) {
    log(`${logPrefix}|agent__array|push`);
    let agent$set$ctx = {};
    push$ctx$$.forEach(
      push$ctx => {
        keys(push$ctx).forEach(
          array$key => {
            agent$set$ctx[array$key] = array$concat(
              ctx[array$key]||[],
              push$ctx[array$key]);
          }
        );
      }
    );
    agent.set(agent$set$ctx);
    return agent$set$ctx;
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|agent__array|remove`);
    let agent$set$ctx = {};
    remove$ctx$$.forEach(
      remove$ctx => {
        keys(remove$ctx).forEach(
          array$key => {
            agent$set$ctx[array$key] = array$remove(
              agent$set$ctx[array$key]||[],
              ...remove$ctx[array$key]);
          }
        );
      }
    );
    agent.set(agent$set$ctx);
    return agent$set$ctx;
  }
  function clear() {
    log(`${logPrefix}|agent__array|clear`);
    agent.set(scope.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {}));
  }
}