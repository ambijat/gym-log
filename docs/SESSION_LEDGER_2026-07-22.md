# Session Ledger — 2026-07-22

A tamper-evident, append-only record of everything done in this working session on the `gym-log` repository. Modeled on a blockchain ledger: every block's hash is a SHA-256 digest of *(previous block's hash + this block's timestamp + event description + artifact digest)*, so altering or reordering any entry breaks every hash after it. Artifact digests are real `sha256sum` values of the actual files touched — you can re-verify any of them yourself (commands below).

This is a **local, single-writer log**, not a distributed/consensus blockchain — the "chain" property here is just hash-linking for integrity, the same primitive Git commits and blockchains both build on.

```
GENESIS = SHA256("GYM-LOG-SESSION-GENESIS|2026-07-22|audit-start")
        = 65667fdddf1b9b85e587991277d561b7654954e6489910baeeda03a6971aa3c1
```

---

### Block 1 — 2026-07-22 06:58:57 IST
**Event**: Repository audit completed and written to `docs/PROJECT_AUDIT.md`.
**Artifact SHA-256**: `73531cea0a36aa04298dbcf17a4a0e1ef4da734708574815ac0dd68482cdd3e6`
**prev_hash**: `65667fdddf1b9b85e587991277d561b7654954e6489910baeeda03a6971aa3c1`
**block_hash**: `56b2f2db4917e83bc27d3c5a8788dea89af51c0ee91b59e9cc6fca207067c2ed`

### Block 2 — 2026-07-22 ~06:59 IST
**Event**: User reported a Google Play Console warning: target API level non-compliant (`targetSdkVersion 35` < required `36`), deadline 31 Aug 2026.
**Artifact SHA-256**: `-` (no file; external notice)
**prev_hash**: `56b2f2db4917e83bc27d3c5a8788dea89af51c0ee91b59e9cc6fca207067c2ed`
**block_hash**: `5ecd0731244c8949d025f513e9b371bd418cf3043d0a84ca1c077e6fdf8ef1ad`

### Block 3 — 2026-07-22 07:00:51 IST
**Event**: `app/build.gradle` edited — `targetSdkVersion 35→36`, `versionCode 10→11`, `versionName "1.8"→"1.9"`.
**Artifact SHA-256**: `4abea970974caad90895b868fa0aae71581b01bd8bd6559be32fa2c8b9c24cf7`
**prev_hash**: `5ecd0731244c8949d025f513e9b371bd418cf3043d0a84ca1c077e6fdf8ef1ad`
**block_hash**: `66e877dfd81a6a5521ccbb4f9fa1cade410da2f401659b8e77a99d7955a1800b`

### Block 4 — 2026-07-22 07:01:10 IST
**Event**: `twa-manifest.json` edited — `appVersionCode 10→11`, `appVersionName "1.8"→"1.9"` (a speculative `targetSdkVersion` field was briefly added, then reverted in the same turn once it was confirmed Bubblewrap's schema doesn't consume that field from this file).
**Artifact SHA-256**: `30d9bce7a73d9a394441cad5645a33b72d552da6743437ead86d9c11ce83d849`
**prev_hash**: `66e877dfd81a6a5521ccbb4f9fa1cade410da2f401659b8e77a99d7955a1800b`
**block_hash**: `737ac102dd7514d986e0c9c5abe792ab7ebf3d3cb016d63b4f9a35d669a08191`

### Block 5 — 2026-07-22 07:02:34 IST
**Event**: Local build executed: `gradlew clean :app:assembleDebug :app:assembleRelease :app:bundleRelease` → **BUILD SUCCESSFUL**. `app-debug.apk` produced.
**Artifact SHA-256**: `96f93ddfdbf5a7ea7664984c9ffceeeaa5bfbd700873926e7037eca047f5a0fe`
**prev_hash**: `737ac102dd7514d986e0c9c5abe792ab7ebf3d3cb016d63b4f9a35d669a08191`
**block_hash**: `933601dfa0d67c2faa40b4f5fe6d534bfe88c796492c4ea6e0446985072be259`

### Block 6 — 2026-07-22 07:02:42 IST
**Event**: Build artifact produced: `app-release-unsigned.apk`.
**Artifact SHA-256**: `55c4e7a907c802f1dd81057a16f55bb880d50a6b46cfa5909781e99d6a38664b`
**prev_hash**: `933601dfa0d67c2faa40b4f5fe6d534bfe88c796492c4ea6e0446985072be259`
**block_hash**: `69291ccd928ef5c53aff332943a788275e4bd862b7ed963e93d020a682f56941`

### Block 7 — 2026-07-22 07:02:43 IST
**Event**: Build artifact produced: `app-release.aab` (unsigned release bundle).
**Artifact SHA-256**: `1146b557215ce1e7549d4cfb8b7b6fef93c3a4d6b379f087950dbb3064fc8cfe`
**prev_hash**: `69291ccd928ef5c53aff332943a788275e4bd862b7ed963e93d020a682f56941`
**block_hash**: `1c222af333bb36e01eedda480d05b6e6ef5bf268793f42609121a5e3d300b419`

### Block 8 — 2026-07-22 ~07:03 IST
**Event**: `aapt2 dump badging` verification on the built APK confirmed `versionCode='11' versionName='1.9' targetSdkVersion='36' minSdkVersion='21'`.
**Artifact SHA-256**: `-` (verification event, no new file)
**prev_hash**: `1c222af333bb36e01eedda480d05b6e6ef5bf268793f42609121a5e3d300b419`
**block_hash**: `724932219b6fe1fc4929e3bef91a6abf26cfeafa6257e53cdf7f5fffec600f9f`

### Block 9 — 2026-07-22 07:12:59 IST
**Event**: User signed the release bundle locally via `jarsigner` with `android.keystore` / alias `gymlogkey` (password entered by the user directly in their own terminal — never transmitted to or handled by the assistant) → `app-release-signed.aab`.
**Artifact SHA-256**: `9e99125b6b758d75de463c664a4b411ad2394b85a081c2c95e80a74ed16bf845`
**prev_hash**: `724932219b6fe1fc4929e3bef91a6abf26cfeafa6257e53cdf7f5fffec600f9f`
**block_hash**: `62a492a6b06fd32f1d94130c3204b283b7c2cfe0ae0e315c535243cb7810a18b`

### Block 10 — 2026-07-22 ~07:13 IST
**Event**: Signature verified: `jarsigner -verify` → `jar verified.` (self-signed-certificate and no-timestamp-authority warnings are expected and benign for a local upload key).
**Artifact SHA-256**: `9e99125b6b758d75de463c664a4b411ad2394b85a081c2c95e80a74ed16bf845`
**prev_hash**: `62a492a6b06fd32f1d94130c3204b283b7c2cfe0ae0e315c535243cb7810a18b`
**block_hash**: `9577669788d1acc98d1356a66e7fb4dea02ad5522d5072e29dd1409033ce8344`

### Block 11 — 2026-07-22 ~07:15 IST
**Event**: Release note drafted for the Play Console internal testing release (v1.9 / versionCode 11): *"Under-the-hood update to keep the app compliant with the latest Android platform requirements. No changes to how the app looks or works."*
**Artifact SHA-256**: `-`
**prev_hash**: `9577669788d1acc98d1356a66e7fb4dea02ad5522d5072e29dd1409033ce8344`
**block_hash (HEAD)**: `4fd056bb522ff0e8285c94a7b00d7be7c2ab2eb922775d0045b35b72f4d4012b`

---

## Pending (not yet in this ledger)

- Upload of `app/build/outputs/bundle/release/app-release-signed.aab` to Google Play Console.
- Rollout to the internal testing track.
- Play Console's re-scan confirming the target-API warning is cleared.
- Commit of `app/build.gradle`, `twa-manifest.json`, `docs/PROJECT_AUDIT.md`, and this ledger to git (currently uncommitted working-tree changes — see `git status`).

## How to re-verify this ledger yourself

```bash
# Recompute any artifact digest and compare to the block above:
sha256sum app/build.gradle twa-manifest.json docs/PROJECT_AUDIT.md \
  app/build/outputs/apk/debug/app-debug.apk \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  app/build/outputs/bundle/release/app-release.aab \
  app/build/outputs/bundle/release/app-release-signed.aab
```

If any digest above doesn't match a file's current `sha256sum`, that file changed after this ledger was written — expected once you rebuild, sign again, or commit.

## What was *not* touched by the assistant

- The keystore password — entered by the user only, in their own terminal, in Block 9.
- `android.keystore` and `local.properties` — never read, copied, or transmitted; both remain git-ignored.
- No `git commit`, `git push`, or Play Console upload was performed on the user's behalf — those remain manual, explicit user actions.
