import isServer from './isServer'
import { isObject, capitalize, hyphenate, looseEqual, extend, camelize } from '@vue/shared'
import { isEmpty, castArray, isEqual } from 'lodash'

import type { AnyFunction } from './types'

const { hasOwnProperty } = Object.prototype

export function hasOwn(obj: any, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

export function toObject<T>(arr: Array<T>): Record<string, T> {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const getValueByPath = (obj: any, paths = ''): unknown => {
  let ret: unknown = obj
  paths.split('.').map(path => {
    ret = ret?.[path]
  })
  return ret
}

export function getPropByPath(obj: any, path: string, strict: boolean): {
  o: unknown
  k: string
  v: Nullable<unknown>
} {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  for (i; i < keyArr.length - 1; i++) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    tempObj = tempObj?.[key]
    if (!tempObj && strict) {
      throw new Error('please transfer a valid prop path to form item!')
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]],
  }
}

/**
 * Generate random number in range [0, 1000]
 * Maybe replace with [uuid](https://www.npmjs.com/package/uuid)
 */
export const generateId = (): number => Math.floor(Math.random() * 10000)

// use isEqual instead
// export const valueEquals

export const escapeRegexpString = (value = ''): string =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// Use native Array.find, Array.findIndex instead

// coerce truthy value to array
export const coerceTruthyValueToArray = castArray

export const isIE = function(): boolean {
  return !isServer && !isNaN(Number(document.DOCUMENT_NODE))
}

export const isEdge = function(): boolean {
  return !isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = function(): boolean {
  return (
    !isServer && !!window.navigator.userAgent.match(/firefox/i)
  )
}

export const autoprefixer = function(style: CSSStyleDeclaration): CSSStyleDeclaration {
  if (typeof style !== 'object') return style
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach(rule => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

export const kebabCase = hyphenate

// reexport from lodash
export {
  isEmpty,
  isEqual,
  isObject,
  capitalize,
  camelize,
  looseEqual,
  extend,
}

export function rafThrottle<T extends AnyFunction<any>>(fn: T): AnyFunction<void> {
  let locked = false
  return function(...args: any[]) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export const objToArray = castArray

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

export { isVNode } from 'vue'
