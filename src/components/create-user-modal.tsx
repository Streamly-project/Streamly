"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/shadcn/button"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./shadcn/select"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./shadcn/input-group"
import { RefreshCw, Copy, Check, AlertCircleIcon } from "lucide-react"
import { IconRosetteDiscountCheckFilled, IconRosetteDiscountCheckOff } from "@tabler/icons-react"
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert"
import { toast } from "sonner"

export default function CreateUserModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  
  const [copied, setCopied] = useState(false)
  const [nameAlreadyUsed, setNameAlreadyUsed] = useState(true)
  const [errors, setErrors] = useState<{ name?: string; password?: string; role?: string }>({})

  const generatePassword = (length = 12) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    let pass = ""
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(pass)
    setCopied(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { name?: string; password?: string; role?: string } = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!password.trim()) newErrors.password = "Password is required"
    if (!role.trim()) newErrors.role = "Role is required"
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) return

    checkNameExists(name).then(async (exists) => {
      if (exists) {
        setErrors({ name: "This name is already used" })
        return
      }

      try {
        const res = await fetch('/api/users/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: name, password, role })
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          setErrors({ name: err?.message || 'Failed to create user' })
          return
        }

        toast.success(`User "${name}" has been created.`, { style: { background: '#16a34a', color: '#ffffff' } })
        onStatusChange(false)

      } catch {
        setErrors({ name: 'Failed to create user' })
        toast.error('Failed to create user', { style: { background: '#dc2626', color: '#ffffff' } })
      }
    })
  }

  const handlePassword = (password : string) => {
    if (!password) return
    setPassword(password)
    setCopied(false)
  }

  const handleName = (name : string) => {
    setName(name)
    setNameAlreadyUsed(false)
    setErrors((s) => ({ ...s, name: undefined }))
  }

  async function checkNameExists(nameToCheck: string) {
    if (!nameToCheck) return false
    try {
      const res = await fetch(`/api/users/check-name?username=${encodeURIComponent(nameToCheck)}`)
      if (!res.ok) return false
      const data = await res.json()
      const exists = Boolean(data.exists)
      setNameAlreadyUsed(exists)
      return exists
    } catch {
      return false
    }
  }

  const onStatusChange = (status : boolean) => {
    if (status) return setOpen(true)
    setName("")
    setPassword("")
    setRole("")
    setErrors({})
    setCopied(false)
    setOpen(false)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onStatusChange}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="default">Create User</Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-background p-6 shadow-lg">
          <DialogPrimitive.Title className="text-lg font-semibold">Create user</DialogPrimitive.Title>
          <form className="mt-4" onSubmit={onSubmit}>
            <div className="grid gap-2">

              <label className="text-sm">Name</label>
                <InputGroup>
                  <InputGroupInput placeholder="Enter name" value={name} onChange={(e) => handleName(e.target.value)} />
                  <InputGroupAddon align="inline-end">
                      {nameAlreadyUsed ? <IconRosetteDiscountCheckOff className="size-5" /> : <IconRosetteDiscountCheckFilled className="size-5" />}
                  </InputGroupAddon>
                </InputGroup>
              
              <label className="text-sm">Password</label>
              <InputGroup className="pr-2 gap-1">
                <InputGroupInput
                  placeholder="Enter password"
                  type="text"
                  value={password}
                  onChange={(e) => handlePassword(e.target.value)}
                />
                <InputGroupButton
                  variant="ghost"
                  aria-label="Copy password"
                  size="icon-xs"
                  onClick={async () => {
                    if (!password) return
                    await navigator.clipboard.writeText(password)
                    setCopied(true)
                  }}
                >
                  {copied ? <Check /> : <Copy />}
                </InputGroupButton>
                <InputGroupButton
                  variant="ghost"
                  aria-label="Generate password"
                  size="icon-xs"
                  onClick={() => generatePassword(12)}
                >
                  <RefreshCw />
                </InputGroupButton>
              </InputGroup>
              
              <label className="text-sm">Rôle</label>
              <Select onValueChange={(val) => setRole(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rôles</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {errors.name || errors.password || errors.role ? (
                <Alert variant="destructive" className="mt-6">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to create user</AlertTitle>
                  <AlertDescription>
                    <p>Please verify your information and try again.</p>
                    <ul className="list-inside list-disc text-sm">
                      {errors.name ? <li>{errors.name}</li> : null}
                      {errors.password ? <li>{errors.password}</li> : null}
                      {errors.role ? <li>{errors.role}</li> : null}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : null 
              }

            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onStatusChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
          <DialogPrimitive.Close />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
