# Doptime Client Context

**Library:** `doptime-client` (Redis via HTTP)
**Pattern:** `new KeyClass<T>(keyName).method(...)`

## 0. Setup

```bash
npm install doptime-client

```

## 1. Initialization

**Must run before requests.**

```typescript
import { configure } from "doptime-client";

configure({
    urlBase:  "https://api.myapp.com",
    // Token: Static string OR Async Function (resolved once at init)
    token: async () => await fetchToken(), 
    // Global Error Handler (e.g., 401 Redirect)
    primaryErrorHandler: (err) => { if (err.response?.status === 401) location.href = "/login"; },
    allowThrowError: false
});


```

## 2. Key Classes (Data Access)

### HashKey (Objects)

```typescript
import { hashKey } from "doptime-client";
interface User { name: string; age: number; theme?: string }

const user = new hashKey<User>("user:1001");     // Key: "user:1001"

// hSet returns the data object (T) that was set
const savedData = await user.hSet("name", "Alex"); 

const val = await user.hGet("name");             // Get field
const all = await user.hGetAll();                // Get all fields

// hMSet takes an array of objects and returns the keys (string[]) added/updated
const keys = await user.hMSet([{ theme: "dark", age: 30 }]);

await user.hIncrBy("login_count", 1);


```

### ListKey (Queues)

```typescript
import { listKey } from "doptime-client";

const queue = new listKey<string>("task:queue");
await queue.lPush("job1");               // Push Head
const item = await queue.rPop();         // Pop Tail
const items = await queue.lRange(0, -1); // Get All


```

### ZSetKey (Leaderboards)

```typescript
import { zSetKey } from "doptime-client";

const lb = new zSetKey<string>("game:rank");
await lb.zAdd(100, "player1");
const top10 = await lb.zRevRange(0, 9, true); // [val, score, val, score...]


```

### StringKey (Simple KV)

```typescript
import { stringKey } from "doptime-client";

const config = new stringKey<string>("site:mode");
await config.set("", "maintenance"); // Field defaults to ""
const val = await config.get("");


```

### SetKey & StreamKey

```typescript
import { setKey, streamKey } from "doptime-client";

// Set
const tags = new setKey<string>("tags");
await tags.sIsMember("tech");

// Stream
const logs = new streamKey<any>("logs");
await logs.xAdd("", "*", { evt: "login" });


```

## 3. Assets (Images/Media)

**Pattern:** Generate URL, do not fetch binary to JS.

```typescript
import { urlGet, Opt } from "doptime-client";

// 1. Generate URL (e.g., https://api.site/HGET-user:1001?f=avatar&rt=image/jpeg)
const url = urlGet(
    undefined,               // Default: HGET
    "user:1001",             // Key
    "avatar",                // Field
    Opt.WithResponseAsJpeg() // Header: image/jpeg
);
// 2. Use directly in JSX/HTML
// <img src={avatarUrl} alt="User Avatar" />

```

**Supported Content Types:**

* `Opt.WithResponseAsJpeg()`
* `Opt.WithResponseAsOgg()` (Audio)
* `Opt.WithResponseAsMp4()` (Video)
* `Opt.WithResponseAsJson()` (Default)

## 4. Backend RPC

```typescript
import { createApi } from "doptime-client";

// Define Types
type In = { id: string };
type Out = { status: string };

// Create Caller
const callProcess = createApi<In, Out>("api:process");

// Invoke
const res = await callProcess({ id: "123" });


```

## 5. Utilities & Key Namespacing

```typescript
import { del, expire, time, hashKey, Opt } from "doptime-client";

// Utils
await del("key1");
await expire("key1", 60); // seconds
const serverTime = await time();

const user = new hashKey("user");
// Namespacing: "user" -> "user:1001:settings"
const settings = user.ConcatKey("1001", "settings");

// Per-Request Options
await settings.hGetAll(Opt.WithDataSource("cache_db"));


```

## 6. Coding Directives (Strict)

1. **Binary Assets:** NEVER download blobs via `hGet`. ALWAYS use `urlGet` + `Opt.WithResponseAs...` to generate URLs for `<img>`/`<video>` tags.
2. **Instantiation:** Use `new ClassName<T>(key)`. Do not use global CRUD functions.
3. **Keys:** ALWAYS use Strings for IDs (`"12345"`), NEVER Integers (`12345`).
4. **Token:** If using `async` token in `configure`, note it resolves **once** at initialization.
5. **Imports:** Prefer named imports (`hashKey`, `listKey`) over aliases.
