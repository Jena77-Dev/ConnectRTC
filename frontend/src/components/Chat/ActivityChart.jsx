import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const generateData = () => {
  const days = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : 30;
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      name: timeRange === "24h" 
        ? `${date.getHours()}:00`
        : timeRange === "7d" 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : `${date.getMonth() + 1}/${date.getDate()}`,
      messages: Math.floor(Math.random() * 100) + 20,
      responses: Math.floor(Math.random() * 80) + 15,
    });
  }
  
  return data;
};

export function ActivityChart({timeRange}) {
  const data = generateData(timeRange);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle>Message Activity</CardTitle>
        <CardDescription>
          Messages sent and received over the last {timeRange}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="messages" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              name="Messages Sent"
            />
            <Line 
              type="monotone" 
              dataKey="responses" 
              stroke="#ec4899" 
              strokeWidth={3}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
              name="Responses Received"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}