import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

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
        title: "Add Animations",
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
        title: "Scripting",
        path: '/tutorial/scritping',
        icon: <AiIcons.AiFillCode/>,
        cName: 'row'
    },
    {
        title: "Life Cycle",
        path: '/tutorial/life-cycle',
        icon: <FaIcons.FaMotorcycle/>,
        cName: 'row'
    }
]