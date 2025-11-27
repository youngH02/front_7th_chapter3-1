import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type FC, type CSSProperties } from "react";
import type { StatusCardItem } from "@/types/stats";

interface IProps {
  items: StatusCardItem[];
}

const getAccentSurfaceStyle = (
  accentColorVar?: string
): CSSProperties | undefined => {
  if (!accentColorVar) return undefined;
  return {
    backgroundColor: `hsl(var(${accentColorVar}) / 0.2)`,
    borderColor: `hsl(var(${accentColorVar}) /0.4 )`,
  };
};

const StatusCard: FC<IProps> = ({ items }) => {
  if (!items.length) return null;

  return (
    <div className="grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
      {items.map(({ key, label, value, accentColorVar }) => (
        <Card
          key={key}
          className="rounded-md border border-border bg-card px-4 py-3"
          style={getAccentSurfaceStyle(accentColorVar)}>
          <CardTitle className="text-xs font-medium text-muted-foreground">
            {label}
          </CardTitle>
          <CardContent
            className="p-0 text-2xl font-bold"
            style={
              accentColorVar
                ? { color: `hsl(var(${accentColorVar}))` }
                : undefined
            }>
            {value.toLocaleString()}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatusCard;
