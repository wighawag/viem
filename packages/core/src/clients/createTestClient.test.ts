import { assertType, describe, expect, test, vi } from 'vitest'

import { createTestClient } from './createTestClient'
import { createTransport } from './transports/createTransport'
import { http } from './transports/http'
import { local } from '../chains'
import type { TestRequests } from '../types/eip1193'
import { webSocket } from './transports/webSocket'

const mockTransport = createTransport({
  key: 'mock',
  name: 'Mock Transport',
  request: vi.fn(() => null) as any,
  type: 'mock',
})

test('creates', () => {
  const { uid, ...client } = createTestClient(mockTransport, { key: 'anvil' })

  assertType<TestRequests<'anvil'>['request']>(client.request)
  expect(uid).toBeDefined()
  expect(client).toMatchInlineSnapshot(`
    {
      "key": "anvil",
      "name": "Test Client",
      "pollingInterval": 4000,
      "request": [Function],
      "transport": {
        "key": "mock",
        "name": "Mock Transport",
        "request": [MockFunction spy],
        "type": "mock",
      },
      "type": "testClient",
    }
  `)
})

describe('transports', () => {
  test('http', () => {
    const { uid, ...client } = createTestClient(http({ chain: local }), {
      key: 'anvil',
    })

    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "key": "anvil",
        "name": "Test Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "chain": {
            "blockTime": 1000,
            "id": 1337,
            "name": "Localhost",
            "network": "localhost",
            "rpcUrls": {
              "default": {
                "http": "http://127.0.0.1:8545",
                "webSocket": "ws://127.0.0.1:8545",
              },
              "local": {
                "http": "http://127.0.0.1:8545",
                "webSocket": "ws://127.0.0.1:8545",
              },
            },
          },
          "key": "http",
          "name": "HTTP JSON-RPC",
          "request": [Function],
          "type": "http",
          "url": "http://127.0.0.1:8545",
        },
        "type": "testClient",
      }
    `)
  })

  test('webSocket', () => {
    const { uid, ...client } = createTestClient(webSocket({ chain: local }), {
      key: 'anvil',
    })

    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "key": "anvil",
        "name": "Test Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "chain": {
            "blockTime": 1000,
            "id": 1337,
            "name": "Localhost",
            "network": "localhost",
            "rpcUrls": {
              "default": {
                "http": "http://127.0.0.1:8545",
                "webSocket": "ws://127.0.0.1:8545",
              },
              "local": {
                "http": "http://127.0.0.1:8545",
                "webSocket": "ws://127.0.0.1:8545",
              },
            },
          },
          "getSocket": [Function],
          "key": "webSocket",
          "name": "WebSocket JSON-RPC",
          "request": [Function],
          "subscribe": [Function],
          "type": "webSocket",
        },
        "type": "testClient",
      }
    `)
  })
})