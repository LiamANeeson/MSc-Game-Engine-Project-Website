import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi'

export const DocumentationData = [
    {
        title: "Home",
        path: '/docs',
        icon: <AiIcons.AiFillHome/>,
        cName: 'row'
    },
    {
        title: "Overview",
        path: '/docs/overview',
        icon: <AiIcons.AiFillEye/>,
        cName: 'row'
    },
    {
        title: "Interface",
        path: '/docs/interface',
        icon: <HiIcons.HiDesktopComputer/>,
        cName: 'row'
    },
    {
        title: "Objects",
        path: '/docs/objects',
        icon: <AiIcons.AiFillBug/>,
        cName: 'row'
    },
    {
        title: "Object Behaviours",
        path: '/docs/object-behaviours',
        icon: <FaIcons.FaRunning />,
        cName: 'row'
    },
    {
        title: "Scripting",
        path: '/docs/scripting',
        icon: <AiIcons.AiFillCode/>,
        cName: 'row'
    }
]