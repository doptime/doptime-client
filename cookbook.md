# Doptime Client Cookbook

**Package:** `doptime-client`
**Role:** TypeScript/JavaScript library for direct Redis interaction via HTTP.
**Registry:** `npm install doptime-client`
**Core Pattern:** `new KeyClass<T>(keyName).method(...)`.

## 0\. Installation & Types

**Command:**

```bash
npm install doptime-client
```

**TypeScript Support:** Built-in. No `@types/doptime-client` needed.

## 1\. Initialization

**Global Config:** Must run before any requests.
**Source:** `Option.ts`, `index.ts`

```typescript
import { OptDefaults } from "doptime-client";

OptDefaults({
    urlBase: "https://api.myapp.com", // Backend URL
    token: "jwt_token",               // Auto-adds 'Bearer '
    primaryErrorHandler: (err) => {   // Handle 401/403
        if (err.response?.status === 401) location.href = "/login";
    },
    allowThrowError: false            // Suppress secondary promise errors
});
```

## 2\. Data Access (Key Classes)

**Rule:** Instantiate specific classes. Do not use global CRUD functions.

### 2.1 HashKey (Objects)

**Source:** `hashkey.ts`

```typescript
import { hashKey } from "doptime-client";

// Key: "user:1001"
const user = new hashKey<User>("user:1001"); 

// Core Methods
await user.hSet("name", "Alex");             // Set field
const val = await user.hGet("name");         // Get field
const all = await user.hGetAll();            // Get all fields as object
await user.hMSet({ theme: "dark", v: 1 });   // Batch set
await user.hIncrBy("login_count", 1);        // Increment Int
```

### 2.2 ListKey (Queues)

**Source:** `listKey.ts`

```typescript
import { listKey } from "doptime-client";

const queue = new listKey<string>("task:queue");
await queue.lPush("job1");             // Push Head
const item = await queue.rPop();       // Pop Tail
const items = await queue.lRange(0, -1); // Get Range
```

### 2.3 ZSetKey (Sorted Sets)

**Source:** `zSetKey.ts`

```typescript
import { zSetKey } from "doptime-client";

const leaderboard = new zSetKey<string>("game:rank");
await leaderboard.zAdd(100, "player1");       // Add/Update Score
// Get Top 10: [member, score, member, score...]
const top10 = await leaderboard.zRevRange(0, 9, true);
```

### 2.4 StringKey (Simple KV)

**Source:** `stringKey.ts`

```typescript
import { stringKey } from "doptime-client";

const config = new stringKey<string>("site:mode");
await config.set("", "maintenance"); // Field arg defaults to ""
const val = await config.get(""); 
```

### 2.5 SetKey (Unique) & StreamKey (Logs)

**Source:** `setKeys.ts`, `streamKey.ts`

```typescript
import { setKey, streamKey } from "doptime-client";

const tags = new setKey<string>("tags");
const exists = await tags.sIsMember("tech");

const logs = new streamKey<any>("logs");
await logs.xAdd("", "*", { evt: "login" });
```

## 3\. Asset Serving (Classic Use Case)

**Concept:** Do not fetch binary data to JS. Instead, generate a URL pointing to the Redis HGET endpoint and let the browser load it (Image/Audio/Video).
**Source:** `index.ts`, `Option.ts`

```typescript
import { urlGet, Opt } from "doptime-client";

// Scenario: "user:1001" hash has a field "avatar" containing binary image data.

// 1. Generate URL (e.g., https://api.site/HGET-user:1001?f=avatar&rt=image/jpeg)
const avatarUrl = urlGet(
    undefined,               // Default CMD: HGET
    "user:1001",             // Key
    "avatar",                // Field
    Opt.WithResponseAsJpeg() // Content-Type: image/jpeg
);

// 2. Use directly in JSX/HTML
// <img src={avatarUrl} alt="User Avatar" />
```

**Supported Content Types:**

  * `Opt.WithResponseAsJpeg()`
  * `Opt.WithResponseAsOgg()` (Audio)
  * `Opt.WithResponseAsMp4()` (Video)
  * `Opt.WithResponseAsJson()` (Default)

## 4\. Backend RPC (API)

**Source:** `api.ts`

```typescript
import { createApi } from "doptime-client";

type In = { id: string };
type Out = { status: string };

// Create Caller for "api:process"
const callProcess = createApi<In, Out>("api:process");
const res = await callProcess({ id: "123" });
```

## 5\. Utilities & Options

**Source:** `index.ts`, `Option.ts`

```typescript
import { del, expire, time, Opt } from "doptime-client";

// Global Utils
await del("key1");          // Delete
await expire("key1", 60);   // TTL
const now = await time();   // Server Time

// Per-Request Options (Pass as last arg)
import { hashKey } from "doptime-client";
const k = new hashKey("data");

// Target specific DataSource (backend config)
await k.hGetAll(Opt.WithDataSource("cache_db"));
// Custom Headers
await k.hGet("f", Opt.WithHeader("X-Trace", "1"));
```

## 6\. Helper: Key Concatenation

**Source:** `concatKey.ts`

```typescript
const user = new hashKey("user");
// Creates instance for "user:1001:settings" safely
const settings = user.ConcatKey("1001", "settings");
```

-----

## 7\. AI Generation Rules (Meta-Instructions)

1.  **Asset URLs:** When handling images/audio stored in DB, ALWAYS use `urlGet` + `Opt.WithResponseAs...` to generate a URL string, never `hGet` the binary blob into JS memory.
2.  **Imports:** Always import specific classes (`hashKey`) from `doptime-client`.
3.  **Instantiation:** Always use `new ClassName<T>(key)`.
4.  **Strings Only:** Never use Integers as Redis Keys. JS floats corrupt large integers. Use `"12345"` not `12345`.
5.  **Naming:** Aliases `hKey`, `lKey` are available, but full names (`hashKey`) are preferred.