import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TokensAndEconomy() {
  const [amount, setAmount] = useState<number | "">("");

  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>LearnTokens</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <div>
            <Label htmlFor="mint">Amount</Label>
            <Input id="mint" type="number" placeholder="100" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <Button onClick={() => {/* TODO: mint */}}>Mint</Button>
          <Button variant="secondary" onClick={() => {/* TODO: transfer */}}>Transfer</Button>
        </CardContent>
      </Card>
    </div>
  );
}


