
"use client"

import { useState } from "react"
import { Button } from "@/lib/components/shadcn/ui/button"
import { Input } from "@/lib/components/shadcn/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/shadcn/ui/table"
import { Pencil, Save, Trash } from "lucide-react"

interface EdiTableProps {
    content: Array<{name: string, content: string}>
    onChange: (newContent: Array<{ name: string, content: string }>) => void
}

export default function EdiTable({ content, onChange }: EdiTableProps) {
  const [elements, setElements] = useState<Array<{name: string, content: string}>>(content)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newName, setNewName] = useState("")
  const [newContent, setNewContent] = useState("")

  const handleEdit = (index: number) => {
    setEditingIndex(index)
  }

  const handleSave = (index: number) => {
    setElements(elements.map((el, i) => 
      i === index 
        ? { 
            name: (document.getElementById(`name-${index}`) as HTMLInputElement).value,
            content: (document.getElementById(`content-${index}`) as HTMLInputElement).value 
          }
        : el
    ))
    setEditingIndex(null)
    onChange(elements)
  }

  const handleCancel = () => {
    setEditingIndex(null)
  }

  const handleDelete = (index: number) => {
    setElements(elements.filter((_, i) => i !== index))
    setEditingIndex(null)
    onChange(elements)
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName && newContent) {
      const newElement = {
        name: newName,
        content: newContent
      }
      setElements([...elements, newElement])
      setNewName("")
      setNewContent("")
    }
    onChange(elements)
  }

  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {elements.map((element, index) => (
            <TableRow key={index}>
              <TableCell>
                {editingIndex === index ? (
                  <Input id={`name-${index}`} defaultValue={element.name} />
                ) : (
                  element.name
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input id={`content-${index}`} defaultValue={element.content} />
                ) : (
                  element.content
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleSave(index)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleEdit(index)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex space-x-2">
        <Input
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Input
          placeholder="New Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <Button onClick={handleAdd}>Add Element</Button>
      </div>
    </div>
  )
}