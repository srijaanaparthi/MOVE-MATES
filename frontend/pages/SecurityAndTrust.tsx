import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecurityAndTrust() {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Escrow Payments</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Funds released after confirmation; support refunds and disputes. TODO.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verified Profiles</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Upload documents, hashed on-chain for authenticity. TODO.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Dispute Resolution</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Hold payment until community vote or admin decision. TODO.</CardContent>
      </Card>
    </div>
  );
}


