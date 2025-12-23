import  {  useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const CkeditorDemo = ({placeholder, content, setContent, disabled }) => {
  const editor = useRef(null);

	const config = useMemo(() => ({
    readonly: disabled, // Disable editor when verification status is not "incorrect"
    placeholder: placeholder || "Start typing...",
  }), [placeholder, disabled]);
  return (
    <JoditEditor
    ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={newContent => setContent(newContent)}
  />
  )
}

export default CkeditorDemo