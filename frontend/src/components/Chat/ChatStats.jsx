import { Card, CardContent, } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));


const statsData = [
  {
    label: "Response Rate",
    value: 94,
    description: "Messages responded to",
    color: "bg-green-500",
  },
  {
    label: "Active Hours",
    value: 68,
    description: "Hours spent chatting this week",
    color: "bg-blue-500",
  },
  {
    label: "Satisfaction",
    value: 87,
    description: "Average chat satisfaction",
    color: "bg-purple-500",
  },
  {
    label: "Quick Replies",
    value: 72,
    description: "Replies under 1 minute",
    color: "bg-pink-500",
  },
];

export function ChatStats() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      {/* <CardHeader>
        <CardTitle>Chat Performance</CardTitle>
        <CardDescription>Your communication metrics</CardDescription>
      </CardHeader> */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Chat Performance</h2>
        <p className="text-sm text-gray-500">Your communication metrics</p>
      </div>
      <CardContent className="space-y-6">
        {statsData.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.value}%</p>
            </div>
            <BorderLinearProgress variant="determinate" value={stat.value} className="h-2" />
            <p className="text-xs text-gray-500">{stat.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
