import { Cell } from 'react-vant'
import IndexBar from './components/IndexBar'
import './app.less'

const indexList: string[] = []
const charCodeOfA = 'A'.charCodeAt(0)

for (let i = 0; i < 26; i += 1) {
  indexList.push(String.fromCharCode(charCodeOfA + i))
}

const App = () => {
  return (
    <div className={'app'}>
      <div className={'content'}>
        <IndexBar
          indexList={indexList}
        >
          {indexList.map(item => (
            <div key={item}>
              <IndexBar.Anchor index={item}/>
              <Cell title="文本"/>
              <Cell title="文本"/>
              <Cell title="文本"/>
            </div>
          ))}
        </IndexBar>
      </div>
    </div>
  )
}

export default App

