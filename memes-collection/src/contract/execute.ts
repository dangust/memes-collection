import { Fee, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import { ConnectedWallet } from '@terra-money/wallet-provider'
import { contractAddress } from './address'

// ==== utils ====

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const until = Date.now() + 1000 * 60 * 60
const untilInterval = Date.now() + 1000 * 60

const _exec =
  (msg: any, fee = new Fee(200000, { uluna: 10000 })) =>
  async (wallet: ConnectedWallet) => {
    const lcd = new LCDClient({
      URL: wallet.network.lcd,
      chainID: wallet.network.chainID,
    })

    const { result } = await wallet.post({
      fee,
      msgs: [new MsgExecuteContract(wallet.walletAddress, contractAddress(wallet), msg)],
    })

    while (true) {
      try {
        return await lcd.tx.txInfo(result.txhash)
      } catch (e) {
        if (Date.now() < untilInterval) {
          await sleep(500)
        } else if (Date.now() < until) {
          await sleep(1000 * 10)
        } else {
          throw new Error(
            `Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`,
          )
        }
      }
    }
  }

// ==== execute contract ====

export const mint = async (
  wallet: ConnectedWallet,
  token_id: string,
  owner_address: string,
  nft_name: string,
  image_url: string,
) =>
  _exec({
    mint: {
      owner: owner_address,
      token_id: token_id,
      extension: {
        name: nft_name,
        image: image_url,
      },
    },
  })(wallet)
