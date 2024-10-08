import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    name: "Instance i-1234abcd started",
    timestamp: "2 hours ago",
    avatar: "A",
  },
  {
    name: "New S3 bucket created",
    timestamp: "4 hours ago",
    avatar: "B",
  },
  {
    name: "Security group sg-5678efgh updated",
    timestamp: "6 hours ago",
    avatar: "C",
  },
  {
    name: "EKS cluster eks-cluster-1 scaled up",
    timestamp: "1 day ago",
    avatar: "D",
  },
  {
    name: "RDS instance rds-mysql-1 backed up",
    timestamp: "1 day ago",
    avatar: "E",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>{activity.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}