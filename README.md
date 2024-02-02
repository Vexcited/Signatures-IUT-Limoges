# Wrapper for IUT Signatures (Limoges)

Fetch your averages for each semester of the IUT (University Institute of Technology) of Limoges in a very simple way.

Note that this module is **only usable for students of the IUT of Limoges**, and that is because you need to authenticate using your [Biome (UNILIM)](https://biome.unilim.fr) credentials.

## Installation

You can use whatever package manager you want, here are some examples.

```bash
# NPM
npm install signatures-iut-limoges

# Yarn
yarn add signatures-iut-limoges

# pnpm
pnpm add signatures-iut-limoges
```

## Important note

### `readSignaturesPage()`

When you're using this function, you **must** be connected to the University's VPN or the Eduroam network.

Since you might have SSL issues due to self-signed certificate (only when the website is not publicly available), you have to use `process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";` on Node.js to avoid errors.

If you want to avoid doing this, you'd have to import yourself the certificate in your project and Node.

If you don't want to import the certificate AND/OR you're not using the VPN/Eduroam network, you **should** look into the Web VPN method below.

If you're a student and want to learn more about the University's VPN, you can read [this article from Unilim support](https://support.unilim.fr/reseau/acces-vpn/service-vpn-de-luniversite-de-limoges-2/) - you have to be logged in to read it.

### `readSignaturesPageFromWebVPN()`

There's no need for the machine to be connected to either the VPN or the Eduroam network.
You just run this function and it works out of the box.

The only constraint is that three more requests are done in the process to login to the University's Web VPN.

If you're a student and want to learn more about the University's Web VPN, you can read [this article from Unilim support](https://support.unilim.fr/reseau/acces-vpn/portail-web-vpn/) - you have to be logged in to read it.

## Usage

```typescript
// If you're on the VPN/Eduroam network
import { readSignaturesPage } from "signatures-iut-limoges";
// or if you want to use the Web VPN
import { readSignaturesPageFromWebVPN } from "signatures-iut-limoges";

const html = await readSignaturesPage("username", "password");
// or if you want to use the Web VPN
const html = await readSignaturesPageFromWebVPN("username", "password");

// Now, we have to dump the HTML into something readable.
import { dumpSignatureResponse } from "signatures-iut-limoges";
const dump = dumpSignatureResponse(html);

// Do whatever you want with the dump !
console.log(dump);
```

Example usage of this can be found in the [`example` directory](./example/).

## Output

Return type of `dumpSignatureResponse` is `SignaturesDump`, let's see what you can do with this.

Note that everything written below is just extracted for the source code itself, you can look at the types directly here: [types.ts](./src/types.ts).

```typescript
interface SignaturesDump {
  firstName: string
  familyName: string
  className: string
  semesters: Array<SignaturesSemesterDump>
}

interface SignaturesSemesterDump {
  shortName: string
  name: string
  skills: Array<SignaturesSkillDump>
}

interface SignaturesSkillDump {
  id: string
  name: string
  globalAverage: number
  absences: number
  coefficient: number
  modules: Array<SignaturesModuleDump>
}

interface SignaturesModuleDump {
  id: string
  name: string
  average: number
  absences: number
  coefficient: number
}
```

You might have to use IntelliSense to have accurate description (JSDoc) about the types, or just read the code of types as mentioned previously.
