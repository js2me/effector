//@flow

import type {OptsAsync, OptsSync, Config} from './index.h'

import {defaultResolver, forceResolver} from './resolver'

declare export function optsToConfig<Item, Result>(
 opts: OptsSync<Item, Result>,
): Config<Item, (Item) => Result>
declare export function optsToConfig<Item, Result>(
 opts: OptsAsync<Item, (Item) => Promise<Result>>,
): Config<Item, Result>
// declare export function optsToConfig<Item, Result>(
//  opts: Opts<Item, Result>,
// ): Config<Item, Result>
export function optsToConfig<Item, Result>(
 opts: OptsSync<Item, Result> | OptsAsync<Item, Result>,
): Config<Item, Result, *> {
 const config = {}
 config.graph = opts.graph
 config.task = opts.task
 config.force = typeof opts.force === 'boolean' ? opts.force : false
 config.sync = typeof opts.force === 'boolean' ? opts.force : false
 config.resolvers =
  opts.resolvers === undefined
   ? [defaultResolver, forceResolver]
   : opts.resolvers

 return config
}
