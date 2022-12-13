import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import * as CgIcons from 'react-icons/cg'

export const GameSidebarData = [
    {
        title: "Getting Started",
        path: '/tutorial/beginner/game-getting-started',
        icon: <AiIcons.AiFillHome/>,
        cName: 'row'
    },
    {
        title: "Create Project",
        path: '/tutorial/beginner/game-create-project',
        icon: <FaIcons.FaGamepad/>,
        cName: 'row'
    },
    {
        title: "Create Scene",
        path: '/tutorial/beginner/game-create-scene',
        icon: <RiIcons.RiMovieFill/>,
        cName: 'row'
    }

]