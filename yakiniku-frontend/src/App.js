import Profile from './pages/Profile'
import Home from './pages/Home'
import UpdateProfile from './pages/UpdateProfile'
import Dashboard from './pages/Dashboard'
import CreateForum from './pages/CreateForum'
import Forum from './pages/Forum'
import AdminPanel from './pages/AdminPanel'
import NFT from './pages/NFT'
import IssueNFT from './pages/IssueNFT'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import theme from './theme'

// 1. import `ChakraProvider` component
import { ChakraProvider, Container } from '@chakra-ui/react'

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<NavBar />
			<Container maxW={'6xl'} py="4">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/update-profile" element={<UpdateProfile />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/create-forum" element={<CreateForum />} />
					<Route path="/forum/:forumID" element={<Forum />} />
					<Route path="/admin" element={<AdminPanel />} />
					{/* TODO: route to individual NFT */}
					<Route path="/nft" element={<NFT />} />
					<Route path="/issueNFT" element={<IssueNFT />} />
				</Routes>
			</Container>
		</ChakraProvider>
	)
}

export default App
