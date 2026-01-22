import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
          Coming soon. Forge will ship with integration scaffolding and playbooks.
        </div>
      </CardContent>
    </Card>
  );
}
