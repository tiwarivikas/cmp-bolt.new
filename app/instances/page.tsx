"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MoreHorizontal, Play, Square, RefreshCw, Maximize } from 'lucide-react'
import LaunchVMForm from '@/components/launch-vm-form'

const initialInstances = [
  { id: 'i-1234abcd', name: 'Web Server', type: 't2.micro', status: 'Running', region: 'us-west-2' },
  { id: 'i-5678efgh', name: 'Database', type: 't3.medium', status: 'Stopped', region: 'us-east-1' },
  { id: 'i-9012ijkl', name: 'Load Balancer', type: 't2.small', status: 'Running', region: 'eu-west-1' },
]

export default function InstancesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [instances, setInstances] = useState(initialInstances)

  const filteredInstances = instances.filter(instance => 
    instance.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || instance.status.toLowerCase() === statusFilter)
  )

  const handleAction = (action: string, instanceId: string) => {
    // In a real application, you would call your API here
    console.log(`Performing ${action} on instance ${instanceId}`)
    
    // For demonstration, we'll update the status locally
    setInstances(instances.map(instance => 
      instance.id === instanceId
        ? { ...instance, status: action === 'Stop' ? 'Stopped' : 'Running' }
        : instance
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Instances</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Launch New VM</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Launch New VM</DialogTitle>
            </DialogHeader>
            <LaunchVMForm onLaunch={(newVM) => setInstances([...instances, newVM])} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search instances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="stopped">Stopped</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Instance ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstances.map((instance) => (
            <TableRow key={instance.id}>
              <TableCell>{instance.id}</TableCell>
              <TableCell>{instance.name}</TableCell>
              <TableCell>{instance.type}</TableCell>
              <TableCell>{instance.status}</TableCell>
              <TableCell>{instance.region}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAction('Start', instance.id)}>
                      <Play className="mr-2 h-4 w-4" />
                      <span>Start</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Stop', instance.id)}>
                      <Square className="mr-2 h-4 w-4" />
                      <span>Stop</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Restart', instance.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Restart</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Resize', instance.id)}>
                      <Maximize className="mr-2 h-4 w-4" />
                      <span>Resize</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}