import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
    {
        title: "Getting Started",
        path: '/tutorial/getting-started',
        icon: <AiIcons.AiFillHome/>,
        cName: 'row'
    },
    {
        title: "Creating Objects",
        path: '/tutorial/creating-objects',
        icon: <AiIcons.AiFillBug/>,
        cName: 'row'
    },
    {
        title: "Animations",
        path: '/tutorial/add-animations',
        icon: <AiIcons.AiFillEdit />,
        cName: 'row'
    },
    {
        title: "Adding Levels",
        path: '/tutorial/adding-levels',
        icon: <AiIcons.AiFillBuild />,
        cName: 'row'
    },
    {
        title: "Physics",
        path: '/tutorial/physics',
        icon: <GiIcons.GiMaterialsScience/>,
        cName: 'row'
    },
    {
        title: "Life Cycle",
        path: '/tutorial/life-cycle',
        icon: <FaIcons.FaMotorcycle/>,
        cName: 'row'
    }
]