import Overview from '@/components/overview'
import ResourceList from '@/components/resource-list'

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Multi-Cloud Dashboard</h1>
      <Overview />
      <ResourceList />
    </div>
  )
}