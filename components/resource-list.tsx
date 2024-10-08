"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const resources = [
  { name: 'EC2 Instance', type: 'Compute', provider: 'AWS', status: 'Running' },
  { name: 'S3 Bucket', type: 'Storage', provider: 'AWS', status: 'Active' },
  { name: 'Azure VM', type: 'Compute', provider: 'Azure', status: 'Stopped' },
  { name: 'Google Cloud Storage', type: 'Storage', provider: 'GCP', status: 'Active' },
]

export default function ResourceList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloud Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource, index) => (
              <TableRow key={index}>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.provider}</TableCell>
                <TableCell>{resource.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}