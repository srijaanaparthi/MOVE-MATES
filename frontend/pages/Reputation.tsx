import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reputation() {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Transparent Reputation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Ratings, reviews, and endorsements stored on-chain. TODO.
        </CardContent>
      </Card>
    </div>
  );
}


