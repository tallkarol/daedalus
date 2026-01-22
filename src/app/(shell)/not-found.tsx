import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page not found</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/">Return to dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
