import { createConfig, configureChains } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { QueryClient } from '@tanstack/react-query';

const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'default-project-id';

export const configureClient = () => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [baseGoerli],
    [publicProvider()]
  );

  const queryClient = new QueryClient();

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'Decentralized Science Funding',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: walletConnectProjectId,
          showQrModal: true,
        },
      }),
    ],
  });

  return { config, queryClient };
};