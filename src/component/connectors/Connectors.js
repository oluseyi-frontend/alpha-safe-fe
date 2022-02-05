import Metamask from "./WalletIcons/metamask-fox.svg";
// import Coin98 from "./WalletIcons/coin98.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";
// import MathWallet from "./WalletIcons/mathWallet.svg";
// import TokenPocket from "./WalletIcons/tokenPocket.svg";
// import SafePal from "./WalletIcons/safePal.svg";
// import TrustWallet from "./WalletIcons/trustWallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
//   {
//     title: "Trust Wallet",
//     icon: TrustWallet,
//     connectorId: "injected",
//     priority: 3,
//   },
//   {
//     title: "MathWallet",
//     icon: MathWallet,
//     connectorId: "injected",
//     priority: 999,
//   },
//   {
//     title: "TokenPocket",
//     icon: TokenPocket,
//     connectorId: "injected",
//     priority: 999,
//   },
//   {
//     title: "SafePal",
//     icon: SafePal,
//     connectorId: "injected",
//     priority: 999,
//   },
//   {
//     title: "Coin98",
//     icon: Coin98,
//     connectorId: "injected",
//     priority: 999,
//   },
];
