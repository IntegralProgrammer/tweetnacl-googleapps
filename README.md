# tweetnacl-googleapps

Instructions for using the *tweetnacl.js* library with Google Apps Script.

## Notes

These instructions were tested on *Debian 9*.

## Building

Install the necessary *Debian* packages.

```bash
sudo apt install node-typedarray node-browserify-lite
```

Download the *tweetnacl.js* library.

```bash
git clone https://github.com/dchest/tweetnacl-js
```

Create a *build* directory and enter it.

```bash
mkdir build
cd build
```

Copy the file *nacl.js* into the build directory.

```bash
cp ../tweetnacl-js/nacl.js .
```

Copy the main file from the *typedarray* package into the build directory.

```bash
cp /usr/lib/nodejs/typedarray/index.js typedarray.js
```

Copy the file *exported_mods.js* from this repository into the build directory.

```bash
cp ../tweetnacl-googleapps/exported_mods.js .
```

Compile the module using *browserify-lite*

```bash
browserify-lite ./exported_mods.js --standalone libs --outfile bundle.js
```

Edit the file *nacl.js*. Below the line `// See for details: http://tweetnacl.cr.yp.to/`
add the following lines:

- `var Uint8Array = window.libs.Uint8Array;`
- `var Float64Array = window.libs.Float64Array;`
- `var Uint32Array = window.libs.Uint32Array;`

Replace the bottom line `})(typeof module !== 'undefined' && module.exports ? module.exports : (self.nacl = self.nacl || {}));`
with the line `})(libnacl);`.

Within your Google Apps Script project, create a new file named *bundle.gs* and
paste the contents from *bundle.js* into it.

Within your Google Apps Script project, create a new file named *tweetnacl.gs* and
paste the contents from *nacl.js* into it.

Within your Google Apps Script project, paste the contents from *example.js* as
an example of using the (Networking and Cryptography Library) NaCl within your
Google Apps Script programs.
