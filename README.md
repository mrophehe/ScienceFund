# ScienceFund - Decentralized Crowdfunding for Research

ScienceFund is a decentralized platform that connects researchers with blockchain-powered funding, enabling transparent progress tracking and secure smart contract-based payments.

## Features

- 🔬 **Research Project Funding**: Scientists can create and manage research projects
- 💰 **Secure Payments**: Blockchain-based funding using Base network
- 📊 **Progress Tracking**: Transparent milestone verification through Screenpipe
- 👥 **Community Engagement**: Direct connection between researchers and contributors
- 🔐 **Web3 Integration**: Seamless wallet connection with MetaMask, WalletConnect, and Coinbase Wallet

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Web3**: Wagmi, Viem
- **Styling**: Framer Motion, Lucide Icons
- **Charts**: Recharts
- **Build Tool**: Vite

## Requirements

### System Requirements

- Node.js 18.0.0 or later
- npm 7.0.0 or later
- Modern web browser with Web3 wallet support

### Smart Contract Requirements

- Base Goerli testnet for development
- MetaMask, WalletConnect, or Coinbase Wallet
- Test ETH for transactions (available from Base Goerli faucet)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sciencefund.git
cd sciencefund
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your WalletConnect project ID:
```
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

4. Start the development server:
```bash
npm run dev
```

## Smart Contract Integration

### Contract Functions

1. Project Creation
```solidity
function createProject(
    string memory title,
    string memory description,
    uint256 fundingGoal,
    uint256 deadline
) external returns (uint256);
```

2. Project Funding
```solidity
function fundProject(uint256 projectId) external payable;
```

3. Milestone Verification
```solidity
function verifyMilestone(
    uint256 projectId,
    uint256 milestoneId
) external;
```

### Blockchain Features

- **Smart Contract Security**: Escrow system for funds
- **Milestone-based Releases**: Automatic fund distribution upon verification
- **Refund Mechanism**: Return of funds if project goals aren't met
- **Transaction Verification**: On-chain proof of contributions
- **Event Logging**: Transparent activity tracking

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── lib/           # Utility functions and configurations
│   ├── blockchain.ts    # Web3 integration
│   ├── contracts/      # Smart contract ABIs
│   └── wallet.ts       # Wallet configuration
├── pages/         # Application pages/routes
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## Key Components

### Project Creation
- Detailed project proposal submission
- Milestone definition and timeline
- Funding goal setting
- Research category classification

### Funding System
- Smart contract-based escrow
- Milestone-triggered fund releases
- Contribution tracking
- Refund mechanisms

### Progress Tracking
- Milestone verification through Screenpipe
- Progress updates and reporting
- Contribution history
- Project analytics

### User Profiles
- Researcher verification
- Contribution history
- Project portfolio
- Institution affiliation

### Dashboard
- Project management
- Funding analytics
- Milestone tracking
- Contribution overview

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain comprehensive test coverage

### Web3 Integration
- Handle wallet connection states
- Implement proper error handling for transactions
- Cache transaction results
- Support multiple wallet providers

### Security Considerations
- Implement proper input validation
- Handle transaction failures gracefully
- Protect against common Web3 vulnerabilities
- Secure storage of sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Check test coverage
npm run test:coverage
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to production:
```bash
npm run deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.