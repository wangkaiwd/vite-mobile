import { Cell } from 'react-vant'
import { useState } from 'react'
import IndexBar from '../components/IndexBar'

const _indexList: string[] = []
const charCodeOfA = 'A'.charCodeAt(0)

for (let i = 0; i < 26; i += 1) {
  _indexList.push(String.fromCharCode(charCodeOfA + i))
}

const IndexBarDemo = () => {
  const [indexList,] = useState<string[]>(_indexList)
  return (
    <div className={'app'}>
      {/*<div className="top"></div>*/}
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
      {/*<div className="bottom"></div>*/}
    </div>
  )
}

export default IndexBarDemo
