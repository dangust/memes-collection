import { Button } from '@mui/material'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import { FC, useState } from 'react'
import { BsFillMoonFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImSun } from 'react-icons/im'
import { MdClose } from 'react-icons/md'
import logo from '../assets/logo.png'

type Props = {
  changeTheme: () => void
  currentTheme: string
}

export const Navbar: FC<Props> = ({ changeTheme, currentTheme }) => {
  const [navState, setNavState] = useState(false)
  const { status, availableConnectTypes, availableInstallTypes, connect, install, disconnect } = useWallet()
  console.log('11111', status, availableInstallTypes)

  return (
    <nav>
      <div className="brand-container">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>
        <div className="toggle-container">
          <div className="toggle">
            {navState ? (
              <MdClose onClick={() => setNavState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavState(true)} />
            )}
          </div>
          <div className="mode" onClick={changeTheme}>
            {currentTheme === 'dark' ? <ImSun className="light" /> : <BsFillMoonFill className="dark" />}
          </div>
        </div>
      </div>
      <div className={`links-container ${navState ? 'nav-visible' : ''}`}>
        <ul className="links">
          <li>
            <a href="#features">Home</a>
          </li>
          <li>
            <a href="#about">Market</a>
          </li>
          <li>
            <a href="#launch">Mint</a>
          </li>
          <li>
            <Button
              variant="text"
              size="medium"
              onClick={
                status === WalletStatus.WALLET_NOT_CONNECTED
                  ? () => connect(availableConnectTypes[0])
                  : () => disconnect()
              }>
              {status === WalletStatus.WALLET_NOT_CONNECTED || status === WalletStatus.INITIALIZING
                ? 'Connect Wallet'
                : 'abcd | 25 UST'}
            </Button>
          </li>
          <li onClick={changeTheme}>
            {currentTheme === 'dark' ? <ImSun className="light" /> : <BsFillMoonFill className="dark" />}
          </li>
        </ul>
      </div>
    </nav>
  )
}
