// import { useState } from 'react'

// import { EditorState, ContentState, convertFromHTML } from 'draft-js'
// import { Editor } from 'react-draft-wysiwyg'

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// const AboutPage = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   )

//   useEffect(()=>{

//     const contentBlock = htmlToDraft('ddommm')
//     const  contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
//     const _editorState = EditorState.createWithContent(contentState)
//     setEditorState(_editorState)

//   },[])

//   const onEditorStateChange = () => {

//   }

//   return (
//     <Editor
//     editorState={editorState}
//   toolbarClassName="toolbarClassName"
//   wrapperClassName="wrapperClassName"
//   editorClassName="editorClassName"
//   onEditorStateChange={onEditorStateChange}
//     />
//   )
// }

const AboutPage = () => <div>About</div>
export default AboutPage
