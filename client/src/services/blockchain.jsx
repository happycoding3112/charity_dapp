import abi from '../abis/src/contracts/Charity.sol/Charity.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWalletConnected = async () => {
  try {
    // if (!ethereum) return alert('Please install Metamask')

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

    // window.ethereum.on('chainChanged', (chainId) => {
    //   window.location.reload()
    // })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      await isWalletConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    }
    // else {
    //   alert('Please connect wallet.')
    //   console.log('No accounts found.')
    // }
  } catch (error) {
    reportError(error)
  }
}

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    return contract
  } else {
    return getGlobalState('contract')
  }
}

const createCampaign = async ({
  title,
  description,
  imageURL,
  cost,
  deadline,
}) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEthereumContract()
    cost = ethers.utils.parseEther(cost)
    await contract.createCampaign(title, description, imageURL, cost, deadline)
  } catch (error) {
    reportError(error)
  }
}

const loadCampaigns = async () => {
  try {
    // if (!ethereum) return alert('Please install Metamask')

    const contract = await getEthereumContract()
    const campaigns = await contract.getCampaigns()
    const stats = await contract.stats()

    setGlobalState('stats', structuredStats(stats))
    setGlobalState('campaigns', structuredCampaigns(campaigns))
  } catch (error) {
    reportError(error)
  }
}

const loadCampaign = async (id) => {
  try {
    // if (!ethereum) return alert('Please install Metamask')

    const contract = await getEthereumContract()
    const campaign = await contract.getCampaign(id)

    setGlobalState('campaign', structuredCampaigns([campaign])[0])
  } catch (error) {
    alert(JSON.stringify(error.message))
    reportError(error)
  }
}

const structuredCampaigns = (campaigns) =>
  campaigns
    .map((campaign) => ({
      id: campaign.id?.toNumber(),
      owner: campaign.owner.toLowerCase(),
      title: campaign.title,
      description: campaign.description,
      timestamp: new Date(campaign.timestamp?.toNumber()).getTime(),
      deadline: new Date(campaign.deadline?.toNumber()).getTime(),
      date: toDate(campaign.deadline?.toNumber() * 1000),
      imageURL: campaign.imageURL,
      raised: parseInt(campaign.raised._hex) / 10 ** 18,
      cost: parseInt(campaign.cost._hex) / 10 ** 18,
      donors: campaign.donors?.toNumber(),
      status: campaign.status,
    }))
    .reverse()

const getDonors = async (id) => {
  try {
    // if (!ethereum) return alert("Please install Metamask")

    const contract = await getEthereumContract()
    let donors = await contract.getDonors(id)

    setGlobalState('donors', structuredDonors(donors))
  } catch (error) {
    reportError(error)
  }
}

const structuredDonors = (donors) =>
  donors
    .map((donor) => ({
      owner: donor.owner.toLowerCase(),
      refunded: donor.refunded,
      timestamp: new Date(donor.timestamp.toNumber() * 1000).toJSON(),
      donationAmount: parseInt(donor.donationAmount._hex) / 10 ** 18,
    }))
    .reverse()

const structuredStats = (stats) => ({
  totalCampaigns: stats.totalCampaigns?.toNumber(),
  totalDonors: stats.totalDonors?.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
})

const toDate = (timestamp) => {
  const date = new Date(timestamp)
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

const fundCampaign = async (id, amount) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    amount = ethers.utils.parseEther(amount)

    await contract.donateToCampaign(id, {
      from: connectedAccount,
      value: amount._hex,
    })
  } catch (error) {
    reportError(error)
  }
}

export {
  connectWallet,
  isWalletConnected,
  createCampaign,
  loadCampaigns,
  loadCampaign,
  fundCampaign,
  getDonors
}
