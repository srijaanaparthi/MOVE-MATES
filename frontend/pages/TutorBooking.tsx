import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TutorBooking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"></span>Set Availability</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <Button className="shadow-sm shadow-emerald-300" onClick={() => {/* TODO: on-chain set slot */}}>Add Slot</Button>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle>Book & Pay (Escrow)</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <div>
            <Label htmlFor="amount">Amount (APT)</Label>
            <Input id="amount" type="number" placeholder="0.5" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <Button className="shadow-sm shadow-emerald-300" onClick={() => {/* TODO: escrow book */}}>Book</Button>
          <Button variant="secondary" className="border" onClick={() => {/* TODO: refund */}}>Refund (Cancel)</Button>
          <Button variant="secondary" className="border" onClick={() => {/* TODO: release */}}>Release (Complete)</Button>
        </CardContent>
      </Card>
    </div>
  );
}


