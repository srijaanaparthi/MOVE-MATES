import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Community() {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>DAO Governance</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Vote on topics, events, and resources. TODO.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">On-chain registration for workshops & hackathons. TODO.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Matching</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Match learners with mentors algorithmically. TODO.</CardContent>
      </Card>
    </div>
  );
}


