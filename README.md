# Create a dApp to exchange ERC20 tokens
## 🤓 Quest objectives:
The objective of the quest is simple, to create one of these Ethereum wallets, at least to implement the main functions:

Consult his balance the balance of his Tokens; 📈
Send ERC20 tokens; ↗️
Instantiate and interact with an ERC20 smart contract. 👨‍💻

Some reminders on Web3Js and the equivalents on EthersJs
To instantiate a smart contract, ERC20 or another for that matter, on Web3JS, you have to do:

const contract = new Contract (abi, address)
The equivalent on EthersJs is this:

const contract = new ethers.Contract (address, abi, signerOrProvider)
If you only want to read the data from the smart contract, you have to add a provider.
In the case of writing to change the state of a smart contract, it is instantiated with a signer.

Then to send tokens with Web3Js, you must use this instruction

contract.methods.transfer (address, amount) .send ({from: account})
And the EthersJs version:

contract.transfer (address, amount)

----------------------------------------------------------------------------------------------------------
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
