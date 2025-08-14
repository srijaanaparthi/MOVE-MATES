import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudyCircles() {
  const [topic, setTopic] = useState("");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"></span>Create Study Circle</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <div className="flex-1">
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" placeholder="math, coding, languages..." value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <Button className="shadow-sm shadow-emerald-300" onClick={() => {/* TODO: call on-chain create */}}>Create</Button>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"></span>Join Study Circle</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <div className="flex-1">
            <Label htmlFor="join">Circle ID / Invite Code</Label>
            <Input id="join" placeholder="circle id" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />
          </div>
          <Button className="shadow-sm shadow-emerald-300" onClick={() => {/* TODO: call on-chain join */}}>Join</Button>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle>Shared Resources</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-6">
          Attach files/links. IP rights and content hashes will be stored on-chain. TODO.
        </CardContent>
      </Card>
    </div>
  );
}


