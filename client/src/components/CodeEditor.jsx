import React from 'react'
import Editor from '@monaco-editor/react'

const CodeEditor = ({language,code,onChange}) => {
  return (
    <Editor 
    height="90%"
    value={code}
    language= {language}
    theme='vs-dark'
    onChange={(value)=> onChange(value)} 
    options={{
        minimap : {enabled:false},
        fontSize:14,
        lineNumbers:"on",
        roundedSelection:true,
        scrollBeyondLastLine:false,
        automaticLayout:true, // crucial for resizable panel
        padding:{top:16,bottom:10}

    }}
    />
  )
}

export default CodeEditor