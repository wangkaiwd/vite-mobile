import { Cell, IndexBar } from 'react-vant'

const indexList: string[] = []
const charCodeOfA = 'A'.charCodeAt(0)

for (let i = 0; i < 26; i += 1) {
  indexList.push(String.fromCharCode(charCodeOfA + i))
}

const App = () => {
  return (
    <IndexBar>
      {indexList.map(item => (
        <div key={item}>
          <IndexBar.Anchor index={item}/>
          <Cell title="文本"/>
          <Cell title="文本"/>
          <Cell title="文本"/>
        </div>
      ))}
    </IndexBar>
  )
}

export default App

