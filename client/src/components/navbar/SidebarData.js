import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text',
    },
    {
        title: 'Tournaments',
        path: '/tournaments',
        icon: <GiIcons.GiTrophyCup />,
        cName: 'nav-text',
    },
    {
        title: 'Create Tournament',
        path: '/tournaments/create',
        icon: <AiIcons.AiOutlinePlusSquare />,
        cName: 'nav-text',
    },
    {
        title: 'Create Team',
        path: '/teams/create',
        icon: <AiIcons.AiOutlinePlusSquare />,
        cName: 'nav-text',
    },
    {
        title: 'All Teams',
        path: '/teams',
        icon: <AiIcons.AiOutlineTeam />,
        cName: 'nav-text',
    },
    {
        title: 'All Players',
        path: '/players',
        icon: <GiIcons.GiBabyfootPlayers />,
        cName: 'nav-text',
    },
]
