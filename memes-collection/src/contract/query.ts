import { LCDClient } from '@terra-money/terra.js'
import { ConnectedWallet } from '@terra-money/wallet-provider'
import { contractAddress } from './address'

export type NftMetaDataType = {
  extension: {
    image?: string
    name?:string
  }
}

export const nft_info = async (wallet:ConnectedWallet, token_id: string):Promise<NftMetaDataType> =>   {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  })
  return lcd.wasm.contractQuery(contractAddress(wallet), {"nft_info": {"token_id": token_id}})
}
