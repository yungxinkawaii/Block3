import Profile from './pages/Profile'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UpdateProfile from './pages/UpdateProfile'
import Dashboard from './pages/Dashboard'
import CreateForum from './pages/CreateForum'
import Forum from './pages/Forum'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import theme from './theme'

// 1. import `ChakraProvider` component
import { ChakraProvider, Container } from '@chakra-ui/react'

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<NavBar />
			<Container maxW={'6xl'}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/update-profile" element={<UpdateProfile />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/create-forum" element={<CreateForum />} />
					<Route path="/forum/:id" element={<Forum />} />
				</Routes>
			</Container>
		</ChakraProvider>
	)
}

export default App
