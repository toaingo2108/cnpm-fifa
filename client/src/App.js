import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Tournaments from './components/tournaments/Tournaments'
import Landing from './components/layout/Landing'
import Auth from './pages/Auth'
import DetailTournament from './components/tournaments/DetailTournament'
import DetailTeam from './components/teams/DetailTeam'
import Header from './views/Header'
import Footer from './views/Footer'
import SearchTournaments from './components/tournaments/SearchTournaments'
import DetailPlayer from './components/players/DetailPlayer'
import AddPlayerToTeam from './components/players/AddPlayerToTeam'
import AddTeamToTournament from './components/teams/AddTeamToTournament'
import CreateTeam from './components/teams/CreateTeam'
import CreateTournament from './components/tournaments/CreateTournament'
import AllTeams from './components/teams/AllTeams'
import AllPlayers from './components/players/AllPlayers'
import DetailScheduler from './components/schedulers/DetailScheduler'
import DetailGoal from './components/goals/DetailGoal'
import AddGoal from './components/goals/AddGoal'
import AlertMessage from './components/layout/AlertMessage'

function App() {
    return (
        <>
            <AlertMessage />
            <Navbar />
            <Header />
            <Routes>
                {/* ---------------------- */}
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route
                    path="/register"
                    element={<Auth authRoute="register" />}
                />

                {/* ---------TOURNAMENT------------ */}
                <Route path="/tournaments" element={<Tournaments />} />
                <Route
                    path="/tournaments/create"
                    element={<CreateTournament />}
                />
                <Route
                    path="/tournaments/search/:key"
                    element={<SearchTournaments />}
                />
                <Route
                    path="/tournaments/details/:tournamentId"
                    element={<DetailTournament />}
                />
                {/* ---------------------- */}

                {/* ------------TEAM---------- */}
                <Route path="/teams" element={<AllTeams />} />
                <Route path="/teams/details/:teamId" element={<DetailTeam />} />
                <Route
                    path="/teams/add/:tournamentId"
                    element={<AddTeamToTournament />}
                />
                <Route path="/teams/create" element={<CreateTeam />} />
                {/* ---------------------- */}

                {/* -----------PLAYER----------- */}
                <Route path="/players" element={<AllPlayers />} />
                <Route
                    path="/players/details/:playerId"
                    element={<DetailPlayer />}
                />
                <Route
                    path="/players/add/:teamId"
                    element={<AddPlayerToTeam />}
                />
                {/* ---------------------- */}

                {/* -----------SCHEDULER----------- */}
                <Route
                    path="/schedulers/details/:schedulerId"
                    element={<DetailScheduler />}
                />

                {/* ---------------------- */}

                {/* -----------GOAL----------- */}
                <Route path="/goals/add/:schedulerId" element={<AddGoal />} />
                <Route path="/goals/details/:goalId" element={<DetailGoal />} />

                {/* ---------------------- */}
            </Routes>
            <Footer />
        </>
    )
}

export default App
