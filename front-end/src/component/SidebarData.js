import { React } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as CgIcons from 'react-icons/cg';
export const SidebarData = [
    {
        title: 'Sign Up/Log In',
        path: '/login',
        icon: <BiIcons.BiLogInCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Previous Orders',
        path: '/previous-orders',
        icon: <IoIcons.IoMdPaper />,
        cName: 'nav-text'
    },
    {
        title: 'User Profile',
        path: '/user-profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    }
]