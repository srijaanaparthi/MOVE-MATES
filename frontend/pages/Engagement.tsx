import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Engagement() {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Leaderboards</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Weekly and monthly activity. TODO.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Streaks</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Attend circles consistently to earn rewards. TODO.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quests</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Complete learning quests for bonus tokens. TODO.</CardContent>
      </Card>
    </div>
  );
}


