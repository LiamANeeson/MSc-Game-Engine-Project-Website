import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import * as CgIcons from 'react-icons/cg'

export const SidebarData = [
    {
        title: "Getting Started",
        path: '/tutorial/advanced/getting-started',
        icon: <AiIcons.AiFillHome/>,
        cName: 'row'
    },
    {
        title: "Create Project",
        path: '/tutorial/advanced/create-project',
        icon: <FaIcons.FaGamepad/>,
        cName: 'row'
    },
    {
        title: "Create Scene",
        path: '/tutorial/advanced/create-scene',
        icon: <RiIcons.RiMovieFill/>,
        cName: 'row'
    },
    {
        title: "Add Objects",
        path: '/tutorial/advanced/adding-objects',
        icon: <BsIcons.BsBoxSeam/>,
        cName: 'row'
    },
    {
        title: "Entities & Components",
        path: '/tutorial/advanced/ecs',
        icon: <GiIcons.GiAppleSeeds />,
        cName: 'row'
    },
    {
        title: "Physics",
        path: '/tutorial/advanced/physics',
        icon: <GiIcons.GiMaterialsScience/>,
        cName: 'row'
    },
    {
        title: "Scripting",
        path: '/tutorial/advanced/scripts',
        icon: <RiIcons.RiFileCodeFill/>,
        cName: 'row'
    },
]

{/*{
        title: "Sprite Sheets",
        path: '/tutorial/sprite-sheet',
        icon: <CgIcons.CgGhost/>,
        cName: 'row'
}*/}