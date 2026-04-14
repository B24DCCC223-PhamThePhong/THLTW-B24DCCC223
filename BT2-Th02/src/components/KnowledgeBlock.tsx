import { useState } from "react"
import { KnowledgeBlock } from "../models/KnowledgeBlock"

interface Props {
  blocks: KnowledgeBlock[]
  setBlocks: (blocks: KnowledgeBlock[]) => void
}

export default function KnowledgeBlockManager({ blocks, setBlocks }: Props) {

  const [name, setName] = useState("")

  const addBlock = () => {
    if (!name) return

    const newBlock: KnowledgeBlock = {
      id: Date.now().toString(),
      name
    }

    setBlocks([...blocks, newBlock])
    setName("")
  }

  return (
    <div>
      <h2>Quản lý khối kiến thức</h2>

      <input
        placeholder="Tên khối kiến thức"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addBlock}>Thêm</button>

      <ul>
        {blocks.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  )
}