
"use client"

import { useState } from "react"
import { Button } from "@/lib/components/shadcn/ui/button"
import { Input } from "@/lib/components/shadcn/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/shadcn/ui/table"
import { Pencil, Save, Trash, X } from "lucide-react"
import { PageContent } from "../../../backend/src/types"

export default function EdiTable({ content }: { content: PageContent[] }) {
  const [elements, setElements] = useState<PageContent[]>(content)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState("")
  const [newContent, setNewContent] = useState("")

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    setElements(elements.map(el => 
      el.id === id 
        ? { ...el, 
            name: (document.getElementById(`name-${id}`) as HTMLInputElement).value,
            content: (document.getElementById(`content-${id}`) as HTMLInputElement).value 
          }
        : el
    ))
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleDelete = () => {
    setElements(elements.filter(el => el.id !== editingId))
    setEditingId(null)
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName && newContent) {
      const newElement: PageContent = {
        id: Date.now().toString(), // Generate a unique ID
        pageId: elements[0]?.pageId || "", // Assume all elements have the same pageId
        name: newName,
        content: newContent
      }
      setElements([...elements, newElement])
      setNewName("")
      setNewContent("")
    }
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
          {elements.map(element => (
            <TableRow key={element.id}>
              <TableCell>
                {editingId === element.id ? (
                  <Input id={`name-${element.id}`} defaultValue={element.name} />
                ) : (
                  element.name
                )}
              </TableCell>
              <TableCell>
                {editingId === element.id ? (
                  <Input id={`content-${element.id}`} defaultValue={element.content} />
                ) : (
                  element.content
                )}
              </TableCell>
              <TableCell>
                {editingId === element.id ? (
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleSave(element.id)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDelete}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleEdit(element.id)}>
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