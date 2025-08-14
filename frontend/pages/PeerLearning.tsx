import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PeerLearning() {
  const [skill, setSkill] = useState("");
  const [hours, setHours] = useState<number | "">("");

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"></span>Offer a Skill</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <div className="flex-1">
            <Label htmlFor="skill">Skill</Label>
            <Input id="skill" placeholder="e.g., React, Calculus, Spanish" value={skill} onChange={(e) => setSkill(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="hours">Hours</Label>
            <Input id="hours" type="number" placeholder="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          </div>
          <Button className="shadow-sm shadow-emerald-300" onClick={() => {/* TODO: mint credits */}}>Submit</Button>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle>Ratings & Feedback</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-6">
          Leave tamper-resistant ratings stored on-chain. TODO.
        </CardContent>
      </Card>
    </div>
  );
}


