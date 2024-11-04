# SolanaBond

SolanaBond is a decentralized finance (DeFi) application built on the Solana blockchain that enables users to create and manage bonds. It utilizes the Wormhole protocol to facilitate cross-chain interactions, providing a secure and efficient way to manage financial assets.

## The architecture of the application

![SolanaBond](https://github.com/user-attachments/assets/650bb42e-8880-487a-8fda-bf1a9034de15)


## Features

- Create and manage bonds on the Solana blockchain
- Cross-chain capabilities via Wormhole
- User-friendly interface for bond management

## Technologies Used

- **Rust** for Solana smart contracts
- **TypeScript** for frontend development
- **Solidity** for Arbitrum smart contracts

## Getting Started

### Prerequisites

- Rust and Cargo installed
- Node.js (v23.1.0) and npm (v10.9.0) installed
- anchor-cli 0.30.1 installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DogukanGun/SolanaBond.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SolanaBond
   ```
3. Install client dependencies:
   ```bash
   nvm use # optional for node version manager users
   npm install
   ```
4. Build the program:
    ```bash
    anchor build
    ```

### Running the Project


1. Go to the application, use:
```bash
cd app
```
2. Install dependencies:
   ```bash
   npm install
   ```

3. To run the application, use:
```bash
npm run dev
```

### Development

To run cargo tests (rustc cargo versions v1.82.0) use:
```bash
cargo test
```

## Contributing

Contributions are welcome! Please create a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
