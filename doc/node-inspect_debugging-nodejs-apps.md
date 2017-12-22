## TypeError [ERR_INVALID_ARG_TYPE]: The "digest" argument must be one of type string or null at _pbkdf2 (internal/crypto/pbkdf2.js)


$ gulp serve

```
internal/crypto/pbkdf2.js:35
    throw new errors.TypeError('ERR_INVALID_ARG_TYPE', 'digest',
    ^

TypeError [ERR_INVALID_ARG_TYPE]: The "digest" argument must be one of type string or null
    at _pbkdf2 (internal/crypto/pbkdf2.js:35:11)
    at Object.pbkdf2 (internal/crypto/pbkdf2.js:25:10)
    at model.encryptPassword (/home/bike/github/WikiCloth/server/api/user/user.model.js:247:19)
    at /home/bike/github/WikiCloth/server/api/user/user.model.js:146:12
    at RandomBytes.ondone (/home/bike/github/WikiCloth/server/api/user/user.model.js:216:9)

```

## Solution:
Modify `crypto.pbkdf2()` to the following:
```
// Provides a synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
// <https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest>
return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
       .toString('hex');


// Provides an asynchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
// <https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback>
return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err, key) => {
  if (err) {
    return callback(err);
  } else {
    return callback(null, key.toString('hex'));
  }
});


```


