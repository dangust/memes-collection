// sync-ed from root via `tr sync-refs`
import { ConnectedWallet } from "@terra-money/wallet-provider"

const config = require('../refs.terrain.json')

export const contractAddress = (wallet:ConnectedWallet) => config[wallet.network.name]['cw721-metadata-onchain'].contractAddresses.default
