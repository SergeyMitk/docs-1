---
description: A guide to Arabica devnet.
---

# Arabica devnet

![arabica-devnet](/img/arabica-devnet.png)

Arabica devnet is a new testnet from Celestia Labs that is focused
exclusively on providing developers with enhanced performance and
the latest upgrades for testing their rollups and applications.

Arabica does not focus on validator or consensus-level testing, rather,
that is what Mocha testnet is used for. If you are a validator, we
recommend testing your validator operations on the
[Mocha testnet](./mocha-testnet.md).

With Arabica having the latest updates from all Celestia's products deployed
on it, it can be subject to many changes. Therefore, as a fair warning,
Arabica can break unexpectedly but given it will be continuously updated,
it is a useful way to keep testing the latest changes in the software.

Developers can still deploy on Mocha testnet their sovereign rollups if they
chose to do so, it just will always lag behind Arabica devnet until Mocha
undergoes Hardfork Upgrades in coordination with Validators.

## Software version numbers

<!-- markdownlint-disable MD033 -->
<script setup>
import ArabicaVersionTags from '../.vitepress/components/ArabicaVersionTags.vue'
</script>

<ArabicaVersionTags/>

## Integrations

This guide contains the relevant sections for how to connect to Arabica,
depending on the type of node you are running.

Your best approach to participating is to first determine which node
you would like to run. Each node's guide will link to the relevant networks
in order to show you how to connect to them.

You have a list of options on the type of nodes you can run in order to
participate in Arabica:

Data Availability:

- [Bridge node](./bridge-node.md)
- [Full storage node](./full-storage-node.md)
- [Light node](./light-node.md)

Select the type of node you would like to run and follow the instructions
on each respective page. Whenever you are asked to select the type of network
you want to connect to in those guides, select `Arabica` in order to refer
to the correct instructions on this page on how to connect to Arabica.

## RPC endpoints

The RPC endpoint is to allow users to interact with Celestia's nodes by
querying the node's state and broadcasting transactions on the
Celestia network. The default port is 26657.

Below is a list of RPC endpoints you can use to connect to Arabica devnet:

### Bridge, full, and light nodes

- `consensus-validator.celestia-arabica-10.com`
- `validator.consensus.celestia-arabica-10.com`
- `consensus-full.celestia-arabica-10.com`

### Full and light nodes ONLY

These RPC endpoints do not allow you to download full blocks from
them. We advise that if you are running a bridge node, that you also
run a local [full consensus node](./consensus-node.md) in order to download
full blocks from it.

- `rpc.consensus.celestia-arabica-10.com`
- `rpc-2.consensus.celestia-arabica-10.com`

## API endpoints

The API endpoint is to allow users to interact with the REST API in Cosmos
SDK which is implemented using gRPC-gateway, which exposes gRPC endpoints
as REST endpoints. This allows for communication with the node using REST
calls, which can be useful if the client does not support gRPC or HTTP2.
The default port is 1317.

- [https://api.consensus.celestia-arabica-10.com/](https://api.consensus.celestia-arabica-10.com/)
- [https://api-2.consensus.celestia-arabica-10.com/](https://api-2.consensus.celestia-arabica-10.com/)

## gRPC endpoints

The gRPC endpoint is to allow users to interact with a Celestia Node using
gRPC, a modern open-source and high-performance RPC framework. The default
port is 9090. In the Cosmos SDK, gRPC is used to define state queries and
broadcast transactions.

- `grpc.consensus.celestia-arabica-10.com:443`
- `grpc-2.consensus.celestia-arabica-10.com:443`
- `validator.consensus.celestia-arabica-10.com:9090`
- `consensus-validator.celestia-arabica-10.com:9090`

## Arabica devnet faucet

:::danger WARNING
USING THIS FAUCET DOES NOT ENTITLE YOU TO ANY AIRDROP OR OTHER DISTRIBUTION OF
MAINNET CELESTIA TOKENS. THERE ARE NO PUBLIC SALES OF ANY MAINNET CELESTIA
TOKENS.
:::

### Discord

You can request from Arabica devnet Faucet on the #arabica-faucet channel on
Celestia's Discord server with the following command:

```text
$request <CELESTIA-ADDRESS>
```

Where `<CELESTIA-ADDRESS>` is a `celestia1******` generated address.

:::tip NOTE
Faucet has a limit of 10 tokens per week per address/Discord ID.
:::

### Web

The web faucet is available at [https://faucet.celestia-arabica-10.com/](https://faucet.celestia-arabica-10.com/).

## Explorers

There are multiple explorers you can use for Arabica:

- [https://explorer.celestia-arabica-10.com](https://explorer.celestia-arabica-10.com)
- [https://celestiascan.com](https://celestiascan.com)

## Network upgrades

Join our [Telegram announcement channel](https://t.me/+smSFIA7XXLU4MjJh)
for network upgrades.
