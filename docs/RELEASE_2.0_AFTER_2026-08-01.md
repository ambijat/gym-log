# DS5 Workout Log 2.0 — Resume After Upload-Key Activation

Use this checklist on or after **1 August 2026 at 12:40:26 PM IST**
(07:10:26 UTC). Google Play will reject the new upload certificate before
that time.

## Release identity

- Package: `com.ambijat.gymlog`
- Version name: `2.0`
- Version code: `12`
- Release name: `2.0 (12) – Exercise Image Help`
- Source commit: `49be3de`
- Upload-certificate SHA-1:
  `78:DC:31:3D:58:B5:7D:A9:A9:38:B6:BD:BE:31:AF:87:10:9C:61:DB`
- Upload-certificate SHA-256:
  `39:8B:E6:4A:0C:ED:B9:C9:F6:8C:5B:37:B5:B0:14:20:7D:A1:3E:B8:76:BB:44:CB:13:10:82:16:2D:38:08:EF`

Version code `11` was already uploaded on 22 July 2026. Do not reuse it for
this release.

## Files that must remain local

- Private upload keystore:
  `/home/ambijat/.android/ds5-upload-2026.p12`
- Signed bundle:
  `app/build/outputs/bundle/release/app-release-signed.aab`

The keystore password is deliberately not recorded in this repository. Keep
it in the password manager. Never upload the `.p12` file to GitHub or Play
Console.

## 1. Open the project

```bash
cd /media/ambijat/FIGHTER/ANDROIDWORKS/gym-log
date
git status --short --branch
```

The upload must happen after the activation time above. The Git branch should
be clean and synchronized with `origin/main`.

## 2. Verify the existing signed bundle

```bash
/home/ambijat/android-studio/jbr/bin/jarsigner \
  -verify \
  app/build/outputs/bundle/release/app-release-signed.aab

/home/ambijat/android-studio/jbr/bin/keytool \
  -printcert \
  -jarfile app/build/outputs/bundle/release/app-release-signed.aab

sha256sum app/build/outputs/bundle/release/app-release-signed.aab
```

Expected results:

- `jar verified.`
- Signer SHA-1 matches the upload-certificate SHA-1 above.
- Bundle SHA-256:
  `91f1df90c7509e2a4ab0e167dc63167fb299f134cff7cc20cde5a8af896ba7c5`

Warnings that the certificate is self-signed, has no timestamp, or lacks a
trusted certificate chain are expected for the Play upload certificate.

## 3. Upload to Closed testing

1. Open Google Play Console and select **DS5 Workout Log**.
2. Go to **Test and release → Testing → Closed testing**.
3. Open the existing Exercise Image Help draft, or create a new release.
4. Remove any earlier failed upload row with its **X** button.
5. Upload:
   `app/build/outputs/bundle/release/app-release-signed.aab`
6. Confirm Play Console detects **version 2.0** and **version code 12**.
7. Use the release name:
   `2.0 (12) – Exercise Image Help`
8. Add the release notes below.
9. Select **Next**, review all warnings, and start the Closed-testing rollout.

Do not use **Add from library** to select version code `11`; that is the older
release.

## Release notes

```text
Added visual exercise guidance throughout the workout log.

• Exercise reference images are now available for 23 exercises.
• Long-press an exercise card to view a larger movement reference.
• Normal taps continue to log workouts instantly.
• Improved offline availability of exercise images.
• Refined image presentation and exercise coverage.
```

## 4. Confirm rollout

After submission, confirm that Play Console shows:

- Track: Closed testing
- Version: `2.0`
- Version code: `12`
- Status: available to testers, in review, or processing

Anyone enrolled in Internal testing must opt out of Internal testing before
joining Closed testing.

## If the signed AAB is missing

The `app/build/` directory is generated and can be removed by
`./gradlew clean`. Rebuild the bundle:

```bash
JAVA_HOME=/home/ambijat/android-studio/jbr \
ANDROID_HOME=/home/ambijat/Android/Sdk \
ANDROID_SDK_ROOT=/home/ambijat/Android/Sdk \
./gradlew :app:bundleRelease
```

Then sign it. This command prompts locally for the new keystore password:

```bash
/home/ambijat/android-studio/jbr/bin/jarsigner \
  -sigalg SHA256withRSA \
  -digestalg SHA-256 \
  -keystore /home/ambijat/.android/ds5-upload-2026.p12 \
  -signedjar app/build/outputs/bundle/release/app-release-signed.aab \
  app/build/outputs/bundle/release/app-release.aab \
  ds5upload2026
```

Repeat the verification in section 2 before uploading.

## Important cautions

- Upload only `app-release-signed.aab`.
- Do not upload `app-release.aab`; it is unsigned.
- Do not upload a `.der`, `.pem`, `.p12`, or keystore file as the app bundle.
- Do not delete the private `.p12` file or forget its password.
- Do not increment the version again unless Play Console reports that code
  `12` has already been used.
