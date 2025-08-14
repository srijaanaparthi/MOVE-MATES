import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CredentialsAndBadges() {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Soulbound Certificates</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          View and verify completed session certificates (SBT NFTs). TODO.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Milestone badges like Math Mentor — Level 3. TODO.
        </CardContent>
      </Card>
    </div>
  );
}


