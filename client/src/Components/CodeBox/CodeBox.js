import React from 'react'
import { useState } from 'react'
import Syntax from 'react-syntax-highlighter'
import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
export default function CodeBox({ children, language = 'html' }) {
    const [isDark, setIsDark] = useState(false)

    return (
        <>
            <span onClick={() => setIsDark(o => !o)} className='hover'>
                Theme: {isDark ? '🌕' : '🌚'}
            </span>
            <Syntax language={language} style={isDark ? atomOneDark : atomOneLight}>
                {children}
            </Syntax>
        </>
    )
}