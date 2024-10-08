"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type VMType = {
  id: string
  name: string
  type: string
  status: string
  region: string
}

type LaunchVMFormProps = {
  onLaunch: (newVM: VMType) => void
}

export default function LaunchVMForm({ onLaunch }: LaunchVMFormProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [region, setRegion] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newVM: VMType = {
      id: `i-${Math.random().toString(36).substr(2, 8)}`,
      name,
      type,
      status: 'Pending',
      region,
    }
    onLaunch(newVM)
    setName('')
    setType('')
    setRegion('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">VM Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Instance Type</Label>
        <Select onValueChange={setType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select instance type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="t2.micro">t2.micro</SelectItem>
            <SelectItem value="t2.small">t2.small</SelectItem>
            <SelectItem value="t3.medium">t3.medium</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="region">Region</Label>
        <Select onValueChange={setRegion} required>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
            <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
            <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Launch VM</Button>
    </form>
  )
}